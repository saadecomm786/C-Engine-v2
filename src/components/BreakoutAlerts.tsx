import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, TrendingDown, Clock, Target } from "lucide-react";
import type { BreakoutAlert } from "@/types/trading";

interface BreakoutAlertsProps {
  alerts: BreakoutAlert[];
}

const BreakoutAlerts = ({ alerts }: BreakoutAlertsProps) => {
  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.8) return "text-danger";
    if (probability >= 0.7) return "text-warning";
    return "text-accent";
  };

  const getDirectionIcon = (direction: string) => {
    if (direction === "UP") return <TrendingUp className="w-4 h-4 text-long" />;
    if (direction === "DOWN") return <TrendingDown className="w-4 h-4 text-short" />;
    return <Target className="w-4 h-4 text-accent" />;
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins <= 0) return "Expired";
    if (diffMins < 60) return `${diffMins}m`;
    return `${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h2 className="text-xl font-semibold">Breakout Alerts</h2>
        </div>
        <Badge variant="outline" className="text-xs">
          High Probability Only
        </Badge>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No imminent breakouts detected</p>
          <p className="text-sm">System monitoring for high-probability setups</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-lg border-2 border-warning/30 bg-gradient-to-r from-warning/10 to-warning/5 hover:border-warning/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getDirectionIcon(alert.direction)}
                  <span className="font-semibold text-lg">{alert.pair}</span>
                  <Badge variant="outline" className="text-warning border-warning/50">
                    {alert.direction} Breakout
                  </Badge>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getProbabilityColor(alert.probability)}`}>
                    {(alert.probability * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Probability</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ETA:
                  </span>
                  <div className="font-semibold text-accent">{alert.etaMinutes}m</div>
                </div>
                <div>
                  <span className="text-muted-foreground">BB Width:</span>
                  <div className="font-mono text-sm">{alert.evidence.bbWidth.toFixed(4)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Volume:</span>
                  <Badge variant={alert.evidence.volumeSpike ? "default" : "secondary"} className="text-xs">
                    {alert.evidence.volumeSpike ? "Spike" : "Normal"}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Expires:</span>
                  <div className="text-sm text-warning">{getTimeRemaining(alert.expiresAt)}</div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <strong>Evidence:</strong> OrderBook Imbalance: {alert.evidence.orderBookImbalance.toFixed(2)}, 
                ATR Expansion: {alert.evidence.atrExpansion ? "Yes" : "No"}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BreakoutAlerts;