import type { CoinData, Signal } from "@/types/trading";
import { supabase } from "@/integrations/supabase/client";

export class SignalEngine {
  private static instance: SignalEngine;
  private signals: Signal[] = [];
  private callbacks: Set<(signals: Signal[]) => void> = new Set();

  static getInstance(): SignalEngine {
    if (!SignalEngine.instance) {
      SignalEngine.instance = new SignalEngine();
    }
    return SignalEngine.instance;
  }

  async generateSignal(coins: CoinData[]): Promise<Signal | null> {
    // Find the coin with the highest absolute score
    const bestCoin = coins.reduce((prev, current) => 
      Math.abs(current.score) > Math.abs(prev.score) ? current : prev
    );

    if (Math.abs(bestCoin.score) < 0.55) {
      return null; // No strong signal
    }

    // Check if there's already an open signal for this coin
    const existingSignal = await this.getOpenSignalForPair(bestCoin.symbol);
    if (existingSignal) {
      return null; // Don't generate conflicting signals
    }

    const direction: "LONG" | "SHORT" = bestCoin.score > 0 ? "LONG" : "SHORT";
    const entryPrice = bestCoin.price;
    const riskPercent = 0.02; // 2% risk

    const signal: Signal = {
      id: Date.now().toString(),
      pair: bestCoin.symbol,
      direction,
      entryPrice,
      tp1: direction === "LONG" ? entryPrice * 1.015 : entryPrice * 0.985,
      tp2: direction === "LONG" ? entryPrice * 1.03 : entryPrice * 0.97,
      sl: direction === "LONG" ? entryPrice * (1 - riskPercent) : entryPrice * (1 + riskPercent),
      status: "OPEN",
      createdAt: new Date().toISOString(),
      riskReward: 2.5,
      features: {
        score: bestCoin.score,
        volume: bestCoin.volume,
        change24h: bestCoin.change24h,
        timestamp: bestCoin.lastUpdate
      }
    };

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
          confidence: Math.abs(bestCoin.score),
          rr1: 1.5,
          rr2: 2.5,
          model: 'realtime-v1',
          reason: `Score: ${bestCoin.score.toFixed(2)}, Volume: ${bestCoin.volume.toLocaleString()}`,
          features: signal.features
        });

      if (error) {
        console.error('Error saving signal to Supabase:', error);
      }
    } catch (error) {
      console.error('Failed to save signal:', error);
    }

    // Add to local signals
    this.signals.unshift(signal);
    this.signals = this.signals.slice(0, 10); // Keep only last 10
    this.notifyCallbacks();

    return signal;
  }

  private async getOpenSignalForPair(symbol: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('signals')
        .select('id')
        .eq('symbol', symbol)
        .eq('state', 'OPEN')
        .limit(1);

      if (error) throw error;
      return data && data.length > 0;
    } catch (error) {
      console.error('Error checking open signals:', error);
      return false;
    }
  }

  async loadRecentSignals() {
    try {
      const { data, error } = await supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      if (data) {
        this.signals = data.map(dbSignal => ({
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
        }));
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
}