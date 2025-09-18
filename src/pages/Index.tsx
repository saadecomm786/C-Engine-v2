import { useState, useEffect } from "react";
import LiveTicker from "@/components/LiveTicker";
import SignalsFeed from "@/components/SignalsFeed";
import BreakoutAlerts from "@/components/BreakoutAlerts";
import TradingStats from "@/components/TradingStats";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Settings, Wifi } from "lucide-react";
import { toast } from "sonner";
import type { CoinData, Signal, BreakoutAlert, TradingStats as TradingStatsType } from "@/types/trading";

// Mock data for demonstration
const mockCoins: CoinData[] = [
  { symbol: "BTCUSDT", price: 43250.75, change24h: 2.45, volume: 28500000000, score: 0.72, lastUpdate: new Date().toISOString() },
  { symbol: "ETHUSDT", price: 2650.30, change24h: -1.23, volume: 15200000000, score: -0.35, lastUpdate: new Date().toISOString() },
  { symbol: "SOLUSDT", price: 98.45, change24h: 5.67, volume: 2100000000, score: 0.84, lastUpdate: new Date().toISOString() },
  { symbol: "XRPUSDT", price: 0.6234, change24h: -0.89, volume: 1800000000, score: -0.12, lastUpdate: new Date().toISOString() },
  { symbol: "ADAUSDT", price: 0.4567, change24h: 3.21, volume: 950000000, score: 0.56, lastUpdate: new Date().toISOString() },
];

const mockSignals: Signal[] = [
  {
    id: "1",
    pair: "BTCUSDT",
    direction: "LONG",
    entryPrice: 43200.00,
    tp1: 43850.00,
    tp2: 44500.00,
    sl: 42650.00,
    status: "OPEN",
    createdAt: new Date().toISOString(),
    riskReward: 2.4
  },
  {
    id: "2", 
    pair: "SOLUSDT",
    direction: "LONG",
    entryPrice: 98.20,
    tp1: 101.50,
    tp2: 104.80,
    sl: 95.90,
    status: "HIT_TP1",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    result: "WIN",
    riskReward: 2.9
  }
];

const mockBreakouts: BreakoutAlert[] = [
  {
    id: "1",
    pair: "ETHUSDT", 
    probability: 0.78,
    etaMinutes: 35,
    direction: "UP",
    evidence: {
      bbWidth: 0.0234,
      volumeSpike: true,
      orderBookImbalance: 2.45,
      atrExpansion: true
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000).toISOString()
  }
];

const mockStats: TradingStatsType = {
  totalSignals: 247,
  winRate: 68.4,
  avgRiskReward: 2.7,
  activeSignals: 3,
  todaySignals: 12,
  profitFactor: 1.85
};

const Index = () => {
  const [coins, setCoins] = useState(mockCoins);
  const [signals, setSignals] = useState(mockSignals);
  const [breakouts, setBreakouts] = useState(mockBreakouts);
  const [stats, setStats] = useState(mockStats);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
          score: Math.max(-1, Math.min(1, coin.score + (Math.random() - 0.5) * 0.1)),
          lastUpdate: new Date().toISOString()
        }))
      );
      setLastUpdate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateSignal = () => {
    // Find highest scoring coin
    const bestCoin = coins.reduce((prev, current) => 
      Math.abs(current.score) > Math.abs(prev.score) ? current : prev
    );

    if (Math.abs(bestCoin.score) >= 0.55) {
      const direction: "LONG" | "SHORT" = bestCoin.score > 0 ? "LONG" : "SHORT";
      const entryPrice = bestCoin.price;
      const riskPercent = 0.02; // 2% risk
      
      const newSignal: Signal = {
        id: Date.now().toString(),
        pair: bestCoin.symbol,
        direction,
        entryPrice,
        tp1: direction === "LONG" ? entryPrice * 1.015 : entryPrice * 0.985,
        tp2: direction === "LONG" ? entryPrice * 1.03 : entryPrice * 0.97,
        sl: direction === "LONG" ? entryPrice * 0.98 : entryPrice * 1.02,
        status: "OPEN",
        createdAt: new Date().toISOString(),
        riskReward: 2.5
      };

      setSignals(prev => [newSignal, ...prev.slice(0, 9)]);
      setStats(prev => ({ ...prev, activeSignals: prev.activeSignals + 1, todaySignals: prev.todaySignals + 1 }));
      
      toast.success(`New ${direction} signal generated for ${bestCoin.symbol}`, {
        description: `Entry: $${entryPrice.toFixed(4)} • Score: ${bestCoin.score.toFixed(2)}`
      });
    } else {
      toast.warning("No strong signals detected", {
        description: "Waiting for better market conditions"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Crypto Signal Engine
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time market analysis & signal generation
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-long" />
              <Badge variant="default" className="bg-long text-long-foreground">
                Connected
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">
                {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LiveTicker coins={coins} />
          <SignalsFeed signals={signals} onGenerateSignal={handleGenerateSignal} />
        </div>
        
        <div className="space-y-6">
          <TradingStats stats={stats} />
          <BreakoutAlerts alerts={breakouts} />
        </div>
      </div>

      {/* Backend Integration Notice */}
      <Card className="p-6 border-warning/50 bg-warning/5">
        <div className="flex items-start gap-3">
          <Settings className="w-5 h-5 text-warning mt-0.5" />
          <div>
            <h3 className="font-semibold text-warning">Backend Integration Required</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              To enable real-time WebSocket connections, signal processing, and database logging, 
              this app needs backend functionality through Supabase integration.
            </p>
            <p className="text-sm text-muted-foreground">
              Features requiring backend: WebSocket price feeds, signal generation algorithms, 
              trade monitoring, database logging, API integrations, and real-time notifications.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;