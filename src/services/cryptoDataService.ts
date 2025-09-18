import type { CoinData } from "@/types/trading";

export interface PriceUpdate {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  timestamp: number;
}

// Top 50 USDT pairs - covering majors + high-volume alts
export const TRACKED_COINS = [
  { symbol: "BTCUSDT", coinGeckoId: "bitcoin", coinCapId: "bitcoin", coinbaseId: "BTC-USD" },
  { symbol: "ETHUSDT", coinGeckoId: "ethereum", coinCapId: "ethereum", coinbaseId: "ETH-USD" },
  { symbol: "BNBUSDT", coinGeckoId: "binancecoin", coinCapId: "binance-coin", coinbaseId: "BNB-USD" },
  { symbol: "SOLUSDT", coinGeckoId: "solana", coinCapId: "solana", coinbaseId: "SOL-USD" },
  { symbol: "XRPUSDT", coinGeckoId: "ripple", coinCapId: "xrp", coinbaseId: "XRP-USD" },
  { symbol: "ADAUSDT", coinGeckoId: "cardano", coinCapId: "cardano", coinbaseId: "ADA-USD" },
  { symbol: "DOGEUSDT", coinGeckoId: "dogecoin", coinCapId: "dogecoin", coinbaseId: "DOGE-USD" },
  { symbol: "MATICUSDT", coinGeckoId: "polygon", coinCapId: "polygon", coinbaseId: "MATIC-USD" },
  { symbol: "DOTUSDT", coinGeckoId: "polkadot", coinCapId: "polkadot", coinbaseId: "DOT-USD" },
  { symbol: "LTCUSDT", coinGeckoId: "litecoin", coinCapId: "litecoin", coinbaseId: "LTC-USD" },
  { symbol: "AVAXUSDT", coinGeckoId: "avalanche-2", coinCapId: "avalanche", coinbaseId: "AVAX-USD" },
  { symbol: "TRXUSDT", coinGeckoId: "tron", coinCapId: "tron", coinbaseId: "TRX-USD" },
  { symbol: "LINKUSDT", coinGeckoId: "chainlink", coinCapId: "chainlink", coinbaseId: "LINK-USD" },
  { symbol: "ATOMUSDT", coinGeckoId: "cosmos", coinCapId: "cosmos", coinbaseId: "ATOM-USD" },
  { symbol: "APTUSDT", coinGeckoId: "aptos", coinCapId: "aptos", coinbaseId: "APT-USD" },
  { symbol: "FILUSDT", coinGeckoId: "filecoin", coinCapId: "filecoin", coinbaseId: "FIL-USD" },
  { symbol: "UNIUSDT", coinGeckoId: "uniswap", coinCapId: "uniswap", coinbaseId: "UNI-USD" },
  { symbol: "NEARUSDT", coinGeckoId: "near", coinCapId: "near-protocol", coinbaseId: "NEAR-USD" },
  { symbol: "ICPUSDT", coinGeckoId: "internet-computer", coinCapId: "internet-computer", coinbaseId: "ICP-USD" },
  { symbol: "ALGOUSDT", coinGeckoId: "algorand", coinCapId: "algorand", coinbaseId: "ALGO-USD" },
  { symbol: "VETUSDT", coinGeckoId: "vechain", coinCapId: "vechain", coinbaseId: "VET-USD" },
  { symbol: "HBARUSDT", coinGeckoId: "hedera-hashgraph", coinCapId: "hedera-hashgraph", coinbaseId: "HBAR-USD" },
  { symbol: "STXUSDT", coinGeckoId: "blockstack", coinCapId: "stacks", coinbaseId: "STX-USD" },
  { symbol: "EOSUSDT", coinGeckoId: "eos", coinCapId: "eos", coinbaseId: "EOS-USD" },
  { symbol: "XLMUSDT", coinGeckoId: "stellar", coinCapId: "stellar", coinbaseId: "XLM-USD" },
  { symbol: "OPUSDT", coinGeckoId: "optimism", coinCapId: "optimism", coinbaseId: "OP-USD" },
  { symbol: "LDOUSDT", coinGeckoId: "lido-dao", coinCapId: "lido-dao-token", coinbaseId: "LDO-USD" },
  { symbol: "ARBUSDT", coinGeckoId: "arbitrum", coinCapId: "arbitrum", coinbaseId: "ARB-USD" },
  { symbol: "RUNEUSDT", coinGeckoId: "thorchain", coinCapId: "thorchain", coinbaseId: "RUNE-USD" },
  { symbol: "SANDUSDT", coinGeckoId: "the-sandbox", coinCapId: "the-sandbox", coinbaseId: "SAND-USD" },
  { symbol: "AXSUSDT", coinGeckoId: "axie-infinity", coinCapId: "axie-infinity", coinbaseId: "AXS-USD" },
  { symbol: "THETAUSDT", coinGeckoId: "theta-network", coinCapId: "theta-network", coinbaseId: "THETA-USD" },
  { symbol: "MANAUSDT", coinGeckoId: "decentraland", coinCapId: "decentraland", coinbaseId: "MANA-USD" },
  { symbol: "CHZUSDT", coinGeckoId: "chiliz", coinCapId: "chiliz", coinbaseId: "CHZ-USD" },
  { symbol: "FLOWUSDT", coinGeckoId: "flow", coinCapId: "flow", coinbaseId: "FLOW-USD" },
  { symbol: "EGLDUSDT", coinGeckoId: "elrond-erd-2", coinCapId: "multiversx-elrond", coinbaseId: "EGLD-USD" },
  { symbol: "KAVAUSDT", coinGeckoId: "kava", coinCapId: "kava", coinbaseId: "KAVA-USD" },
  { symbol: "CRVUSDT", coinGeckoId: "curve-dao-token", coinCapId: "curve-dao-token", coinbaseId: "CRV-USD" },
  { symbol: "DYDXUSDT", coinGeckoId: "dydx", coinCapId: "dydx", coinbaseId: "DYDX-USD" },
  { symbol: "COMPUSDT", coinGeckoId: "compound-governance-token", coinCapId: "compound", coinbaseId: "COMP-USD" },
  { symbol: "MKRUSDT", coinGeckoId: "maker", coinCapId: "maker", coinbaseId: "MKR-USD" },
  { symbol: "SNXUSDT", coinGeckoId: "havven", coinCapId: "synthetix-network-token", coinbaseId: "SNX-USD" },
  { symbol: "GMXUSDT", coinGeckoId: "gmx", coinCapId: "gmx", coinbaseId: "GMX-USD" },
  { symbol: "GRTUSDT", coinGeckoId: "the-graph", coinCapId: "the-graph", coinbaseId: "GRT-USD" },
  { symbol: "AAVEUSDT", coinGeckoId: "aave", coinCapId: "aave", coinbaseId: "AAVE-USD" },
  { symbol: "1INCHUSDT", coinGeckoId: "1inch", coinCapId: "1inch", coinbaseId: "1INCH-USD" },
  { symbol: "ZECUSDT", coinGeckoId: "zcash", coinCapId: "zcash", coinbaseId: "ZEC-USD" },
  { symbol: "DASHUSDT", coinGeckoId: "dash", coinCapId: "dash", coinbaseId: "DASH-USD" },
  { symbol: "ENJUSDT", coinGeckoId: "enjincoin", coinCapId: "enjin-coin", coinbaseId: "ENJ-USD" },
  { symbol: "KSMUSDT", coinGeckoId: "kusama", coinCapId: "kusama", coinbaseId: "KSM-USD" },
];

