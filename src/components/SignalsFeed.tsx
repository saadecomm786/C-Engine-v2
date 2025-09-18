import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Target, Shield, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import type { Signal } from "@/types/trading";

interface SignalsFeedProps {
  signals: Signal[];
  onGenerateSignal: () => void;
}

const SignalsFeed = ({ signals, onGenerateSignal }: SignalsFeedProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Play soft ding sound (if audio context available)
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log("Audio not available");
    }
    
    onGenerateSignal();
    setTimeout(() => setIsGenerating(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN": return "text-accent";
      case "HIT_TP1": 
      case "HIT_TP2": return "text-long";
      case "HIT_SL": return "text-short";
      case "EXPIRED": return "text-muted-foreground";
      default: return "text-neutral";
    }
  };

  const getDirectionIcon = (direction: string) => {
    return direction === "LONG" ? 
      <TrendingUp className="w-4 h-4 text-long" /> : 
      <TrendingDown className="w-4 h-4 text-short" />;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Trading Signals</h2>
        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          {isGenerating ? "Scanning..." : "Generate Signal"}
        </Button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="p-4 rounded-lg border border-border bg-gradient-to-r from-card to-card/80 hover:from-card/80 hover:to-card/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getDirectionIcon(signal.direction)}
                <span className="font-semibold">{signal.pair}</span>
                <Badge variant="outline" className={signal.direction === "LONG" ? "text-long border-long/50" : "text-short border-short/50"}>
                  {signal.direction}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(signal.status)}>
                  {signal.status}
                </Badge>
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(signal.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Entry:</span>
                <div className="font-mono font-semibold">${signal.entryPrice.toFixed(4)}</div>
              </div>
              <div>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  TP1:
                </span>
                <div className="font-mono text-long">${signal.tp1.toFixed(4)}</div>
              </div>
              <div>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  TP2:
                </span>
                <div className="font-mono text-long">${signal.tp2.toFixed(4)}</div>
              </div>
              <div>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  SL:
                </span>
                <div className="font-mono text-short">${signal.sl.toFixed(4)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">R:R:</span>
                <div className="font-semibold text-accent">{signal.riskReward.toFixed(1)}:1</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SignalsFeed;