import { useState, useEffect } from "react";
import { cryptoDataService } from "@/services/cryptoDataService";
import type { CoinData } from "@/types/trading";

export const useRealTimeCrypto = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = cryptoDataService.subscribe((data: CoinData[]) => {
      setCoins(data);
      setLastUpdate(new Date());
      setIsConnected(data.length > 0);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    coins,
    isConnected,
    lastUpdate
  };
};