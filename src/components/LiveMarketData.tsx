import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { CoinData } from "@/types/trading";

interface LiveMarketDataProps {
  coins: CoinData[];
}

const LiveMarketData: React.FC<LiveMarketDataProps> = ({ coins }) => {
  // Show only BTC, ETH, SOL as per user requirement
  const displayCoins = useMemo(() => {
    const priorityCoins = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
    return coins.filter(coin => priorityCoins.includes(coin.symbol));
  }, [coins]);

  const totalVolume = useMemo(() => {
    return displayCoins.reduce((sum, coin) => sum + coin.volume, 0);
  }, [displayCoins]);

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(6);
    if (price < 100) return price.toFixed(4);
    return price.toFixed(2);
  };

  const formatVolume = (volume: number) => {
    if (volume > 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume > 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toFixed(0);
  };

  return (
    <Card className="bg-gradient-to-br from-background to-muted/20 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Live Market Data</CardTitle>
          <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
            BTC, ETH, SOL • Volume: {formatVolume(totalVolume)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayCoins.map((coin) => (
            <div
              key={coin.symbol}
              className="p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">
                  {coin.symbol.replace('USDT', '')}
                </span>
                <div className={`flex items-center gap-1 ${
                  coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {coin.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs font-medium">
                    {coin.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-lg font-bold">
                  ${formatPrice(coin.price)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Vol: {formatVolume(coin.volume)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Score: {coin.score?.toFixed(2) || 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Live data • Updates every second</span>
            <span>Backend analyzing all 50 pairs for signals</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMarketData;