import type { StockData } from './engine';

export const STOCKS: Record<string, StockData> = {
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla (High Drama)',
    currentPrice: 200,
    volatilityMultiplier: 2.5,
  },
  KO: {
    symbol: 'KO',
    name: 'Coke (Sleepy)',
    currentPrice: 60,
    volatilityMultiplier: 0.8,
  },
};
