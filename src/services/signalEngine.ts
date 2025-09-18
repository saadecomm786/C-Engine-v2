import type { CoinData, Signal } from "@/types/trading";
import { supabase } from "@/integrations/supabase/client";

export type TradingMode = "SCALPING" | "DAY_TRADING";

export class SignalEngine {
  private static instance: SignalEngine;
  private signals: Signal[] = [];
  private callbacks: Set<(signals: Signal[]) => void> = new Set();
  private autoGenerationInterval: NodeJS.Timeout | null = null;
  private openSignalCheck: NodeJS.Timeout | null = null;
  private tradingMode: TradingMode = "SCALPING";
  private openSignalLocks: Set<string> = new Set(); // Track coins with open signals
  private currentCoins: CoinData[] = [];

  static getInstance(): SignalEngine {
    if (!SignalEngine.instance) {
      SignalEngine.instance = new SignalEngine();
    }
    return SignalEngine.instance;
  }

  constructor() {
    this.startAutoGeneration();
    this.startSignalMonitoring();
  }

  setTradingMode(mode: TradingMode) {
    this.tradingMode = mode;
    this.restartAutoGeneration();
  }

  getTradingMode(): TradingMode {
    return this.tradingMode;
  }

  // Allow external code to provide current coin data
  updateCurrentCoins(coins: CoinData[]) {
    this.currentCoins = coins;
  }

  private getCurrentCoins(): CoinData[] {
    return this.currentCoins;
  }

  private startAutoGeneration() {
    if (this.autoGenerationInterval) {
      clearInterval(this.autoGenerationInterval);
    }

    const interval = this.tradingMode === "SCALPING" 
      ? 60000 // 1 minute
      : Math.random() * (900000 - 300000) + 300000; // 5-15 minutes

    this.autoGenerationInterval = setInterval(async () => {
      await this.generateAutoSignal();
    }, interval);

    console.log(`Auto-generation started: ${this.tradingMode} mode (${interval/1000}s interval)`);
  }

  private restartAutoGeneration() {
    this.startAutoGeneration();
  }

  private startSignalMonitoring() {
    // Check open signals every 5 seconds
    this.openSignalCheck = setInterval(async () => {
      await this.checkOpenSignals();
    }, 5000);
  }

