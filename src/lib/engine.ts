/**
 * OptionEd Simulation Engine
 * 
 * Uses simplified math to demonstrate concepts like P/L, Time Decay, and Volatility
 * without the complexity of Black-Scholes.
 */

export type OptionType = 'call' | 'put';
export type TradeSide = 'buy' | 'sell';

export interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  volatilityMultiplier: number;
}

export const calculatePnl = (
  type: OptionType,
  side: TradeSide,
  strike: number,
  currentPrice: number,
  premium: number,
  daysLeft: number,
  volatility: number
) => {
  const multiplier = 100; // 1 contract = 100 shares
  
  // 1. Calculate Intrinsic Value (Real cash value if expired now)
  const intrinsic = type === 'call' 
    ? Math.max(0, currentPrice - strike) 
    : Math.max(0, strike - currentPrice);

  // 2. Calculate Remaining Hope Value (simplified time decay)
  // Logic: Closer to expiration = less hope.
  // We use Math.sqrt to simulate that decay speeds up in the final days.
  const timeDecayFactor = Math.sqrt(Math.max(0, daysLeft) / 30);
  
  // Hope value also depends on how "near" the strike we are
  const distance = Math.abs(currentPrice - strike);
  const proximityFactor = 10 / (distance + 1);
  
  const hopeValue = premium * timeDecayFactor * (volatility / 2) * proximityFactor;
  
  // If expired (daysLeft === 0), hopeValue is 0
  const currentOptionValue = intrinsic + (daysLeft > 0 ? hopeValue : 0);
  
  // 3. Calculate Final P/L
  // For Buyer: (Current Value - Price Paid) * 100
  // For Seller: (Price Received - Current Value) * 100
  const pnl = side === 'buy' 
    ? (currentOptionValue - premium) * multiplier 
    : (premium - currentOptionValue) * multiplier;

  return {
    pnl,
    currentOptionValue,
    intrinsic,
    hopeValue: daysLeft > 0 ? hopeValue : 0
  };
};

export const generatePayoffData = (
  type: OptionType,
  side: TradeSide,
  strike: number,
  premium: number,
  volatility: number,
  daysLeft: number,
  rangeStart: number,
  rangeEnd: number,
  step: number = 1
) => {
  const data = [];
  for (let price = rangeStart; price <= rangeEnd; price += step) {
    const { pnl } = calculatePnl(type, side, strike, price, premium, daysLeft, volatility);
    data.push({
      price,
      pnl
    });
  }
  return data;
};
