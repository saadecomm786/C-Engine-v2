import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { CoinData } from "@/types/trading";

interface LiveTickerProps {
  coins: CoinData[];
}

const LiveTicker = ({ coins }: LiveTickerProps) => {
  const formatPrice = (price: number) => {
    return price < 1 ? price.toFixed(6) : price.toFixed(2);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`;
    return volume.toString();
  };

  const getScoreVariant = (score: number) => {
    const absScore = Math.abs(score);
    if (absScore >= 0.7) return score > 0 ? "success" : "danger";
    if (absScore >= 0.5) return score > 0 ? "warning" : "destructive";
    return "secondary";
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Live Market Data</h2>
        <Badge variant="outline" className="text-xs">
          Last Update: {new Date().toLocaleTimeString()}
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2">Pair</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">24h %</th>
              <th className="text-right py-2">Volume</th>
              <th className="text-right py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.symbol} className="border-b border-border/50 hover:bg-muted/20">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{coin.symbol}</span>
                  </div>
                </td>
                <td className="text-right py-3">
                  <span className="font-mono">${formatPrice(coin.price)}</span>
                </td>
                <td className="text-right py-3">
                  <div className="flex items-center justify-end gap-1">
                    {getTrendIcon(coin.change24h)}
                    <span className={coin.change24h >= 0 ? "text-long" : "text-short"}>
                      {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="text-right py-3">
                  <span className="text-muted-foreground">${formatVolume(coin.volume)}</span>
                </td>
                <td className="text-right py-3">
                  <Badge variant={getScoreVariant(coin.score) as any} className="font-mono">
                    {coin.score >= 0 ? "+" : ""}{coin.score.toFixed(2)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LiveTicker;