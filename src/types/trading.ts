export interface CoinData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  score: number;
  lastUpdate: string;
}

export interface Signal {
  id: string;
  pair: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  tp1: number;
  tp2: number;
  sl: number;
  status: "OPEN" | "HIT_TP1" | "HIT_TP2" | "HIT_SL" | "EXPIRED" | "CANCELLED";
  createdAt: string;
  closedAt?: string;
  result?: "WIN" | "LOSS" | "NEUTRAL";
  riskReward: number;
  features?: Record<string, any>;
}

export interface BreakoutAlert {
  id: string;
  pair: string;
  probability: number;
  etaMinutes: number;
  direction: "UP" | "DOWN" | "BOTH";
  evidence: {
    bbWidth: number;
    volumeSpike: boolean;
    orderBookImbalance: number;
    atrExpansion: boolean;
  };
  createdAt: string;
  expiresAt: string;
}

export interface TradingStats {
  totalSignals: number;
  winRate: number;
  avgRiskReward: number;
  activeSignals: number;
  todaySignals: number;
  profitFactor: number;
}