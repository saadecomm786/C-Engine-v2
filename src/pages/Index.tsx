import { useState, useEffect } from "react";
import LiveTicker from "@/components/LiveTicker";
import SignalsFeed from "@/components/SignalsFeed";
import BreakoutAlerts from "@/components/BreakoutAlerts";
import TradingStats from "@/components/TradingStats";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Settings, Wifi, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { useRealTimeCrypto } from "@/hooks/useRealTimeCrypto";
import { SignalEngine } from "@/services/signalEngine";
import type { Signal, BreakoutAlert, TradingStats as TradingStatsType } from "@/types/trading";

// Mock breakouts and stats for now - these will be replaced with real data
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
  const { coins, isConnected, lastUpdate } = useRealTimeCrypto();
  const [signals, setSignals] = useState<Signal[]>([]);
  const [breakouts] = useState(mockBreakouts);
  const [stats] = useState(mockStats);
  const signalEngine = SignalEngine.getInstance();

  // Load recent signals from database and subscribe to updates
  useEffect(() => {
    signalEngine.loadRecentSignals();
    
    const unsubscribe = signalEngine.subscribe((newSignals) => {
      setSignals(newSignals);
    });

    return unsubscribe;
  }, [signalEngine]);

  const handleGenerateSignal = async () => {
    if (coins.length === 0) {
      toast.warning("No market data available", {
        description: "Waiting for price feeds to connect"
      });
      return;
    }

    try {
      const signal = await signalEngine.generateSignal(coins);
      
      if (signal) {
        toast.success(`New ${signal.direction} signal generated for ${signal.pair}`, {
          description: `Entry: $${signal.entryPrice.toFixed(4)} • Score: ${signal.features?.score?.toFixed(2) || 'N/A'}`
        });
      } else {
        toast.warning("No strong signals detected", {
          description: "Waiting for better market conditions or avoiding duplicate signals"
        });
      }
    } catch (error) {
      console.error('Error generating signal:', error);
      toast.error("Failed to generate signal", {
        description: "Please try again in a moment"
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
              {isConnected ? (
                <Wifi className="w-4 h-4 text-long" />
              ) : (
                <WifiOff className="w-4 h-4 text-short" />
              )}
              <Badge variant="default" className={isConnected ? "bg-long text-long-foreground" : "bg-short text-short-foreground"}>
                {isConnected ? "Connected" : "Connecting..."}
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