  private async generateAutoSignal() {
    try {
      // Get current market data
      const coins = this.getCurrentCoins();
      if (coins.length === 0) return;

      const signal = await this.generateSignalFromCoins(coins, false);
      if (signal) {
        console.log(`Auto-generated ${signal.direction} signal for ${signal.pair}`);
      }
    } catch (error) {
      console.error('Error in auto signal generation:', error);
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async generateSignalFromCoins(coins: CoinData[], isManual: boolean = false): Promise<Signal | null> {
    // Shuffle coins for random selection
    const shuffledCoins = this.shuffleArray(coins);
    
    let bestSignal: { coin: CoinData; score: number } | null = null;
    const threshold = isManual ? 0.45 : 0.55; // Lower threshold for manual generation

    // Find the best valid signal from shuffled coins
    for (const coin of shuffledCoins) {
      // Skip if coin already has an open signal
      if (this.openSignalLocks.has(coin.symbol)) {
        continue;
      }

      const absScore = Math.abs(coin.score);
      if (absScore >= threshold) {
        if (!bestSignal || absScore > Math.abs(bestSignal.score)) {
          bestSignal = { coin, score: coin.score };
        }
      }
    }

    // If no signal meets threshold, pick the best available for continuous operation
    if (!bestSignal && !isManual) {
      const availableCoins = shuffledCoins.filter(coin => !this.openSignalLocks.has(coin.symbol));
      if (availableCoins.length > 0) {
        const bestCoin = availableCoins.reduce((prev, current) => 
          Math.abs(current.score) > Math.abs(prev.score) ? current : prev
        );
        bestSignal = { coin: bestCoin, score: bestCoin.score };
      }
    }

    if (!bestSignal) {
      return null;
    }

    return this.createSignal(bestSignal.coin, bestSignal.score);
  }

  private async createSignal(coinData: CoinData, score: number): Promise<Signal> {
    const direction: "LONG" | "SHORT" = score > 0 ? "LONG" : "SHORT";
    const entryPrice = coinData.price;
    const riskPercent = 0.02; // 2% risk

    const signal: Signal = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      pair: coinData.symbol,
      direction,
      entryPrice,
      tp1: direction === "LONG" ? entryPrice * 1.015 : entryPrice * 0.985,
      tp2: direction === "LONG" ? entryPrice * 1.03 : entryPrice * 0.97,
      sl: direction === "LONG" ? entryPrice * (1 - riskPercent) : entryPrice * (1 + riskPercent),
      status: "OPEN",
      createdAt: new Date().toISOString(),
      riskReward: 2.5,
      features: {
        score: score,
        volume: coinData.volume,
        change24h: coinData.change24h,
        timestamp: coinData.lastUpdate,
        confidence: Math.min(Math.abs(score), 1.0),
        tradingMode: this.tradingMode
      }
    };

    // Add to open signal locks
    this.openSignalLocks.add(coinData.symbol);

    // Save to Supabase
    try {
      const { error } = await supabase
        .from('signals')
        .insert({
          id: signal.id,
          symbol: signal.pair,
          action: signal.direction,
          entry_min: signal.entryPrice,
          entry_mid: signal.entryPrice,
          entry_max: signal.entryPrice,
          tp1: signal.tp1,
          tp2: signal.tp2,
          sl: signal.sl,
          state: signal.status,
          confidence: Math.abs(score),
          rr1: 1.5,
          rr2: 2.5,
          model: `realtime-v1-${this.tradingMode.toLowerCase()}`,
          reason: `Score: ${score.toFixed(2)}, Volume: ${coinData.volume.toLocaleString()}, Mode: ${this.tradingMode}`,
          features: signal.features
        });

      if (error) {
        console.error('Error saving signal to Supabase:', error);
        this.openSignalLocks.delete(coinData.symbol); // Remove lock if save failed
      }
    } catch (error) {
      console.error('Failed to save signal:', error);
      this.openSignalLocks.delete(coinData.symbol); // Remove lock if save failed
    }

    // Add to local signals
    this.signals.unshift(signal);
    this.signals = this.signals.slice(0, 20); // Keep last 20 signals
    this.notifyCallbacks();

    return signal;
  }

  // Main method for manual signal generation
  async generateManualSignal(coins: CoinData[]): Promise<Signal | null> {
    if (coins.length === 0) {
      return null;
    }

    return this.generateSignalFromCoins(coins, true);
  }

  // Compatibility method for existing code
  async generateSignal(coins: CoinData[]): Promise<Signal | null> {
    return this.generateManualSignal(coins);
  }

  private async checkOpenSignals() {
    try {
      const { data, error } = await supabase
        .from('signals')
        .select('*')
        .eq('state', 'OPEN');

      if (error) throw error;

      if (data) {
        for (const dbSignal of data) {
          // Here you would check current price against TP/SL levels
          // For now, we'll simulate some closures randomly for demo
          if (Math.random() < 0.01) { // 1% chance per check
            const result = Math.random() > 0.5 ? 'HIT_TP1' : 'HIT_SL';
            
            await supabase
              .from('signals')
              .update({
                state: result,
                closed_at: new Date().toISOString(),
                result: result.includes('TP') ? 'WIN' : 'LOSS'
              })
              .eq('id', dbSignal.id);

            // Remove from open signal locks
            this.openSignalLocks.delete(dbSignal.symbol);
            
            console.log(`Signal ${dbSignal.id} closed: ${result}`);
          }
        }
      }
    } catch (error) {
      console.error('Error checking open signals:', error);
    }
  }

  private async getOpenSignalForPair(symbol: string): Promise<boolean> {
    return this.openSignalLocks.has(symbol);
  }

  async loadRecentSignals() {
    try {
      const { data, error } = await supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      if (data) {
        // Rebuild open signal locks from database
        this.openSignalLocks.clear();
        
        this.signals = data.map(dbSignal => {
          // Track open signals
          if (dbSignal.state === 'OPEN') {
            this.openSignalLocks.add(dbSignal.symbol);
          }

          return {
            id: dbSignal.id,
            pair: dbSignal.symbol,
            direction: dbSignal.action as "LONG" | "SHORT",
            entryPrice: dbSignal.entry_mid,
            tp1: dbSignal.tp1,
            tp2: dbSignal.tp2,
            sl: dbSignal.sl,
            status: dbSignal.state as any,
            createdAt: dbSignal.created_at,
            closedAt: dbSignal.closed_at || undefined,
            result: dbSignal.result as any,
            riskReward: dbSignal.rr2,
            features: (dbSignal as any).features || undefined
          };
        });
        this.notifyCallbacks();
      }
    } catch (error) {
      console.error('Error loading signals:', error);
    }
  }

  subscribe(callback: (signals: Signal[]) => void) {
    this.callbacks.add(callback);
    
    // Immediately call with current signals
    callback(this.signals);

    return () => {
      this.callbacks.delete(callback);
    };
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback([...this.signals]));
  }

  getSignals(): Signal[] {
    return [...this.signals];
  }

  destroy() {
    if (this.autoGenerationInterval) {
      clearInterval(this.autoGenerationInterval);
    }
    if (this.openSignalCheck) {
      clearInterval(this.openSignalCheck);
    }
  }
}