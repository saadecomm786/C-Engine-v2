import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Clock, BarChart3 } from "lucide-react";
import type { TradingStats } from "@/types/trading";

interface TradingStatsProps {
  stats: TradingStats;
}

const TradingStats = ({ stats }: TradingStatsProps) => {
  const getWinRateColor = (winRate: number) => {
    if (winRate >= 70) return "text-long";
    if (winRate >= 50) return "text-warning";
    return "text-short";
  };

  const statCards = [
    {
      title: "Win Rate",
      value: `${stats.winRate.toFixed(1)}%`,
      icon: <Target className="w-5 h-5" />,
      color: getWinRateColor(stats.winRate),
      description: "Success rate"
    },
    {
      title: "Risk:Reward",
      value: `${stats.avgRiskReward.toFixed(1)}:1`,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-accent",
      description: "Average R:R"
    },
    {
      title: "Active Signals",
      value: stats.activeSignals.toString(),
      icon: <Clock className="w-5 h-5" />,
      color: "text-primary",
      description: "Currently open"
    },
    {
      title: "Today's Signals",
      value: stats.todaySignals.toString(),
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-foreground",
      description: "Generated today"
    },
    {
      title: "Total Signals",
      value: stats.totalSignals.toString(),
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-muted-foreground",
      description: "All time"
    },
    {
      title: "Profit Factor",
      value: stats.profitFactor.toFixed(2),
      icon: <TrendingUp className="w-5 h-5" />,
      color: stats.profitFactor > 1.5 ? "text-long" : stats.profitFactor > 1 ? "text-warning" : "text-short",
      description: "Profit/Loss ratio"
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Performance Stats</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border hover:border-border/80 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={stat.color}>{stat.icon}</div>
              <span className="text-sm text-muted-foreground">{stat.title}</span>
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">System Status</h3>
            <p className="text-sm text-muted-foreground">
              Monitoring {30} coins • Auto-scan every 60s • WebSocket connected
            </p>
          </div>
          <Badge variant="default" className="bg-long text-long-foreground">
            Active
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default TradingStats;