class CryptoDataService {
  private wsConnections: Map<string, WebSocket> = new Map();
  private priceData: Map<string, PriceUpdate> = new Map();
  private callbacks: Set<(data: CoinData[]) => void> = new Set();
  private reconnectAttempts: Map<string, number> = new Map();
  private readonly maxReconnectAttempts = 5;
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeConnections();
    this.startPriceUpdates();
  }

  private async initializeConnections() {
    // Initialize with REST data first for immediate display
    await this.fetchInitialData();
    
    // Then establish WebSocket connections
    this.connectWebSockets();
  }

  private async fetchInitialData() {
    try {
      // Try Binance US first
      const binanceData = await this.fetchBinanceData();
      if (binanceData.length > 0) {
        binanceData.forEach(update => this.updatePriceData(update));
        return;
      }

      // Fallback to CoinGecko
      const coinGeckoData = await this.fetchCoinGeckoData();
      if (coinGeckoData.length > 0) {
        coinGeckoData.forEach(update => this.updatePriceData(update));
        return;
      }

      // Fallback to CoinCap
      const coinCapData = await this.fetchCoinCapData();
      coinCapData.forEach(update => this.updatePriceData(update));
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    }
  }

  private async fetchBinanceData(): Promise<PriceUpdate[]> {
    try {
      const symbols = TRACKED_COINS.map(coin => coin.symbol).join(',');
      const [priceResponse, statsResponse] = await Promise.all([
        fetch(`https://api.binance.us/api/v3/ticker/price`),
        fetch(`https://api.binance.us/api/v3/ticker/24hr`)
      ]);

      if (!priceResponse.ok || !statsResponse.ok) throw new Error('Binance API error');

      const priceData = await priceResponse.json();
      const statsData = await statsResponse.json();

      const statsMap = new Map(statsData.map((item: any) => [item.symbol, item]));

      return priceData
        .filter((item: any) => TRACKED_COINS.some(coin => coin.symbol === item.symbol))
        .map((item: any) => {
          const stats = statsMap.get(item.symbol);
          return {
            symbol: item.symbol,
            price: parseFloat(item.price),
            change24h: stats ? parseFloat((stats as any).priceChangePercent) : 0,
            volume: stats ? parseFloat((stats as any).volume) : 0,
            timestamp: Date.now()
          };
        });
    } catch (error) {
      console.error('Binance data fetch failed:', error);
      return [];
    }
  }

  private async fetchCoinGeckoData(): Promise<PriceUpdate[]> {
    try {
      const ids = TRACKED_COINS.map(coin => coin.coinGeckoId).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`
      );

      if (!response.ok) throw new Error('CoinGecko API error');

      const data = await response.json();
      
      return TRACKED_COINS
        .filter(coin => data[coin.coinGeckoId])
        .map(coin => ({
          symbol: coin.symbol,
          price: data[coin.coinGeckoId].usd,
          change24h: data[coin.coinGeckoId].usd_24h_change || 0,
          volume: data[coin.coinGeckoId].usd_24h_vol || 0,
          timestamp: Date.now()
        }));
    } catch (error) {
      console.error('CoinGecko data fetch failed:', error);
      return [];
    }
  }

  private async fetchCoinCapData(): Promise<PriceUpdate[]> {
    try {
      const response = await fetch('https://api.coincap.io/v2/assets?limit=50');
      
      if (!response.ok) throw new Error('CoinCap API error');

      const data = await response.json();
      
      return TRACKED_COINS
        .map(coin => {
          const asset = data.data.find((item: any) => 
            item.id === coin.coinCapId || item.symbol === coin.symbol.replace('USDT', '')
          );
          
          if (!asset) return null;
          
          return {
            symbol: coin.symbol,
            price: parseFloat(asset.priceUsd),
            change24h: parseFloat(asset.changePercent24Hr) || 0,
            volume: parseFloat(asset.volumeUsd24Hr) || 0,
            timestamp: Date.now()
          };
        })
        .filter(Boolean) as PriceUpdate[];
    } catch (error) {
      console.error('CoinCap data fetch failed:', error);
      return [];
    }
  }

  private connectWebSockets() {
    TRACKED_COINS.forEach(coin => {
      this.connectCoinWebSocket(coin.symbol);
    });
  }

  private connectCoinWebSocket(symbol: string) {
    const wsUrl = `wss://stream.binance.us:9443/ws/${symbol.toLowerCase()}@ticker`;
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log(`WebSocket connected for ${symbol}`);
        this.reconnectAttempts.set(symbol, 0);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const update: PriceUpdate = {
            symbol: data.s,
            price: parseFloat(data.c),
            change24h: parseFloat(data.P),
            volume: parseFloat(data.v),
            timestamp: Date.now()
          };
          this.updatePriceData(update);
        } catch (error) {
          console.error(`Error parsing WebSocket data for ${symbol}:`, error);
        }
      };

      ws.onclose = () => {
        console.log(`WebSocket closed for ${symbol}`);
        this.handleWebSocketReconnect(symbol);
      };

      ws.onerror = (error) => {
        console.error(`WebSocket error for ${symbol}:`, error);
      };

      this.wsConnections.set(symbol, ws);
    } catch (error) {
      console.error(`Failed to connect WebSocket for ${symbol}:`, error);
      this.handleWebSocketReconnect(symbol);
    }
  }

  private handleWebSocketReconnect(symbol: string) {
    const attempts = this.reconnectAttempts.get(symbol) || 0;
    
    if (attempts < this.maxReconnectAttempts) {
      const delay = Math.min(1000 * Math.pow(2, attempts), 30000);
      this.reconnectAttempts.set(symbol, attempts + 1);
      
      setTimeout(() => {
        console.log(`Reconnecting WebSocket for ${symbol} (attempt ${attempts + 1})`);
        this.connectCoinWebSocket(symbol);
      }, delay);
    } else {
      console.log(`Max reconnection attempts reached for ${symbol}, using REST fallback`);
      this.startRestFallback(symbol);
    }
  }

  private startRestFallback(symbol: string) {
    // Implement REST polling as fallback
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=${symbol}`);
        if (response.ok) {
          const data = await response.json();
          const update: PriceUpdate = {
            symbol: data.symbol,
            price: parseFloat(data.lastPrice),
            change24h: parseFloat(data.priceChangePercent),
            volume: parseFloat(data.volume),
            timestamp: Date.now()
          };
          this.updatePriceData(update);
        }
      } catch (error) {
        console.error(`REST fallback failed for ${symbol}:`, error);
      }
    }, 5000); // Poll every 5 seconds for failed WebSocket connections

    // Store interval for cleanup
    setTimeout(() => clearInterval(interval), 300000); // Stop after 5 minutes
  }

  private updatePriceData(update: PriceUpdate) {
    const existing = this.priceData.get(update.symbol);
    
    // Only update if this data is newer
    if (!existing || update.timestamp > existing.timestamp) {
      this.priceData.set(update.symbol, update);
    }
  }

  private startPriceUpdates() {
    this.updateInterval = setInterval(() => {
      this.notifyCallbacks();
    }, 1000); // Update UI every second
  }

  private notifyCallbacks() {
    const coinData: CoinData[] = Array.from(this.priceData.values()).map(update => ({
      symbol: update.symbol,
      price: update.price,
      change24h: update.change24h,
      volume: update.volume,
      score: this.calculateScore(update),
      lastUpdate: new Date(update.timestamp).toISOString()
    }));

    this.callbacks.forEach(callback => callback(coinData));
  }

  private calculateScore(update: PriceUpdate): number {
    // Simple scoring based on price change and volume
    const changeScore = Math.max(-1, Math.min(1, update.change24h / 10));
    const volumeScore = update.volume > 1000000000 ? 0.2 : 0;
    return Math.max(-1, Math.min(1, changeScore + volumeScore + (Math.random() - 0.5) * 0.2));
  }

  subscribe(callback: (data: CoinData[]) => void) {
    this.callbacks.add(callback);
    
    // Immediately call with current data
    if (this.priceData.size > 0) {
      this.notifyCallbacks();
    }

    return () => {
      this.callbacks.delete(callback);
    };
  }

  destroy() {
    // Close all WebSocket connections
    this.wsConnections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    });
    this.wsConnections.clear();

    // Clear intervals
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    // Clear callbacks
    this.callbacks.clear();
  }
}

export const cryptoDataService = new CryptoDataService();