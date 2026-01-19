export interface Level {
  id: number;
  title: string;
  description: string;
  requiredPnl: number;
}

export interface Tooltip {
  term: string;
  metaphor: string;
}

export interface MathLine {
  label: string;
  value: string;
  operation?: '+' | '-' | '=';
  highlight?: boolean;
}

export interface NarrativeStep {
  text: string;
  actionLabel: string;
  setup?: {
    simPrice?: number;
    strike?: number;
    daysLeft?: number;
    type?: 'call' | 'put';
    side?: 'buy' | 'sell';
    stockSymbol?: string;
  };
  math?: MathLine[];
  tooltips?: Tooltip[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  steps: NarrativeStep[];
}

export const LEVELS: Level[] = [
  { id: 1, title: 'Spectator', description: 'Stock market 101.', requiredPnl: 0 },
  { id: 2, title: 'Buyer', description: 'First $500 profit.', requiredPnl: 500 },
  { id: 3, title: 'Survivor', description: 'Beat time decay.', requiredPnl: 1000 },
  { id: 4, title: 'Casino', description: 'Sell risk.', requiredPnl: 2500 },
  { id: 5, title: 'Greek', description: 'Mastery.', requiredPnl: 5000 },
];

export const MODULES: Module[] = [
  {
    id: 'stage',
    title: "The Stage",
    description: "How stocks move",
    steps: [
      {
        text: "Tesla ($TSLA) is trading at $200. You think the price will go up after their big announcement tomorrow.",
        actionLabel: "Watch What Happens",
        setup: { stockSymbol: 'TSLA', simPrice: 200 }
      },
      {
        text: "The announcement was a hit! Tesla jumped to $230. If you owned the stock, you'd have made $30 per share.",
        actionLabel: "What's the Problem?",
        setup: { simPrice: 230 }
      },
      {
        text: "But here's the problem: to buy 100 shares of Tesla at $200, you'd need $20,000. And if Tesla dropped instead? You'd lose real money with no limit.",
        actionLabel: "Is There a Better Way?",
        setup: { simPrice: 200 },
        math: [
          { label: "100 shares × $200", value: "$20,000" },
          { label: "If stock drops to $150", value: "" },
          { label: "Your loss", value: "-$5,000", highlight: true }
        ]
      },
      {
        text: "What if you could make money on that move without buying the stock? That's what OPTIONS let you do. Less cash upfront, and your max loss is fixed.",
        actionLabel: "Show Me How",
        setup: { simPrice: 230 },
        tooltips: [
          { term: "OPTIONS", metaphor: "Like a movie ticket: you pay a small fee now for the right to see the show later. If you skip the movie, you only lose the ticket price." }
        ]
      }
    ]
  },
  {
    id: 'rocket',
    title: "Call Options",
    description: "Betting the price goes UP",
    steps: [
      {
        text: "An OPTION is a contract that lets you bet on where a stock will go. A CALL option makes money when the stock goes UP.",
        actionLabel: "Got It",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 200, daysLeft: 30 },
        tooltips: [
          { term: "OPTION", metaphor: "Like a concert ticket: you pay upfront for the right to attend, but you're not forced to go." },
          { term: "CALL option", metaphor: "Like a store coupon that locks in today's price. If the price goes up, your coupon becomes valuable. If it goes down, you just toss the coupon." }
        ]
      },
      {
        text: "Important: each option contract controls 100 shares. When we say an option costs '$10', that's $10 per share, so the actual cost is $1,000 (100 × $10).",
        actionLabel: "Got It",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 200, daysLeft: 30 },
        math: [
          { label: "Option price per share", value: "$10" },
          { label: "Shares per contract", value: "× 100" },
          { label: "Actual cost", value: "$1,000", highlight: true }
        ],
        tooltips: [
          { term: "contract", metaphor: "Like buying a pack of gum: the price tag says $1 per stick, but you're buying a 100-pack. The contract is the whole pack." }
        ]
      },
      {
        text: "The STRIKE price ($210) is your target. If Tesla goes ABOVE $210, your call is 'in the money' and has real value. If it stays below? Your option expires worthless.",
        actionLabel: "What Does It Cost?",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 200, daysLeft: 30 },
        tooltips: [
          { term: "STRIKE price", metaphor: "The price printed on your ticket. Like a gift card that says 'Buy one pizza for $15' - $15 is the strike. If pizzas cost $20, your card is valuable." },
          { term: "in the money", metaphor: "Your lottery ticket is a winner. The numbers match, so your ticket has real cash value." },
          { term: "expires worthless", metaphor: "Like a Groupon you forgot about - once the date passes, it's just paper." }
        ]
      },
      {
        text: "Tesla is at $200. You buy a Call option with a '$210 strike' for $10. This gives you the RIGHT (not obligation) to buy Tesla at $210, no matter how high it goes.",
        actionLabel: "Buy the Call",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 200, daysLeft: 30 },
        math: [
          { label: "Your cost per share", value: "$10" },
          { label: "Strike price", value: "$210" },
          { label: "Current stock", value: "$200" },
          { label: "", value: "" },
          { label: "Breakeven price", value: "$220", highlight: true },
          { label: "(strike + premium)", value: "" }
        ],
        tooltips: [
          { term: "RIGHT (not obligation)", metaphor: "Like a reservation at a restaurant: you CAN show up and get your table, but nobody forces you to eat there." },
          { term: "Breakeven", metaphor: "The point where you get your ticket money back. Like driving to a concert - you need to enjoy it enough to cover the gas money AND the ticket." },
          { term: "$10", metaphor: "The 'premium' - what you pay for the ticket itself. This is your max loss if things go wrong." }
        ]
      },
      {
        text: "Wait - breakeven is $220, not $210? Yes! Even if Tesla hits $215, you'd exercise at $210, but you PAID $10 for that right. You need $210 + $10 = $220 to actually profit.",
        actionLabel: "See the Payoff",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 215, daysLeft: 0 },
        math: [
          { label: "Stock at expiry", value: "$215" },
          { label: "Your strike", value: "$210", operation: "-" },
          { label: "Intrinsic value", value: "$5", operation: "=" },
          { label: "What you paid", value: "$10", operation: "-" },
          { label: "Net P&L", value: "-$5", highlight: true }
        ],
        tooltips: [
          { term: "exercise", metaphor: "Using your ticket. Like redeeming a coupon at the store - you're cashing in your right." },
          { term: "Intrinsic value", metaphor: "The real cash value RIGHT NOW. Like a $20 gift card to a store - it's worth $20, no more, no less." }
        ]
      },
      {
        text: "Tesla rockets to $240! Let's break down the REAL math on your option profit.",
        actionLabel: "Show Me the Math",
        setup: { simPrice: 240, daysLeft: 0 },
        math: [
          { label: "Stock price at expiry", value: "$240" },
          { label: "Your strike price", value: "$210", operation: "-" },
          { label: "Intrinsic value", value: "$30", operation: "=" },
          { label: "What you paid", value: "$10", operation: "-" },
          { label: "Profit per share", value: "$20", operation: "=" },
          { label: "", value: "" },
          { label: "× 100 shares/contract", value: "", highlight: true },
          { label: "Total profit", value: "$2,000", highlight: true }
        ]
      },
      {
        text: "Compare: buying stock vs. buying options. With $20,000, you could buy 100 shares and make $4,000. OR buy 20 option contracts and make $40,000. Same capital, 10x the return.",
        actionLabel: "What If I'm Wrong?",
        setup: { simPrice: 240, daysLeft: 0 },
        math: [
          { label: "Stock approach", value: "" },
          { label: "Buy 100 shares × $200", value: "$20,000" },
          { label: "Profit ($40 × 100)", value: "+$4,000" },
          { label: "", value: "" },
          { label: "Options approach", value: "", highlight: true },
          { label: "Buy 20 contracts × $1,000", value: "$20,000" },
          { label: "Profit ($20 × 100 × 20)", value: "+$40,000", highlight: true }
        ]
      },
      {
        text: "But if Tesla stayed at $200 or dropped? Your stock would still be worth something. Your options? Worthless. You'd lose the entire $20,000. High reward = high risk.",
        actionLabel: "Next Lesson",
        setup: { simPrice: 200, daysLeft: 0 },
        math: [
          { label: "Stock approach", value: "" },
          { label: "Stock stays at $200", value: "$0 profit" },
          { label: "You still own shares", value: "✓" },
          { label: "", value: "" },
          { label: "Options approach", value: "", highlight: true },
          { label: "Options expire worthless", value: "-$20,000", highlight: true },
          { label: "You own nothing", value: "✗" }
        ]
      }
    ]
  },
  {
    id: 'parachute',
    title: "Put Options",
    description: "Betting the price goes DOWN",
    steps: [
      {
        text: "A PUT option is the opposite. It makes money when the stock goes DOWN. Think of it as insurance against a crash.",
        actionLabel: "Got It",
        setup: { type: 'put', side: 'buy', strike: 200, simPrice: 200, daysLeft: 30 },
        tooltips: [
          { term: "PUT option", metaphor: "Like car insurance: you pay a small premium hoping you'll never need it, but if you crash, it pays out." }
        ]
      },
      {
        text: "Wait - how can you 'sell' stock you don't own? You're not actually selling stock. You're buying the RIGHT to sell at a set price. Think of it as a betting slip on the stock going down, not actual shares.",
        actionLabel: "That Makes Sense",
        setup: { type: 'put', side: 'buy', strike: 200, simPrice: 200, daysLeft: 30 },
        tooltips: [
          { term: "RIGHT to sell", metaphor: "Like a pawn shop guarantee: 'We'll buy your guitar for $500 anytime this month.' You don't need to own the guitar yet - the guarantee itself has value if guitar prices drop." }
        ]
      },
      {
        text: "Tesla is at $200 but looking shaky. You buy a Put option with a '$200 strike' for $10. This gives you the RIGHT to sell Tesla at $200, even if it crashes.",
        actionLabel: "Buy the Put",
        setup: { type: 'put', side: 'buy', strike: 200, simPrice: 200, daysLeft: 30 },
        math: [
          { label: "Your cost per share", value: "$10" },
          { label: "Strike price", value: "$200" },
          { label: "Current stock", value: "$200" },
          { label: "", value: "" },
          { label: "Breakeven price", value: "$190", highlight: true },
          { label: "(strike - premium)", value: "" }
        ]
      },
      {
        text: "Tesla crashes to $150! Your Put gives you the right to sell at $200. The difference ($50) is your intrinsic value. Minus your $10 cost = $40 profit per share.",
        actionLabel: "See Full Math",
        setup: { simPrice: 150, daysLeft: 0 },
        math: [
          { label: "Your strike (sell at)", value: "$200" },
          { label: "Stock price now", value: "$150", operation: "-" },
          { label: "Intrinsic value", value: "$50", operation: "=" },
          { label: "What you paid", value: "$10", operation: "-" },
          { label: "Profit per share", value: "$40", operation: "=" },
          { label: "", value: "" },
          { label: "× 100 shares/contract", value: "", highlight: true },
          { label: "Total profit", value: "$4,000", highlight: true }
        ]
      },
      {
        text: "Compare to owning stock: if you held 100 shares through that crash, you'd be down $5,000. Your Put not only avoided that loss - it made money FROM the crash.",
        actionLabel: "What If I'm Wrong?",
        setup: { simPrice: 150, daysLeft: 0 },
        math: [
          { label: "If you owned 100 shares", value: "" },
          { label: "Loss ($50 × 100)", value: "-$5,000", highlight: true },
          { label: "", value: "" },
          { label: "With Put option", value: "" },
          { label: "Profit ($40 × 100)", value: "+$4,000", highlight: true }
        ]
      },
      {
        text: "What if Tesla went UP to $250 instead? Your Put expires worthless - why sell at $200 when stock is worth $250? But here's the key: you only lose your $10 premium. That's your max loss, ever.",
        actionLabel: "Next Lesson",
        setup: { simPrice: 250, daysLeft: 0 },
        math: [
          { label: "Stock went UP to", value: "$250" },
          { label: "Your strike (sell at)", value: "$200" },
          { label: "Would you exercise?", value: "No way!" },
          { label: "", value: "" },
          { label: "Put expires worthless", value: "" },
          { label: "Your max loss", value: "-$1,000", highlight: true },
          { label: "(That's it. Limited risk.)", value: "" }
        ],
        tooltips: [
          { term: "max loss", metaphor: "Like a movie ticket for a bad film - worst case, you wasted $15. The movie can't reach into your wallet and take more." },
          { term: "premium", metaphor: "The price of admission. Like paying cover at a club - that money's gone whether you have fun or not." }
        ]
      }
    ]
  },
  {
    id: 'ice-cube',
    title: "Time Decay",
    description: "Options expire",
    steps: [
      {
        text: "Here's the catch: options EXPIRE. You pay for the right to buy/sell, but only for a limited time. Like a melting ice cube.",
        actionLabel: "See an Example",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 200, daysLeft: 30 },
        tooltips: [
          { term: "EXPIRE", metaphor: "Like milk in your fridge - it has a 'use by' date. After that, it's worthless no matter how much you paid." }
        ]
      },
      {
        text: "You buy a Tesla Call ($210 strike) for $10 while the stock is at $200. You have 30 days for Tesla to go above $210.",
        actionLabel: "Why Does Time Matter?",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 200, daysLeft: 30 },
        math: [
          { label: "Option cost", value: "$10" },
          { label: "Days until expiry", value: "30" },
          { label: "Stock needs to reach", value: "$220", highlight: true },
          { label: "(for you to profit)", value: "" }
        ]
      },
      {
        text: "Why does time kill your option? Because the less time left, the less CHANCE the stock has to move in your favor. Probability shrinks → value shrinks. Wall Street calls this 'theta decay.'",
        actionLabel: "See It In Action",
        setup: { type: 'call', side: 'buy', strike: 210, simPrice: 200, daysLeft: 30 },
        tooltips: [
          { term: "theta decay", metaphor: "Like a parking meter ticking down. Every minute that passes, you're losing money - even if nothing else changes." },
          { term: "Probability shrinks", metaphor: "Imagine betting your friend will text you. With a week to wait, good odds. With 5 minutes left? Not looking good." }
        ]
      },
      {
        text: "20 days pass. Tesla is still at $200. Your option is melting away - it's now worth only $3 because time is running out. You've lost $7 even though the stock hasn't moved!",
        actionLabel: "Can I Get Out?",
        setup: { simPrice: 200, daysLeft: 10 },
        math: [
          { label: "Original cost", value: "$10" },
          { label: "Days left", value: "10" },
          { label: "Current value", value: "$3" },
          { label: "Paper loss", value: "-$7", highlight: true }
        ]
      },
      {
        text: "Yes! You can sell your option anytime before expiration. Right now it's worth $3. Sell and lock in a $7 loss, or hold and risk losing all $10. Knowing when to cut losses is half the game.",
        actionLabel: "I'll Hold",
        setup: { simPrice: 200, daysLeft: 10 },
        math: [
          { label: "If you sell now", value: "" },
          { label: "Get back", value: "$3" },
          { label: "Net loss", value: "-$7" },
          { label: "", value: "" },
          { label: "If you hold & stock stays flat", value: "", highlight: true },
          { label: "Option expires worthless", value: "$0" },
          { label: "Net loss", value: "-$10", highlight: true }
        ]
      },
      {
        text: "The decay isn't linear - it ACCELERATES. Options lose more value per day as expiration approaches. The last week is brutal.",
        actionLabel: "See the Decay Curve",
        setup: { simPrice: 200, daysLeft: 7 },
        math: [
          { label: "Day 1-10", value: "Slow decay" },
          { label: "Day 10-20", value: "Moderate decay" },
          { label: "Day 20-30", value: "Rapid decay", highlight: true },
          { label: "", value: "" },
          { label: "This is called", value: "'Theta burn'" }
        ],
        tooltips: [
          { term: "ACCELERATES", metaphor: "Like ice cream on a hot day. First hour? Slow drip. Last 10 minutes? Melting everywhere." },
          { term: "Theta burn", metaphor: "Wall Street's term for watching your money evaporate. Like leaving cash on a campfire - the closer you get to the end, the faster it burns." }
        ]
      },
      {
        text: "Expiration day. Tesla never went above $210. Your option expires worthless. You lost your entire $1,000 (remember, $10 × 100 shares). Time decay is the hidden cost of buying options.",
        actionLabel: "Learn to Be the House",
        setup: { simPrice: 200, daysLeft: 0 },
        math: [
          { label: "Option cost", value: "$1,000" },
          { label: "Stock never hit $210", value: "" },
          { label: "Option value at expiry", value: "$0" },
          { label: "", value: "" },
          { label: "Total loss", value: "-$1,000", highlight: true },
          { label: "(This is why 80% of options expire worthless)", value: "" }
        ]
      }
    ]
  },
  {
    id: 'casino',
    title: "Selling Options",
    description: "Being the house",
    steps: [
      {
        text: "Plot twist: you can SELL options instead of buying them. You collect the fee (premium) upfront, but you take on the risk. You become the casino.",
        actionLabel: "Show Me",
        setup: { stockSymbol: 'KO', type: 'put', side: 'sell', strike: 60, simPrice: 65, daysLeft: 30 },
        tooltips: [
          { term: "SELL options", metaphor: "Like selling insurance. State Farm collects premiums every month. Most months, nothing happens and they keep it. But when disaster strikes, they pay out big." },
          { term: "become the casino", metaphor: "The house always has an edge - they win most hands but lose occasionally. Option sellers are the house: small wins most of the time, big losses sometimes." }
        ]
      },
      {
        text: "When you SELL a Put, someone BUYS it from you. They pay you $5 per share for the insurance. That's $500 (100 shares × $5) in your pocket immediately.",
        actionLabel: "Where Does the Money Come From?",
        setup: { stockSymbol: 'KO', type: 'put', side: 'sell', strike: 60, simPrice: 65, daysLeft: 30 },
        math: [
          { label: "Premium per share", value: "$5" },
          { label: "Shares per contract", value: "× 100" },
          { label: "Cash you receive NOW", value: "$500", highlight: true }
        ]
      },
      {
        text: "Coca-Cola (KO) is stable at $65. Someone wants insurance (a Put) in case it drops to $60. You sell them that Put and collect $500 upfront.",
        actionLabel: "What's the Catch?",
        setup: { stockSymbol: 'KO', type: 'put', side: 'sell', strike: 60, simPrice: 65, daysLeft: 30 }
      },
      {
        text: "The catch: your broker will freeze about $6,000 in your account as 'collateral.' If KO drops below $60, you MUST buy 100 shares at $60. No backing out. This is called 'assignment.'",
        actionLabel: "Got It",
        setup: { stockSymbol: 'KO', type: 'put', side: 'sell', strike: 60, simPrice: 65, daysLeft: 30 },
        math: [
          { label: "Cash received", value: "+$500" },
          { label: "Collateral frozen", value: "~$6,000" },
          { label: "Your obligation", value: "Buy 100 shares @ $60" },
          { label: "", value: "" },
          { label: "You cannot cancel this", value: "", highlight: true }
        ],
        tooltips: [
          { term: "collateral", metaphor: "Like a security deposit on an apartment. The landlord holds it to make sure you'll pay if something goes wrong. Your broker does the same." },
          { term: "assignment", metaphor: "Getting called on your promise. You sold someone insurance, and now they're filing a claim. Time to pay up." },
          { term: "No backing out", metaphor: "Like a pinky promise with legal consequences. You made a binding contract - the other person is counting on you." }
        ]
      },
      {
        text: "30 days later, KO is still at $65. The Put expires worthless - why would they force you to buy at $60 when it's worth $65? You keep the $500 free and clear. Collateral is released.",
        actionLabel: "Nice! But What If...",
        setup: { simPrice: 65, daysLeft: 0 },
        math: [
          { label: "Stock at expiry", value: "$65" },
          { label: "Strike price", value: "$60" },
          { label: "Put expires", value: "Worthless" },
          { label: "", value: "" },
          { label: "Your profit", value: "+$500", highlight: true },
          { label: "Collateral", value: "Released ✓" }
        ]
      },
      {
        text: "But if KO had crashed to $50? You're FORCED to buy 100 shares at $60 - that's $6,000 for stock worth only $5,000. Instant $1,000 loss, minus the $500 you collected = $500 net loss.",
        actionLabel: "See the Math",
        setup: { simPrice: 50, daysLeft: 0 },
        math: [
          { label: "You collected", value: "+$500" },
          { label: "Forced to buy at", value: "$60" },
          { label: "Stock now worth", value: "$50", operation: "-" },
          { label: "Loss per share", value: "-$10", operation: "=" },
          { label: "× 100 shares", value: "" },
          { label: "Gross loss", value: "-$1,000" },
          { label: "", value: "" },
          { label: "Net result", value: "-$500", highlight: true }
        ]
      },
      {
        text: "What if KO went to $0 (bankruptcy)? You'd owe $6,000 for worthless stock. Minus premium = $5,500 loss. Selling puts has LIMITED profit ($500) but LARGE potential loss ($5,500).",
        actionLabel: "Why Do People Do This?",
        setup: { simPrice: 0, daysLeft: 0 },
        math: [
          { label: "Max profit (premium)", value: "+$500" },
          { label: "Max loss (strike × 100)", value: "-$5,500" },
          { label: "", value: "" },
          { label: "Risk/Reward ratio", value: "11:1 against you", highlight: true }
        ],
        tooltips: [
          { term: "Risk/Reward ratio", metaphor: "You're betting $5,500 to win $500. Like playing poker where you can only win $50 but could lose $550. The odds better be REALLY in your favor." }
        ]
      },
      {
        text: "Because it works MOST of the time. Remember: 80% of options expire worthless. Option sellers collect premium month after month. The key is position sizing - never bet what you can't afford to lose.",
        actionLabel: "One More Thing",
        setup: { simPrice: 65, daysLeft: 0 },
        math: [
          { label: "Options that expire worthless", value: "~80%" },
          { label: "Seller wins", value: "Most months" },
          { label: "", value: "" },
          { label: "But when you lose...", value: "", highlight: true },
          { label: "You lose BIG", value: "Size accordingly" }
        ],
        tooltips: [
          { term: "position sizing", metaphor: "Don't put all your chips on one hand. If you have $50,000, maybe only risk $5,000 on any single trade. That way one bad bet doesn't wipe you out." },
          { term: "80% of options expire worthless", metaphor: "Like raffle tickets - most people lose. As the seller, you're the one running the raffle. You keep most of the ticket money." }
        ]
      },
      {
        text: "Pro tip: only sell puts on stocks you'd be HAPPY to own at that price. If KO drops to $60 and you get assigned, you now own a solid dividend stock at a discount. That's called a 'cash-secured put.'",
        actionLabel: "Complete Training",
        setup: { simPrice: 60, daysLeft: 0 },
        math: [
          { label: "Stock you wanted anyway", value: "KO" },
          { label: "Price you wanted", value: "$60" },
          { label: "Actually paid", value: "$55", highlight: true },
          { label: "(strike - premium)", value: "" },
          { label: "", value: "" },
          { label: "Assignment = buying at a discount", value: "" }
        ],
        tooltips: [
          { term: "cash-secured put", metaphor: "Like telling a car dealer: 'I'll buy that car for $20,000 if you pay me $500 to wait.' If they say yes, either you get $500 free, or you get the car you wanted anyway at a discount." },
          { term: "dividend stock", metaphor: "A stock that pays you just for owning it. Like a rental property that sends you a check every quarter, except you don't have to fix any toilets." }
        ]
      }
    ]
  }
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
