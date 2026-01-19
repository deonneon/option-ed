export interface Level {
  id: number;
  title: string;
  description: string;
  requiredPnl: number;
}

export const LEVELS: Level[] = [
  { id: 1, title: 'Spectator', description: 'Stock market 101.', requiredPnl: 0 },
  { id: 2, title: 'Buyer', description: 'First $500 profit.', requiredPnl: 500 },
  { id: 3, title: 'Survivor', description: 'Beat time decay.', requiredPnl: 1000 },
  { id: 4, title: 'Casino', description: 'Sell risk.', requiredPnl: 2500 },
  { id: 5, title: 'Greek', description: 'Mastery.', requiredPnl: 5000 },
];

export const calculateProgress = (totalProfit: number) => {
  const currentLevel = LEVELS.findLast((l: Level) => totalProfit >= l.requiredPnl) || LEVELS[0];
  const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1];
  if (!nextLevel) return { currentLevel, nextLevel: null, percent: 100 };
  const range = nextLevel.requiredPnl - currentLevel.requiredPnl;
  const progress = totalProfit - currentLevel.requiredPnl;
  const percent = Math.min(100, Math.max(0, (progress / range) * 100));
  return { currentLevel, nextLevel, percent };
};
