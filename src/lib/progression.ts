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
  operation?: "+" | "-" | "=";
  highlight?: boolean;
}

export interface Prediction {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface NarrativeStep {
  text: string;
  actionLabel: string;
  setup?: {
    simPrice?: number;
    strike?: number;
    daysLeft?: number;
    type?: "call" | "put";
    side?: "buy" | "sell";
    stockSymbol?: string;
  };
  math?: MathLine[];
  tooltips?: Tooltip[];
  // Profit earned when completing this step (positive or negative)
  profit?: number;
  // Optional prediction question for this step
  prediction?: Prediction;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  steps: NarrativeStep[];
}

export type ContentVariant = "default" | "tech";

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Spectator",
    description: "Stock market 101.",
    requiredPnl: 0,
  },
  {
    id: 2,
    title: "Buyer",
    description: "First $500 profit.",
    requiredPnl: 500,
  },
  {
    id: 3,
    title: "Survivor",
    description: "Beat time decay.",
    requiredPnl: 1000,
  },
  { id: 4, title: "Casino", description: "Sell risk.", requiredPnl: 2500 },
  { id: 5, title: "Greek", description: "Mastery.", requiredPnl: 5000 },
];

// Men Tech Focused variant - TSLA heavy, casino metaphors, tech energy
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MODULES_TECH: Module[] = [
  {
    id: "market-101",
    title: "Stock Market 101",
    description: "How anyone can build wealth",
    steps: [
      {
        text: "Welcome to Wall Street. Behind all the jargon and flashing screens, the stock market is just a MARKETPLACE - like a farmer's market, but for pieces of companies.",
        actionLabel: "Tell Me More",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "The stock market is", value: "" },
          { label: "", value: "" },
          { label: "A marketplace", value: "for buying & selling" },
          { label: "Pieces of companies", value: "called 'shares'" },
          { label: "", value: "" },
          {
            label: "That's it.",
            value: "No magic. Just trading.",
            highlight: true,
          },
        ],
        tooltips: [
          {
            term: "MARKETPLACE",
            metaphor:
              "Like eBay for company ownership. Buyers bid, sellers ask, and when they agree on a price, a trade happens.",
          },
        ],
      },
      {
        text: "Every trade has two sides: a BUYER who thinks the price will go up, and a SELLER who wants cash now. The magic? YOU can play either role. Buy today, sell tomorrow. Or sell first, buy later.",
        actionLabel: "Wait, Sell First?",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "Every trade needs", value: "" },
          { label: "", value: "" },
          { label: "A Buyer", value: "Wants to own 📈" },
          { label: "A Seller", value: "Wants cash now 💵" },
          { label: "", value: "" },
          { label: "You can be either", value: "", highlight: true },
          { label: "Switch roles anytime", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "BUYER",
            metaphor:
              "Like someone at an auction raising their paddle. They believe what they're buying is worth more than the money they're spending.",
          },
          {
            term: "SELLER",
            metaphor:
              "The person holding the item at the auction. They'd rather have cash than keep holding what they own.",
          },
        ],
      },
      {
        text: "Yes! Advanced traders can 'short' - borrow shares, sell them, then buy them back cheaper. But let's start simple. As a main street investor, here are YOUR paths to profit.",
        actionLabel: "Show Me the Ways",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "Ways to make money", value: "" },
          { label: "", value: "" },
          { label: "1. Buy Low, Sell High", value: "Capital gains" },
          { label: "2. Collect Dividends", value: "Passive income" },
          { label: "3. Trade Options", value: "Leverage & hedging" },
          { label: "", value: "" },
          { label: "Let's explore each", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "short",
            metaphor:
              "Like borrowing your neighbor's lawnmower, selling it at a garage sale, then buying a cheaper one to return. Risky if lawnmower prices go up!",
          },
        ],
      },
      {
        text: "PATH 1: Buy Low, Sell High. You buy Apple at $150. Later it's worth $175. Sell for $25 profit per share. This is CAPITAL GAINS - the most classic way to invest.",
        actionLabel: "How Much Can I Make?",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "You bought at", value: "$150" },
          { label: "Now worth", value: "$175" },
          { label: "", value: "" },
          { label: "Profit per share", value: "+$25", highlight: true },
          { label: "", value: "" },
          { label: "If you own 100 shares", value: "" },
          { label: "Total profit", value: "+$2,500", highlight: true },
        ],
        tooltips: [
          {
            term: "CAPITAL GAINS",
            metaphor:
              "The difference between what you paid and what you sold for. Like buying a house for $200k and selling it for $250k - that $50k is your capital gain.",
          },
        ],
      },
      {
        text: "The math is simple but powerful. Over 30 years, the S&P 500 has returned about 10% per year on average. $10,000 invested in 1994 would be worth over $170,000 today.",
        actionLabel: "What About Dividends?",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "S&P 500 average return", value: "~10% per year" },
          { label: "", value: "" },
          { label: "$10,000 invested", value: "(30 years ago)" },
          { label: "Would now be", value: "$170,000+", highlight: true },
          { label: "", value: "" },
          { label: "That's the power of", value: "compound growth" },
        ],
        tooltips: [
          {
            term: "S&P 500",
            metaphor:
              "A basket of the 500 biggest US companies. Think of it as buying a tiny slice of Apple, Microsoft, Amazon, Google, and 496 others - all in one purchase.",
          },
          {
            term: "compound growth",
            metaphor:
              "Your gains making more gains. Like a snowball rolling downhill - it starts small but grows faster and faster.",
          },
        ],
      },
      {
        text: "PATH 2: Collect DIVIDENDS. Some companies pay you just for owning their stock. Coca-Cola has paid dividends for 100+ years straight. Own 100 shares? Get a check every quarter.",
        actionLabel: "How Much Do They Pay?",
        setup: { stockSymbol: "KO", simPrice: 60 },
        math: [
          { label: "Stock", value: "KO (Coca-Cola)" },
          { label: "Share price", value: "$60" },
          { label: "", value: "" },
          { label: "Annual dividend", value: "$1.84/share" },
          { label: "Dividend yield", value: "~3%", highlight: true },
          { label: "", value: "" },
          { label: "100 shares = ", value: "$184/year in cash" },
        ],
        tooltips: [
          {
            term: "DIVIDENDS",
            metaphor:
              "Like owning a rental property that sends you rent checks, except it's a company sending you a slice of their profits.",
          },
          {
            term: "Dividend yield",
            metaphor:
              "The annual 'interest rate' you earn. A 3% yield means $60 invested pays you $1.80 per year.",
          },
        ],
      },
      {
        text: "The best part? DRIP (Dividend Reinvestment). Instead of taking cash, buy more shares. Those new shares earn dividends too. Over decades, this snowball effect is massive.",
        actionLabel: "Show Me the Growth",
        setup: { stockSymbol: "KO", simPrice: 60 },
        math: [
          { label: "Without DRIP", value: "" },
          { label: "You get cash", value: "$184/year" },
          { label: "Share count stays", value: "100 shares" },
          { label: "", value: "" },
          { label: "With DRIP", value: "", highlight: true },
          { label: "Cash buys more shares", value: "" },
          { label: "More shares = more dividends", value: "" },
          { label: "20 years later", value: "180+ shares", highlight: true },
        ],
        tooltips: [
          {
            term: "DRIP",
            metaphor:
              "Like setting your bank account to auto-invest your interest. You never see the cash, but your pile keeps growing automatically.",
          },
        ],
        prediction: {
          question: "If you reinvest dividends, what happens over time?",
          options: [
            "You own more shares each year",
            "Your dividend payments shrink",
            "Nothing changes",
          ],
          correctIndex: 0,
          explanation:
            "Reinvesting means your dividends buy more shares. More shares = more dividends next quarter. It compounds over time!",
        },
      },
      {
        text: "PATH 3: Trade OPTIONS. Instead of buying stock, buy contracts that profit when stocks move. Less cash needed, but higher risk. This is what we'll master in this course.",
        actionLabel: "Why Options?",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Stock investing", value: "" },
          { label: "Buy 100 shares of Tesla", value: "$20,000" },
          { label: "If it goes up 15%", value: "+$3,000" },
          { label: "", value: "" },
          { label: "Options trading", value: "", highlight: true },
          { label: "Buy an option contract", value: "$1,000" },
          { label: "Same move can yield", value: "+$2,000+", highlight: true },
        ],
        tooltips: [
          {
            term: "OPTIONS",
            metaphor:
              "Like a coupon that locks in today's price. If prices go up, your coupon is valuable. If they don't, you only lose what you paid for the coupon.",
          },
        ],
      },
      {
        text: "Options let you: bet on UP moves (calls), bet on DOWN moves (puts), or sell insurance to others and collect fees. More tools = more opportunities. Ready to learn?",
        actionLabel: "Start Learning Options",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Your toolkit", value: "" },
          { label: "", value: "" },
          { label: "Stocks", value: "Buy and hold" },
          { label: "Dividends", value: "Passive income" },
          { label: "Calls", value: "Bet on UP 📈", highlight: true },
          { label: "Puts", value: "Bet on DOWN 📉", highlight: true },
          { label: "Selling", value: "Collect fees 🎰", highlight: true },
          { label: "", value: "" },
          { label: "Let's dive in →", value: "" },
        ],
      },
    ],
  },
  {
    id: "investor-types",
    title: "Types of Investors",
    description: "Find your style",
    steps: [
      {
        text: "Not everyone invests the same way. Your strategy depends on your goals, time, and personality. Let's meet the three main types: PASSIVE investors, ACTIVE investors, and TRADERS.",
        actionLabel: "Show Me Each Type",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Three investing styles", value: "" },
          { label: "", value: "" },
          { label: "Passive", value: "Set it and forget it" },
          { label: "Active", value: "Research & pick stocks" },
          { label: "Trader", value: "Quick moves, high focus" },
          { label: "", value: "" },
          {
            label: "No 'right' answer",
            value: "Just what fits YOU",
            highlight: true,
          },
        ],
        tooltips: [
          {
            term: "PASSIVE investors",
            metaphor:
              "Like planting an oak tree. You plant it, water it occasionally, and let it grow for decades. Minimal effort, maximum patience.",
          },
          {
            term: "ACTIVE investors",
            metaphor:
              "Like tending a garden. You research which plants to grow, prune regularly, and swap out what's not working.",
          },
          {
            term: "TRADERS",
            metaphor:
              "Like a day at the farmer's market. You're buying and selling constantly, looking for quick opportunities before the day ends.",
          },
        ],
      },
      {
        text: "TYPE 1: The PASSIVE Investor. 'Set it and forget it.' Buy index funds, reinvest dividends, check your account once a year. Warren Buffett recommends this for most people.",
        actionLabel: "Why Choose Passive?",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Passive investing", value: "" },
          { label: "", value: "" },
          { label: "Time spent", value: "~1 hour/year" },
          { label: "Strategy", value: "Buy & hold forever" },
          { label: "Main vehicle", value: "Index funds (SPY, VTI)" },
          { label: "", value: "" },
          { label: "Best for", value: "Busy people", highlight: true },
          { label: "", value: "Long time horizons", highlight: true },
        ],
        tooltips: [
          {
            term: "index funds",
            metaphor:
              "Like buying a sampler platter instead of picking one dish. You get a little bit of everything - if one company fails, others carry the weight.",
          },
          {
            term: "Set it and forget it",
            metaphor:
              "Like a slow cooker. Put your ingredients in, set the timer, and come back hours later to a finished meal. No stirring required.",
          },
        ],
      },
      {
        text: "Passive wins because of MATH. Studies show 90% of professional fund managers FAIL to beat the S&P 500 over 15 years. If pros can't beat the market, why try? Just buy the market.",
        actionLabel: "See the Data",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Fund managers who", value: "" },
          {
            label: "beat S&P 500 over 15 years",
            value: "~10%",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "Why so few win?", value: "" },
          { label: "Fees eat returns", value: "-1% to -2%/year" },
          { label: "Bad timing", value: "Buy high, sell low" },
          { label: "Overtrading", value: "Taxes + commissions" },
          { label: "", value: "" },
          { label: "The simple path", value: "Buy index, hold forever" },
        ],
        tooltips: [
          {
            term: "MATH",
            metaphor:
              "Every trade has a cost. Like a casino taking a small cut from every pot - even if you're skilled, the house edge adds up over thousands of hands.",
          },
        ],
      },
      {
        text: "Passive downsides? You'll never beat the market - you ARE the market. And during crashes, you just hold and watch. In 2008, passive investors lost 50%. They made it back by 2013, but it takes nerves of steel.",
        actionLabel: "What About Active?",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Passive tradeoffs", value: "" },
          { label: "", value: "" },
          { label: "You'll match the market", value: "Never beat it" },
          { label: "During crashes", value: "You hold and wait" },
          { label: "", value: "" },
          { label: "2008 crash", value: "-50%", highlight: true },
          { label: "Recovery time", value: "~5 years" },
          { label: "", value: "" },
          { label: "Requires", value: "Patience & discipline" },
        ],
        prediction: {
          question:
            "Why do most professional fund managers fail to beat index funds?",
          options: [
            "They're not smart enough",
            "Fees, taxes, and bad timing add up",
            "Index funds are rigged",
          ],
          correctIndex: 1,
          explanation:
            "It's not about smarts - it's about costs. Management fees, trading costs, and taxes compound over time. Even small drags of 1-2% per year add up to massive underperformance over decades.",
        },
      },
      {
        text: "TYPE 2: The ACTIVE Investor. You research companies, read earnings reports, and pick individual stocks. More work, but you can potentially beat the market - or own companies you believe in.",
        actionLabel: "Why Choose Active?",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "Active investing", value: "" },
          { label: "", value: "" },
          { label: "Time spent", value: "5-10 hours/week" },
          { label: "Strategy", value: "Research & pick stocks" },
          { label: "Hold period", value: "Months to years" },
          { label: "", value: "" },
          { label: "Best for", value: "Curious people", highlight: true },
          { label: "", value: "Who enjoy research", highlight: true },
        ],
        tooltips: [
          {
            term: "ACTIVE Investor",
            metaphor:
              "Like being a talent scout. You watch games, study stats, and try to find the next star before everyone else notices.",
          },
        ],
      },
      {
        text: "Active investors look for EDGE. Maybe you work in tech and spot trends early. Maybe you noticed everyone using a new product before Wall Street caught on. Personal knowledge can be powerful.",
        actionLabel: "What's the Catch?",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "Sources of edge", value: "" },
          { label: "", value: "" },
          { label: "Industry knowledge", value: "You work in the field" },
          { label: "Consumer insights", value: "You spotted the trend" },
          { label: "Deep research", value: "You read the 10-Ks" },
          { label: "", value: "" },
          { label: "Peter Lynch's rule", value: "", highlight: true },
          { label: "'Buy what you know'", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "EDGE",
            metaphor:
              "Your unfair advantage. Like a poker player who can read tells that others miss. Without an edge, you're just gambling.",
          },
          {
            term: "10-Ks",
            metaphor:
              "A company's annual report card filed with the SEC. Boring to read, but full of details that news articles skip over.",
          },
        ],
      },
      {
        text: "The catch? You're competing against hedge funds with PhDs, supercomputers, and insider connections. Most individual stock pickers underperform. But if you love research, this path can be rewarding.",
        actionLabel: "What About Traders?",
        setup: { stockSymbol: "AAPL", simPrice: 175 },
        math: [
          { label: "Your competition", value: "" },
          { label: "", value: "" },
          { label: "Hedge funds", value: "$100M research budgets" },
          { label: "Algorithms", value: "Trade in milliseconds" },
          { label: "Insiders", value: "Talk to CEOs directly" },
          { label: "", value: "" },
          { label: "Your advantage?", value: "", highlight: true },
          { label: "Patience", value: "They need quarterly returns" },
          { label: "Focus", value: "They can't own small stocks" },
        ],
      },
      {
        text: "TYPE 3: The TRADER. Short-term moves, sometimes holding for just minutes or days. You're not investing in companies - you're betting on price movements. Options, momentum, technical analysis.",
        actionLabel: "Why Choose Trading?",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Trading", value: "" },
          { label: "", value: "" },
          { label: "Time spent", value: "2-8 hours/day" },
          { label: "Strategy", value: "Ride short-term moves" },
          { label: "Hold period", value: "Minutes to weeks" },
          { label: "", value: "" },
          { label: "Best for", value: "High focus people", highlight: true },
          { label: "", value: "Who thrive on action", highlight: true },
        ],
        tooltips: [
          {
            term: "TRADER",
            metaphor:
              "Like a surfer catching waves. You don't care where the ocean is going long-term - you just want to ride the next wave and get out before it crashes.",
          },
          {
            term: "technical analysis",
            metaphor:
              "Reading price charts like tea leaves. Traders believe past patterns predict future moves - support levels, resistance, momentum.",
          },
        ],
      },
      {
        text: "Traders use tools like OPTIONS to amplify moves. A 5% stock move can become a 50% option gain. But it cuts both ways - small losses become big losses fast. This is where discipline matters most.",
        actionLabel: "Is Trading Right for Me?",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Trader's leverage", value: "" },
          { label: "", value: "" },
          { label: "Stock moves 5%", value: "+$500 on $10,000" },
          {
            label: "Option moves 50%",
            value: "+$500 on $1,000",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "But also...", value: "" },
          { label: "Stock drops 5%", value: "-$500 on $10,000" },
          {
            label: "Option drops 50%",
            value: "-$500 on $1,000",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "Leverage amplifies", value: "wins AND losses" },
        ],
      },
      {
        text: "Reality check: 70-90% of day traders LOSE money. The ones who win treat it like a job - strict rules, risk management, emotional control. If you're looking for easy money, this isn't it.",
        actionLabel: "How Do I Choose?",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Day trader stats", value: "" },
          { label: "", value: "" },
          { label: "Lose money", value: "70-90%", highlight: true },
          { label: "Break even", value: "~5-15%" },
          { label: "Consistently profit", value: "~5-10%" },
          { label: "", value: "" },
          { label: "Winners have", value: "" },
          { label: "Strict rules", value: "Entry/exit plans" },
          { label: "Risk limits", value: "Never bet the farm" },
          { label: "Emotional control", value: "No revenge trading" },
        ],
        tooltips: [
          {
            term: "revenge trading",
            metaphor:
              "Like a gambler trying to win back losses by doubling down. It almost always makes things worse. The market doesn't care about your feelings.",
          },
        ],
      },
      {
        text: "Here's a simple framework. Ask yourself: How much TIME do I have? Do I want to BEAT the market or MATCH it? And honestly - do I have the DISCIPLINE to stick to a plan when emotions run hot?",
        actionLabel: "See the Summary",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Ask yourself", value: "" },
          { label: "", value: "" },
          { label: "Time available?", value: "" },
          { label: "  1 hr/year", value: "→ Passive" },
          { label: "  5 hr/week", value: "→ Active" },
          { label: "  5 hr/day", value: "→ Trading" },
          { label: "", value: "" },
          { label: "Goal?", value: "" },
          { label: "  Match market", value: "→ Passive" },
          { label: "  Beat market", value: "→ Active/Trading" },
        ],
        prediction: {
          question: "Which approach is 'best' for building wealth?",
          options: [
            "Passive - it's proven to work",
            "Active - pick winners",
            "Trading - maximize gains",
            "Depends on your situation",
          ],
          correctIndex: 3,
          explanation:
            "There's no universal 'best.' Passive works for most people, but some thrive with active investing or trading. The best approach is one you'll stick with consistently over time.",
        },
      },
      {
        text: "Many people COMBINE approaches. Core portfolio in index funds (passive), some individual stocks you believe in (active), and a small 'play money' account for options (trading). Diversify your strategy too.",
        actionLabel: "Ready to Learn Options",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Hybrid approach", value: "" },
          { label: "", value: "" },
          { label: "80% of portfolio", value: "Index funds (passive)" },
          { label: "15% of portfolio", value: "Stock picks (active)" },
          {
            label: "5% of portfolio",
            value: "Options (trading)",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "The 5% rule", value: "", highlight: true },
          { label: "Only trade with money", value: "" },
          { label: "you can afford to lose", value: "" },
        ],
        tooltips: [
          {
            term: "play money",
            metaphor:
              "Casino chips that won't hurt if you lose them. Like going to Vegas with $500 in your pocket - fun to gamble with, but you've already written it off mentally.",
          },
        ],
      },
    ],
  },
  {
    id: "stage",
    title: "The Stage",
    description: "How stocks move",
    steps: [
      {
        text: "Welcome to OptionsEd. In the next 15 minutes, you'll learn how options trading works through real scenarios. No jargon, no fluff - just the essentials.",
        actionLabel: "What Will I Learn?",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "You'll master", value: "" },
          { label: "", value: "" },
          { label: "Call options", value: "Betting UP 📈" },
          { label: "Put options", value: "Betting DOWN 📉" },
          { label: "Time decay", value: "The hidden cost ⏰" },
          { label: "Selling options", value: "Being the house 🎰" },
        ],
      },
      {
        text: "Tesla ($TSLA) is trading at $200. You think the price will go up after their big announcement tomorrow.",
        actionLabel: "Watch What Happens",
        setup: { stockSymbol: "TSLA", simPrice: 200 },
        math: [
          { label: "Stock", value: "TSLA" },
          { label: "Current price", value: "$200" },
          { label: "Your prediction", value: "📈 UP", highlight: true },
        ],
      },
      {
        text: "The announcement was a hit! Tesla jumped to $230. If you owned the stock, you'd have made $30 per share.",
        actionLabel: "What's the Problem?",
        setup: { simPrice: 230 },
        math: [
          { label: "Bought at", value: "$200" },
          { label: "Now worth", value: "$230" },
          { label: "", value: "" },
          { label: "Profit per share", value: "+$30", highlight: true },
        ],
      },
      {
        text: "But here's the problem: to buy 100 shares of Tesla at $200, you'd need $20,000. And if Tesla dropped instead? You'd lose real money with no limit.",
        actionLabel: "Is There a Better Way?",
        setup: { simPrice: 200 },
        math: [
          { label: "100 shares × $200", value: "$20,000" },
          { label: "If stock drops to $150", value: "" },
          { label: "Your loss", value: "-$5,000", highlight: true },
        ],
      },
      {
        text: "What if you could make money on that move without buying the stock? That's what OPTIONS let you do. Less cash upfront, and your max loss is fixed.",
        actionLabel: "Show Me How",
        setup: { simPrice: 230 },
        math: [
          { label: "Buying stock", value: "" },
          { label: "Cash needed", value: "$20,000" },
          { label: "If it crashes", value: "Unlimited loss" },
          { label: "", value: "" },
          { label: "Buying options", value: "", highlight: true },
          { label: "Cash needed", value: "~$1,000", highlight: true },
          { label: "If it crashes", value: "Lose $1,000 max", highlight: true },
        ],
        tooltips: [
          {
            term: "OPTIONS",
            metaphor:
              "Like a movie ticket: you pay a small fee now for the right to see the show later. If you skip the movie, you only lose the ticket price.",
          },
        ],
      },
    ],
  },
  {
    id: "rocket",
    title: "Call Options",
    description: "Betting the price goes UP",
    steps: [
      {
        text: "An OPTION is a contract that lets you bet on where a stock will go. A CALL option makes money when the stock goes UP.",
        actionLabel: "Got It",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Two types of options", value: "" },
          { label: "", value: "" },
          { label: "CALL", value: "Bet on UP 📈", highlight: true },
          { label: "PUT", value: "Bet on DOWN 📉" },
        ],
        tooltips: [
          {
            term: "OPTION",
            metaphor:
              "Like a concert ticket: you pay upfront for the right to attend, but you're not forced to go.",
          },
          {
            term: "CALL option",
            metaphor:
              "Like a store coupon that locks in today's price. If the price goes up, your coupon becomes valuable. If it goes down, you just toss the coupon.",
          },
        ],
      },
      {
        text: "Important: each option contract controls 100 shares. When we say an option costs '$10', that's $10 per share, so the actual cost is $1,000 (100 × $10).",
        actionLabel: "Got It",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Option price per share", value: "$10" },
          { label: "Shares per contract", value: "× 100" },
          { label: "Actual cost", value: "$1,000", highlight: true },
        ],
        tooltips: [
          {
            term: "contract",
            metaphor:
              "Like buying a pack of gum: the price tag says $1 per stick, but you're buying a 100-pack. The contract is the whole pack.",
          },
        ],
      },
      {
        text: "The STRIKE price ($210) is your target. If Tesla goes ABOVE $210, your call is 'in the money' and has real value. If it stays below? Your option expires worthless.",
        actionLabel: "What Does It Cost?",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Current stock price", value: "$200" },
          { label: "Your strike price", value: "$210" },
          { label: "", value: "" },
          { label: "Below $210", value: "Out of the money ❌" },
          { label: "Above $210", value: "In the money ✅", highlight: true },
        ],
        tooltips: [
          {
            term: "STRIKE price",
            metaphor:
              "The price printed on your ticket. Like a gift card that says 'Buy one pizza for $15' - $15 is the strike. If pizzas cost $20, your card is valuable.",
          },
          {
            term: "in the money",
            metaphor:
              "Your lottery ticket is a winner. The numbers match, so your ticket has real cash value.",
          },
          {
            term: "expires worthless",
            metaphor:
              "Like a Groupon you forgot about - once the date passes, it's just paper.",
          },
        ],
      },
      {
        text: "Tesla is at $200. You buy a Call option with a '$210 strike' for $10. This gives you the RIGHT (not obligation) to buy Tesla at $210, no matter how high it goes.",
        actionLabel: "Buy the Call",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Your cost per share", value: "$10" },
          { label: "Strike price", value: "$210" },
          { label: "Current stock", value: "$200" },
          { label: "", value: "" },
          { label: "Breakeven price", value: "$220", highlight: true },
          { label: "(strike + premium)", value: "" },
        ],
        tooltips: [
          {
            term: "RIGHT (not obligation)",
            metaphor:
              "Like a reservation at a restaurant: you CAN show up and get your table, but nobody forces you to eat there.",
          },
          {
            term: "Breakeven",
            metaphor:
              "The point where you get your ticket money back. Like driving to a concert - you need to enjoy it enough to cover the gas money AND the ticket.",
          },
          {
            term: "$10",
            metaphor:
              "The 'premium' - what you pay for the ticket itself. This is your max loss if things go wrong.",
          },
        ],
        prediction: {
          question: "If Tesla goes to $215 at expiration, do you make money?",
          options: [
            "Yes, I'm above the $210 strike!",
            "No, I need to hit $220 to profit",
            "I break even",
          ],
          correctIndex: 1,
          explanation:
            "Even though $215 is above your $210 strike, you paid $10 for the option. You need $220 ($210 + $10) to actually profit.",
        },
      },
      {
        text: "Wait - breakeven is $220, not $210? Yes! Even if Tesla hits $215, you'd exercise at $210, but you PAID $10 for that right. You need $210 + $10 = $220 to actually profit.",
        actionLabel: "See the Payoff",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 215,
          daysLeft: 0,
        },
        math: [
          { label: "Stock at expiry", value: "$215" },
          { label: "Your strike", value: "$210", operation: "-" },
          { label: "Intrinsic value", value: "$5", operation: "=" },
          { label: "What you paid", value: "$10", operation: "-" },
          { label: "Net P&L", value: "-$5", highlight: true },
        ],
        tooltips: [
          {
            term: "exercise",
            metaphor:
              "Using your ticket. Like redeeming a coupon at the store - you're cashing in your right.",
          },
          {
            term: "Intrinsic value",
            metaphor:
              "The real cash value RIGHT NOW. Like a $20 gift card to a store - it's worth $20, no more, no less.",
          },
        ],
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
          { label: "Total profit", value: "$2,000", highlight: true },
        ],
        profit: 2000,
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
          {
            label: "Profit ($20 × 100 × 20)",
            value: "+$40,000",
            highlight: true,
          },
        ],
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
          {
            label: "Options expire worthless",
            value: "-$20,000",
            highlight: true,
          },
          { label: "You own nothing", value: "✗" },
        ],
      },
    ],
  },
  {
    id: "parachute",
    title: "Put Options",
    description: "Betting the price goes DOWN",
    steps: [
      {
        text: "A PUT option is the opposite. It makes money when the stock goes DOWN. Think of it as insurance against a crash.",
        actionLabel: "Got It",
        setup: {
          type: "put",
          side: "buy",
          strike: 200,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "CALL option", value: "Profits when UP 📈" },
          { label: "", value: "" },
          {
            label: "PUT option",
            value: "Profits when DOWN 📉",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "Think of it as", value: "Crash insurance 🛡️" },
        ],
        tooltips: [
          {
            term: "PUT option",
            metaphor:
              "Like car insurance: you pay a small premium hoping you'll never need it, but if you crash, it pays out.",
          },
        ],
      },
      {
        text: "Wait - how can you 'sell' stock you don't own? You're not actually selling stock. You're buying the RIGHT to sell at a set price. Think of it as a betting slip on the stock going down, not actual shares.",
        actionLabel: "That Makes Sense",
        setup: {
          type: "put",
          side: "buy",
          strike: 200,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Common confusion", value: "" },
          { label: "'Sell' in put option", value: "≠ selling stock" },
          { label: "", value: "" },
          {
            label: "What you're buying",
            value: "A contract 📜",
            highlight: true,
          },
          { label: "The contract says", value: "You CAN sell @ $200" },
        ],
        tooltips: [
          {
            term: "RIGHT to sell",
            metaphor:
              "Like a pawn shop guarantee: 'We'll buy your guitar for $500 anytime this month.' You don't need to own the guitar yet - the guarantee itself has value if guitar prices drop.",
          },
        ],
      },
      {
        text: "Tesla is at $200 but looking shaky. You buy a Put option with a '$200 strike' for $10. This gives you the RIGHT to sell Tesla at $200, even if it crashes.",
        actionLabel: "Buy the Put",
        setup: {
          type: "put",
          side: "buy",
          strike: 200,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Your cost per share", value: "$10" },
          { label: "Strike price", value: "$200" },
          { label: "Current stock", value: "$200" },
          { label: "", value: "" },
          { label: "Breakeven price", value: "$190", highlight: true },
          { label: "(strike - premium)", value: "" },
        ],
        prediction: {
          question: "If Tesla crashes to $150, what's your profit per share?",
          options: [
            "$50 (the full drop)",
            "$40 ($50 minus my $10 cost)",
            "$150 (the stock price)",
          ],
          correctIndex: 1,
          explanation:
            "Your Put lets you sell at $200 when it's worth $150 = $50 intrinsic value. But you paid $10, so your net profit is $40 per share.",
        },
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
          { label: "Total profit", value: "$4,000", highlight: true },
        ],
        profit: 4000,
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
          { label: "Profit ($40 × 100)", value: "+$4,000", highlight: true },
        ],
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
          { label: "(That's it. Limited risk.)", value: "" },
        ],
        tooltips: [
          {
            term: "max loss",
            metaphor:
              "Like a movie ticket for a bad film - worst case, you wasted $15. The movie can't reach into your wallet and take more.",
          },
          {
            term: "premium",
            metaphor:
              "The price of admission. Like paying cover at a club - that money's gone whether you have fun or not.",
          },
        ],
      },
    ],
  },
  {
    id: "ice-cube",
    title: "Time Decay",
    description: "Options expire",
    steps: [
      {
        text: "Here's the catch: options EXPIRE. You pay for the right to buy/sell, but only for a limited time. Like a melting ice cube.",
        actionLabel: "See an Example",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Stocks", value: "Hold forever ♾️" },
          {
            label: "Options",
            value: "Have expiration date ⏰",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "After expiry", value: "Option = worthless" },
          { label: "Your money", value: "Gone 💨" },
        ],
        tooltips: [
          {
            term: "EXPIRE",
            metaphor:
              "Like milk in your fridge - it has a 'use by' date. After that, it's worthless no matter how much you paid.",
          },
        ],
      },
      {
        text: "You buy a Tesla Call ($210 strike) for $10 while the stock is at $200. You have 30 days for Tesla to go above $210.",
        actionLabel: "Why Does Time Matter?",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "Option cost", value: "$10" },
          { label: "Days until expiry", value: "30" },
          { label: "Stock needs to reach", value: "$220", highlight: true },
          { label: "(for you to profit)", value: "" },
        ],
      },
      {
        text: "Why does time kill your option? Because the less time left, the less CHANCE the stock has to move in your favor. Probability shrinks → value shrinks. Wall Street calls this 'theta decay.'",
        actionLabel: "See It In Action",
        setup: {
          type: "call",
          side: "buy",
          strike: 210,
          simPrice: 200,
          daysLeft: 30,
        },
        math: [
          { label: "More time", value: "More chance to win" },
          { label: "Less time", value: "Less chance to win" },
          { label: "", value: "" },
          { label: "Chance ↓", value: "Value ↓", highlight: true },
          { label: "", value: "" },
          { label: "This is called", value: "Theta (Θ) decay" },
        ],
        tooltips: [
          {
            term: "theta decay",
            metaphor:
              "Like a parking meter ticking down. Every minute that passes, you're losing money - even if nothing else changes.",
          },
          {
            term: "Probability shrinks",
            metaphor:
              "Imagine betting your friend will text you. With a week to wait, good odds. With 5 minutes left? Not looking good.",
          },
        ],
      },
      {
        text: "20 days pass. Tesla is still at $200. Your option is melting away - it's now worth only $3 because time is running out. You've lost $7 even though the stock hasn't moved!",
        actionLabel: "Can I Get Out?",
        setup: { simPrice: 200, daysLeft: 10 },
        math: [
          { label: "Original cost", value: "$10" },
          { label: "Days left", value: "10" },
          { label: "Current value", value: "$3" },
          { label: "Paper loss", value: "-$7", highlight: true },
        ],
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
          {
            label: "If you hold & stock stays flat",
            value: "",
            highlight: true,
          },
          { label: "Option expires worthless", value: "$0" },
          { label: "Net loss", value: "-$10", highlight: true },
        ],
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
          { label: "This is called", value: "'Theta burn'" },
        ],
        tooltips: [
          {
            term: "ACCELERATES",
            metaphor:
              "Like ice cream on a hot day. First hour? Slow drip. Last 10 minutes? Melting everywhere.",
          },
          {
            term: "Theta burn",
            metaphor:
              "Wall Street's term for watching your money evaporate. Like leaving cash on a campfire - the closer you get to the end, the faster it burns.",
          },
        ],
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
          { label: "(This is why 80% of options expire worthless)", value: "" },
        ],
        profit: -1000,
      },
    ],
  },
  {
    id: "casino",
    title: "Selling Options",
    description: "Being the house",
    steps: [
      {
        text: "Plot twist: you can SELL options instead of buying them. You collect the fee (premium) upfront, but you take on the risk. You become the casino.",
        actionLabel: "Show Me",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Buying options", value: "" },
          { label: "You pay premium", value: "Limited loss" },
          { label: "You hope to win big", value: "Unlimited gain" },
          { label: "", value: "" },
          { label: "Selling options", value: "", highlight: true },
          { label: "You collect premium", value: "Limited gain" },
          { label: "You hope nothing happens", value: "Large risk" },
        ],
        tooltips: [
          {
            term: "SELL options",
            metaphor:
              "Like selling insurance. State Farm collects premiums every month. Most months, nothing happens and they keep it. But when disaster strikes, they pay out big.",
          },
          {
            term: "become the casino",
            metaphor:
              "The house always has an edge - they win most hands but lose occasionally. Option sellers are the house: small wins most of the time, big losses sometimes.",
          },
        ],
      },
      {
        text: "When you SELL a Put, someone BUYS it from you. They pay you $5 per share for the insurance. That's $500 (100 shares × $5) in your pocket immediately.",
        actionLabel: "Where Does the Money Come From?",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Premium per share", value: "$5" },
          { label: "Shares per contract", value: "× 100" },
          { label: "Cash you receive NOW", value: "$500", highlight: true },
        ],
      },
      {
        text: "Coca-Cola (KO) is stable at $65. Someone wants insurance (a Put) in case it drops to $60. You sell them that Put and collect $500 upfront.",
        actionLabel: "What's the Catch?",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Stock", value: "KO (Coca-Cola)" },
          { label: "Current price", value: "$65" },
          { label: "Strike price", value: "$60" },
          { label: "", value: "" },
          { label: "You sell a Put", value: "" },
          { label: "You receive", value: "+$500", highlight: true },
        ],
        prediction: {
          question: "If KO stays above $60 at expiration, what happens?",
          options: [
            "I keep the $500, nothing else happens",
            "I have to buy shares anyway",
            "I lose the $500",
          ],
          correctIndex: 0,
          explanation:
            "When you sell a put, you collect premium upfront. If the stock stays ABOVE your strike, the put expires worthless and you keep the premium. That's the best outcome!",
        },
      },
      {
        text: "The catch: your broker will freeze about $6,000 in your account as 'collateral.' If KO drops below $60, you MUST buy 100 shares at $60. No backing out. This is called 'assignment.'",
        actionLabel: "Got It",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Cash received", value: "+$500" },
          { label: "Collateral frozen", value: "~$6,000" },
          { label: "Your obligation", value: "Buy 100 shares @ $60" },
          { label: "", value: "" },
          { label: "You cannot cancel this", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "collateral",
            metaphor:
              "Like a security deposit on an apartment. The landlord holds it to make sure you'll pay if something goes wrong. Your broker does the same.",
          },
          {
            term: "assignment",
            metaphor:
              "Getting called on your promise. You sold someone insurance, and now they're filing a claim. Time to pay up.",
          },
          {
            term: "No backing out",
            metaphor:
              "Like a pinky promise with legal consequences. You made a binding contract - the other person is counting on you.",
          },
        ],
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
          { label: "Collateral", value: "Released ✓" },
        ],
        profit: 500,
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
          { label: "Net result", value: "-$500", highlight: true },
        ],
      },
      {
        text: "What if KO went to $0 (bankruptcy)? You'd owe $6,000 for worthless stock. Minus premium = $5,500 loss. Selling puts has LIMITED profit ($500) but LARGE potential loss ($5,500).",
        actionLabel: "Why Do People Do This?",
        setup: { simPrice: 0, daysLeft: 0 },
        math: [
          { label: "Max profit (premium)", value: "+$500" },
          { label: "Max loss (strike × 100)", value: "-$5,500" },
          { label: "", value: "" },
          {
            label: "Risk/Reward ratio",
            value: "11:1 against you",
            highlight: true,
          },
        ],
        tooltips: [
          {
            term: "Risk/Reward ratio",
            metaphor:
              "You're betting $5,500 to win $500. Like playing poker where you can only win $50 but could lose $550. The odds better be REALLY in your favor.",
          },
        ],
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
          { label: "You lose BIG", value: "Size accordingly" },
        ],
        tooltips: [
          {
            term: "position sizing",
            metaphor:
              "Don't put all your chips on one hand. If you have $50,000, maybe only risk $5,000 on any single trade. That way one bad bet doesn't wipe you out.",
          },
          {
            term: "80% of options expire worthless",
            metaphor:
              "Like raffle tickets - most people lose. As the seller, you're the one running the raffle. You keep most of the ticket money.",
          },
        ],
      },
      {
        text: "Pro tip: only sell puts on stocks you'd be HAPPY to own at that price. If KO drops to $60 and you get assigned, you now own a solid dividend stock at a discount. That's called a 'cash-secured put.'",
        actionLabel: "See What You Learned",
        setup: { simPrice: 60, daysLeft: 0 },
        math: [
          { label: "Stock you wanted anyway", value: "KO" },
          { label: "Price you wanted", value: "$60" },
          { label: "Actually paid", value: "$55", highlight: true },
          { label: "(strike - premium)", value: "" },
          { label: "", value: "" },
          { label: "Assignment = buying at a discount", value: "" },
        ],
        tooltips: [
          {
            term: "cash-secured put",
            metaphor:
              "Like telling a car dealer: 'I'll buy that car for $20,000 if you pay me $500 to wait.' If they say yes, either you get $500 free, or you get the car you wanted anyway at a discount.",
          },
          {
            term: "dividend stock",
            metaphor:
              "A stock that pays you just for owning it. Like a rental property that sends you a check every quarter, except you don't have to fix any toilets.",
          },
        ],
      },
      {
        text: "You made it. You now understand more about options than 90% of people who try to trade them. Before you trade real money, practice with paper trading on your broker's platform.",
        actionLabel: "Start Over",
        setup: { simPrice: 200, daysLeft: 30 },
        math: [
          { label: "What you learned", value: "", highlight: true },
          { label: "", value: "" },
          { label: "Calls", value: "Profit when UP" },
          { label: "Puts", value: "Profit when DOWN" },
          { label: "Time decay", value: "Options melt" },
          { label: "Selling", value: "Small wins, big risks" },
          { label: "", value: "" },
          { label: "Next steps", value: "", highlight: true },
          { label: "1. Paper trade first", value: "No real money" },
          { label: "2. Start small", value: "1-2 contracts max" },
          { label: "3. Know your max loss", value: "Before every trade" },
        ],
      },
    ],
  },
];

// Default variant - inclusive, diverse examples, softer metaphors
const MODULES_DEFAULT: Module[] = [
  {
    id: "market-101",
    title: "Stock Market 101",
    description: "Build wealth on your terms",
    steps: [
      {
        text: "Here's a secret: building wealth isn't just for Wall Street insiders. The stock market is simply a MARKETPLACE - and anyone can participate. Let's demystify it together.",
        actionLabel: "Tell Me More",
        setup: { stockSymbol: "SBUX", simPrice: 95 },
        math: [
          { label: "The stock market is", value: "" },
          { label: "", value: "" },
          { label: "A marketplace", value: "for buying & selling" },
          { label: "Pieces of companies", value: "called 'shares'" },
          { label: "", value: "" },
          {
            label: "That's it.",
            value: "No magic. Just trading.",
            highlight: true,
          },
        ],
        tooltips: [
          {
            term: "MARKETPLACE",
            metaphor:
              "Like Depop or Poshmark for company ownership. Buyers bid, sellers ask, and when they agree on a price, a trade happens.",
          },
        ],
      },
      {
        text: "Every trade has two sides: a BUYER who thinks the price will go up, and a SELLER who wants cash now. The empowering part? YOU can play either role. Buy today, sell tomorrow. Or sell first, buy later.",
        actionLabel: "Wait, Sell First?",
        setup: { stockSymbol: "SBUX", simPrice: 95 },
        math: [
          { label: "Every trade needs", value: "" },
          { label: "", value: "" },
          { label: "A Buyer", value: "Wants to own 📈" },
          { label: "A Seller", value: "Wants cash now 💵" },
          { label: "", value: "" },
          { label: "You can be either", value: "", highlight: true },
          { label: "Switch roles anytime", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "BUYER",
            metaphor:
              "Like someone at an estate sale raising their paddle. They believe what they're buying is worth more than the money they're spending.",
          },
          {
            term: "SELLER",
            metaphor:
              "The person letting go of the item. They'd rather have cash than keep holding what they own.",
          },
        ],
      },
      {
        text: "Yes! Advanced traders can 'short' - borrow shares, sell them, then buy them back cheaper. But let's start simple. As an everyday investor, here are YOUR paths to building wealth.",
        actionLabel: "Show Me the Ways",
        setup: { stockSymbol: "SBUX", simPrice: 95 },
        math: [
          { label: "Ways to make money", value: "" },
          { label: "", value: "" },
          { label: "1. Buy Low, Sell High", value: "Capital gains" },
          { label: "2. Collect Dividends", value: "Passive income" },
          { label: "3. Trade Options", value: "Leverage & hedging" },
          { label: "", value: "" },
          { label: "Let's explore each", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "short",
            metaphor:
              "Like borrowing your roommate's textbook, selling it online, then buying a cheaper used copy to return. Risky if textbook prices go up!",
          },
        ],
      },
      {
        text: "PATH 1: Buy Low, Sell High. You buy Starbucks at $80. Later it's worth $95. Sell for $15 profit per share. This is CAPITAL GAINS - the most classic way to invest.",
        actionLabel: "How Much Can I Make?",
        setup: { stockSymbol: "SBUX", simPrice: 95 },
        math: [
          { label: "You bought at", value: "$80" },
          { label: "Now worth", value: "$95" },
          { label: "", value: "" },
          { label: "Profit per share", value: "+$15", highlight: true },
          { label: "", value: "" },
          { label: "If you own 100 shares", value: "" },
          { label: "Total profit", value: "+$1,500", highlight: true },
        ],
        tooltips: [
          {
            term: "CAPITAL GAINS",
            metaphor:
              "The difference between what you paid and what you sold for. Like buying a vintage bag for $200 and selling it for $350 - that $150 is your capital gain.",
          },
        ],
      },
      {
        text: "The math is simple but powerful. Over 30 years, the S&P 500 has returned about 10% per year on average. $10,000 invested in 1994 would be worth over $170,000 today.",
        actionLabel: "What About Dividends?",
        setup: { stockSymbol: "SBUX", simPrice: 95 },
        math: [
          { label: "S&P 500 average return", value: "~10% per year" },
          { label: "", value: "" },
          { label: "$10,000 invested", value: "(30 years ago)" },
          { label: "Would now be", value: "$170,000+", highlight: true },
          { label: "", value: "" },
          { label: "That's the power of", value: "compound growth" },
        ],
        tooltips: [
          {
            term: "S&P 500",
            metaphor:
              "A basket of the 500 biggest US companies. Think of it as buying a tiny slice of Starbucks, Apple, Nike, Ulta, and 496 others - all in one purchase.",
          },
          {
            term: "compound growth",
            metaphor:
              "Your gains making more gains. Like a snowball rolling downhill - it starts small but grows faster and faster.",
          },
        ],
      },
      {
        text: "PATH 2: Collect DIVIDENDS. Some companies pay you just for owning their stock. Coca-Cola has paid dividends for 100+ years straight. Own 100 shares? Get a check every quarter.",
        actionLabel: "How Much Do They Pay?",
        setup: { stockSymbol: "KO", simPrice: 60 },
        math: [
          { label: "Stock", value: "KO (Coca-Cola)" },
          { label: "Share price", value: "$60" },
          { label: "", value: "" },
          { label: "Annual dividend", value: "$1.84/share" },
          { label: "Dividend yield", value: "~3%", highlight: true },
          { label: "", value: "" },
          { label: "100 shares = ", value: "$184/year in cash" },
        ],
        tooltips: [
          {
            term: "DIVIDENDS",
            metaphor:
              "Like owning a rental property that sends you rent checks, except it's a company sending you a slice of their profits.",
          },
          {
            term: "Dividend yield",
            metaphor:
              "The annual 'interest rate' you earn. A 3% yield means $60 invested pays you $1.80 per year.",
          },
        ],
      },
      {
        text: "The best part? DRIP (Dividend Reinvestment). Instead of taking cash, buy more shares. Those new shares earn dividends too. Over decades, this snowball effect is massive.",
        actionLabel: "Show Me the Growth",
        setup: { stockSymbol: "KO", simPrice: 60 },
        math: [
          { label: "Without DRIP", value: "" },
          { label: "You get cash", value: "$184/year" },
          { label: "Share count stays", value: "100 shares" },
          { label: "", value: "" },
          { label: "With DRIP", value: "", highlight: true },
          { label: "Cash buys more shares", value: "" },
          { label: "More shares = more dividends", value: "" },
          { label: "20 years later", value: "180+ shares", highlight: true },
        ],
        tooltips: [
          {
            term: "DRIP",
            metaphor:
              "Like setting your savings account to auto-invest your interest. You never see the cash, but your pile keeps growing automatically.",
          },
        ],
        prediction: {
          question: "If you reinvest dividends, what happens over time?",
          options: [
            "You own more shares each year",
            "Your dividend payments shrink",
            "Nothing changes",
          ],
          correctIndex: 0,
          explanation:
            "Reinvesting means your dividends buy more shares. More shares = more dividends next quarter. It compounds over time!",
        },
      },
      {
        text: "PATH 3: Trade OPTIONS. Instead of buying stock, buy contracts that profit when stocks move. Less cash needed, but higher risk. This is what we'll master in this course.",
        actionLabel: "Why Options?",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Stock investing", value: "" },
          { label: "Buy 100 shares of Lululemon", value: "$40,000" },
          { label: "If it goes up 15%", value: "+$6,000" },
          { label: "", value: "" },
          { label: "Options trading", value: "", highlight: true },
          { label: "Buy an option contract", value: "$2,000" },
          { label: "Same move can yield", value: "+$4,000+", highlight: true },
        ],
        tooltips: [
          {
            term: "OPTIONS",
            metaphor:
              "Like a coupon that locks in today's price. If prices go up, your coupon becomes valuable. If they don't, you only lose what you paid for the coupon.",
          },
        ],
      },
      {
        text: "Options let you: bet on UP moves (calls), bet on DOWN moves (puts), or collect fees from others. More tools = more opportunities. Ready to take control of your financial future?",
        actionLabel: "Start Learning Options",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Your toolkit", value: "" },
          { label: "", value: "" },
          { label: "Stocks", value: "Buy and hold" },
          { label: "Dividends", value: "Passive income" },
          { label: "Calls", value: "Bet on UP 📈", highlight: true },
          { label: "Puts", value: "Bet on DOWN 📉", highlight: true },
          { label: "Selling", value: "Collect premium 💰", highlight: true },
          { label: "", value: "" },
          { label: "Let's dive in →", value: "" },
        ],
      },
    ],
  },
  {
    id: "investor-types",
    title: "Types of Investors",
    description: "Find your style",
    steps: [
      {
        text: "Not everyone invests the same way. Your strategy depends on your goals, time, and personality. Let's meet the three main types: PASSIVE investors, ACTIVE investors, and TRADERS.",
        actionLabel: "Show Me Each Type",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Three investing styles", value: "" },
          { label: "", value: "" },
          { label: "Passive", value: "Set it and forget it" },
          { label: "Active", value: "Research & pick stocks" },
          { label: "Trader", value: "Quick moves, high focus" },
          { label: "", value: "" },
          {
            label: "No 'right' answer",
            value: "Just what fits YOU",
            highlight: true,
          },
        ],
        tooltips: [
          {
            term: "PASSIVE investors",
            metaphor:
              "Like planting a garden and letting it grow. You plant it, water it occasionally, and let nature do its thing over years.",
          },
          {
            term: "ACTIVE investors",
            metaphor:
              "Like curating your closet. You research what's worth keeping, donate what's not working, and add pieces strategically.",
          },
          {
            term: "TRADERS",
            metaphor:
              "Like thrifting for resale. You're buying and selling constantly, looking for quick flips before trends change.",
          },
        ],
      },
      {
        text: "TYPE 1: The PASSIVE Investor. 'Set it and forget it.' Buy index funds, reinvest dividends, check your account once a year. Warren Buffett recommends this for most people.",
        actionLabel: "Why Choose Passive?",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Passive investing", value: "" },
          { label: "", value: "" },
          { label: "Time spent", value: "~1 hour/year" },
          { label: "Strategy", value: "Buy & hold forever" },
          { label: "Main vehicle", value: "Index funds (SPY, VTI)" },
          { label: "", value: "" },
          { label: "Best for", value: "Busy people", highlight: true },
          { label: "", value: "Long time horizons", highlight: true },
        ],
        tooltips: [
          {
            term: "index funds",
            metaphor:
              "Like buying a capsule wardrobe instead of picking one item. You get a balanced mix of everything - if one piece goes out of style, others carry the look.",
          },
          {
            term: "Set it and forget it",
            metaphor:
              "Like a crockpot meal. Put your ingredients in, set the timer, and come back hours later to a finished dish. No stirring required.",
          },
        ],
      },
      {
        text: "Passive wins because of MATH. Studies show 90% of professional fund managers FAIL to beat the S&P 500 over 15 years. If pros can't beat the market, why try? Just buy the market.",
        actionLabel: "See the Data",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Fund managers who", value: "" },
          {
            label: "beat S&P 500 over 15 years",
            value: "~10%",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "Why so few win?", value: "" },
          { label: "Fees eat returns", value: "-1% to -2%/year" },
          { label: "Bad timing", value: "Buy high, sell low" },
          { label: "Overtrading", value: "Taxes + commissions" },
          { label: "", value: "" },
          { label: "The simple path", value: "Buy index, hold forever" },
        ],
        tooltips: [
          {
            term: "MATH",
            metaphor:
              "Every trade has a cost. Like paying a small fee every time you return something online - even if you're good at shopping, the fees add up over hundreds of orders.",
          },
        ],
      },
      {
        text: "Passive downsides? You'll never beat the market - you ARE the market. And during crashes, you just hold and watch. In 2008, passive investors lost 50%. They made it back by 2013, but it takes patience.",
        actionLabel: "What About Active?",
        setup: { stockSymbol: "SPY", simPrice: 450 },
        math: [
          { label: "Passive tradeoffs", value: "" },
          { label: "", value: "" },
          { label: "You'll match the market", value: "Never beat it" },
          { label: "During crashes", value: "You hold and wait" },
          { label: "", value: "" },
          { label: "2008 crash", value: "-50%", highlight: true },
          { label: "Recovery time", value: "~5 years" },
          { label: "", value: "" },
          { label: "Requires", value: "Patience & discipline" },
        ],
        prediction: {
          question:
            "Why do most professional fund managers fail to beat index funds?",
          options: [
            "They're not smart enough",
            "Fees, taxes, and bad timing add up",
            "Index funds are rigged",
          ],
          correctIndex: 1,
          explanation:
            "It's not about smarts - it's about costs. Management fees, trading costs, and taxes compound over time. Even small drags of 1-2% per year add up to massive underperformance over decades.",
        },
      },
      {
        text: "TYPE 2: The ACTIVE Investor. You research companies, read earnings reports, and pick individual stocks. More work, but you can potentially beat the market - or own companies you believe in.",
        actionLabel: "Why Choose Active?",
        setup: { stockSymbol: "ULTA", simPrice: 450 },
        math: [
          { label: "Active investing", value: "" },
          { label: "", value: "" },
          { label: "Time spent", value: "5-10 hours/week" },
          { label: "Strategy", value: "Research & pick stocks" },
          { label: "Hold period", value: "Months to years" },
          { label: "", value: "" },
          { label: "Best for", value: "Curious people", highlight: true },
          { label: "", value: "Who enjoy research", highlight: true },
        ],
        tooltips: [
          {
            term: "ACTIVE Investor",
            metaphor:
              "Like being a trend forecaster. You watch what's happening, study the data, and try to spot the next big thing before everyone else notices.",
          },
        ],
      },
      {
        text: "Active investors look for EDGE. Maybe you work in beauty and spotted Ulta's growth before Wall Street. Maybe you noticed everyone switching to a new app. Personal knowledge can be powerful.",
        actionLabel: "What's the Catch?",
        setup: { stockSymbol: "ULTA", simPrice: 450 },
        math: [
          { label: "Sources of edge", value: "" },
          { label: "", value: "" },
          { label: "Industry knowledge", value: "You work in the field" },
          { label: "Consumer insights", value: "You spotted the trend" },
          { label: "Deep research", value: "You read the 10-Ks" },
          { label: "", value: "" },
          { label: "Peter Lynch's rule", value: "", highlight: true },
          { label: "'Buy what you know'", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "EDGE",
            metaphor:
              "Your unfair advantage. Like knowing a restaurant is amazing before it gets discovered on TikTok. Without an edge, you're just guessing.",
          },
          {
            term: "10-Ks",
            metaphor:
              "A company's annual report card filed with the SEC. Dry reading, but full of details that headlines skip over.",
          },
        ],
      },
      {
        text: "The catch? You're competing against hedge funds with PhDs, supercomputers, and insider connections. Most individual stock pickers underperform. But if you love research, this path can be rewarding.",
        actionLabel: "What About Traders?",
        setup: { stockSymbol: "ULTA", simPrice: 450 },
        math: [
          { label: "Your competition", value: "" },
          { label: "", value: "" },
          { label: "Hedge funds", value: "$100M research budgets" },
          { label: "Algorithms", value: "Trade in milliseconds" },
          { label: "Insiders", value: "Talk to CEOs directly" },
          { label: "", value: "" },
          { label: "Your advantage?", value: "", highlight: true },
          { label: "Patience", value: "They need quarterly returns" },
          { label: "Focus", value: "They can't own small stocks" },
        ],
      },
      {
        text: "TYPE 3: The TRADER. Short-term moves, sometimes holding for just minutes or days. You're not investing in companies - you're betting on price movements. Options, momentum, technical analysis.",
        actionLabel: "Why Choose Trading?",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Trading", value: "" },
          { label: "", value: "" },
          { label: "Time spent", value: "2-8 hours/day" },
          { label: "Strategy", value: "Ride short-term moves" },
          { label: "Hold period", value: "Minutes to weeks" },
          { label: "", value: "" },
          { label: "Best for", value: "High focus people", highlight: true },
          { label: "", value: "Who thrive on action", highlight: true },
        ],
        tooltips: [
          {
            term: "TRADER",
            metaphor:
              "Like catching waves while surfing. You don't care where the ocean is going long-term - you just want to ride the next wave and get out before it crashes.",
          },
          {
            term: "technical analysis",
            metaphor:
              "Reading price charts to predict moves. Traders believe past patterns hint at future moves - support levels, resistance, momentum.",
          },
        ],
      },
      {
        text: "Traders use tools like OPTIONS to amplify moves. A 5% stock move can become a 50% option gain. But it cuts both ways - small losses become big losses fast. This is where discipline matters most.",
        actionLabel: "Is Trading Right for Me?",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Trader's leverage", value: "" },
          { label: "", value: "" },
          { label: "Stock moves 5%", value: "+$500 on $10,000" },
          {
            label: "Option moves 50%",
            value: "+$500 on $1,000",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "But also...", value: "" },
          { label: "Stock drops 5%", value: "-$500 on $10,000" },
          {
            label: "Option drops 50%",
            value: "-$500 on $1,000",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "Leverage amplifies", value: "wins AND losses" },
        ],
      },
      {
        text: "Reality check: 70-90% of day traders LOSE money. The ones who win treat it like a job - strict rules, risk management, emotional control. If you're looking for easy money, this isn't it.",
        actionLabel: "How Do I Choose?",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Day trader stats", value: "" },
          { label: "", value: "" },
          { label: "Lose money", value: "70-90%", highlight: true },
          { label: "Break even", value: "~5-15%" },
          { label: "Consistently profit", value: "~5-10%" },
          { label: "", value: "" },
          { label: "Winners have", value: "" },
          { label: "Strict rules", value: "Entry/exit plans" },
          { label: "Risk limits", value: "Never bet the farm" },
          { label: "Emotional control", value: "No revenge trading" },
        ],
        tooltips: [
          {
            term: "revenge trading",
            metaphor:
              "Like stress-shopping after a bad day. It feels good in the moment but usually makes things worse. The market doesn't care about your feelings.",
          },
        ],
      },
      {
        text: "Here's a simple framework. Ask yourself: How much TIME do I have? Do I want to BEAT the market or MATCH it? And honestly - do I have the DISCIPLINE to stick to a plan when emotions run hot?",
        actionLabel: "See the Summary",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Ask yourself", value: "" },
          { label: "", value: "" },
          { label: "Time available?", value: "" },
          { label: "  1 hr/year", value: "→ Passive" },
          { label: "  5 hr/week", value: "→ Active" },
          { label: "  5 hr/day", value: "→ Trading" },
          { label: "", value: "" },
          { label: "Goal?", value: "" },
          { label: "  Match market", value: "→ Passive" },
          { label: "  Beat market", value: "→ Active/Trading" },
        ],
        prediction: {
          question: "Which approach is 'best' for building wealth?",
          options: [
            "Passive - it's proven to work",
            "Active - pick winners",
            "Trading - maximize gains",
            "Depends on your situation",
          ],
          correctIndex: 3,
          explanation:
            "There's no universal 'best.' Passive works for most people, but some thrive with active investing or trading. The best approach is one you'll stick with consistently over time.",
        },
      },
      {
        text: "Many people COMBINE approaches. Core portfolio in index funds (passive), some individual stocks you believe in (active), and a small portion for options (trading). Diversify your strategy too.",
        actionLabel: "Ready to Learn Options",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Hybrid approach", value: "" },
          { label: "", value: "" },
          { label: "80% of portfolio", value: "Index funds (passive)" },
          { label: "15% of portfolio", value: "Stock picks (active)" },
          {
            label: "5% of portfolio",
            value: "Options (trading)",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "The 5% rule", value: "", highlight: true },
          { label: "Only trade with money", value: "" },
          { label: "you can afford to lose", value: "" },
        ],
        tooltips: [
          {
            term: "5% of portfolio",
            metaphor:
              "Your 'learning budget.' Like setting aside money for experiences - you might lose it, but you'll gain knowledge either way.",
          },
        ],
      },
    ],
  },
  {
    id: "stage",
    title: "The Stage",
    description: "How stocks move",
    steps: [
      {
        text: "Welcome to OptionsEd. In the next 15 minutes, you'll learn how options trading works through real scenarios. No jargon, no fluff - just the essentials.",
        actionLabel: "What Will I Learn?",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "You'll master", value: "" },
          { label: "", value: "" },
          { label: "Call options", value: "Betting UP 📈" },
          { label: "Put options", value: "Betting DOWN 📉" },
          { label: "Time decay", value: "The hidden cost ⏰" },
          { label: "Selling options", value: "Collecting premium 💰" },
        ],
      },
      {
        text: "Lululemon ($LULU) is trading at $400. You think the price will go up after their earnings report next week.",
        actionLabel: "Watch What Happens",
        setup: { stockSymbol: "LULU", simPrice: 400 },
        math: [
          { label: "Stock", value: "LULU" },
          { label: "Current price", value: "$400" },
          { label: "Your prediction", value: "📈 UP", highlight: true },
        ],
      },
      {
        text: "The earnings were great! Lululemon jumped to $460. If you owned the stock, you'd have made $60 per share.",
        actionLabel: "What's the Problem?",
        setup: { simPrice: 460 },
        math: [
          { label: "Bought at", value: "$400" },
          { label: "Now worth", value: "$460" },
          { label: "", value: "" },
          { label: "Profit per share", value: "+$60", highlight: true },
        ],
      },
      {
        text: "But here's the problem: to buy 100 shares of Lululemon at $400, you'd need $40,000. And if LULU dropped instead? You'd lose real money with no limit.",
        actionLabel: "Is There a Better Way?",
        setup: { simPrice: 400 },
        math: [
          { label: "100 shares × $400", value: "$40,000" },
          { label: "If stock drops to $300", value: "" },
          { label: "Your loss", value: "-$10,000", highlight: true },
        ],
      },
      {
        text: "What if you could profit from that move without buying the stock? That's what OPTIONS let you do. Less cash upfront, and your max loss is fixed.",
        actionLabel: "Show Me How",
        setup: { simPrice: 460 },
        math: [
          { label: "Buying stock", value: "" },
          { label: "Cash needed", value: "$40,000" },
          { label: "If it crashes", value: "Unlimited loss" },
          { label: "", value: "" },
          { label: "Buying options", value: "", highlight: true },
          { label: "Cash needed", value: "~$2,000", highlight: true },
          { label: "If it crashes", value: "Lose $2,000 max", highlight: true },
        ],
        tooltips: [
          {
            term: "OPTIONS",
            metaphor:
              "Like a reservation deposit: you pay a small fee now for the right to buy later at today's price. If you change your mind, you only lose the deposit.",
          },
        ],
      },
    ],
  },
  {
    id: "rocket",
    title: "Call Options",
    description: "Betting the price goes UP",
    steps: [
      {
        text: "An OPTION is a contract that lets you bet on where a stock will go. A CALL option makes money when the stock goes UP.",
        actionLabel: "Got It",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Two types of options", value: "" },
          { label: "", value: "" },
          { label: "CALL", value: "Bet on UP 📈", highlight: true },
          { label: "PUT", value: "Bet on DOWN 📉" },
        ],
        tooltips: [
          {
            term: "OPTION",
            metaphor:
              "Like a concert ticket: you pay upfront for the right to attend, but you're not forced to go.",
          },
          {
            term: "CALL option",
            metaphor:
              "Like a sale coupon that locks in today's price. If the price goes up, your coupon becomes valuable. If it goes down, you just toss the coupon.",
          },
        ],
      },
      {
        text: "Important: each option contract controls 100 shares. When we say an option costs '$20', that's $20 per share, so the actual cost is $2,000 (100 × $20).",
        actionLabel: "Got It",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Option price per share", value: "$20" },
          { label: "Shares per contract", value: "× 100" },
          { label: "Actual cost", value: "$2,000", highlight: true },
        ],
        tooltips: [
          {
            term: "contract",
            metaphor:
              "Like buying a multi-pack: the price tag says $20 per unit, but you're buying a 100-pack. The contract is the whole pack.",
          },
        ],
      },
      {
        text: "The STRIKE price ($420) is your target. If Lululemon goes ABOVE $420, your call is 'in the money' and has real value. If it stays below? Your option expires worthless.",
        actionLabel: "What Does It Cost?",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Current stock price", value: "$400" },
          { label: "Your strike price", value: "$420" },
          { label: "", value: "" },
          { label: "Below $420", value: "Out of the money ❌" },
          { label: "Above $420", value: "In the money ✅", highlight: true },
        ],
        tooltips: [
          {
            term: "STRIKE price",
            metaphor:
              "The price printed on your coupon. Like a gift card that says 'Buy one item for $420' - $420 is the strike. If items cost $460, your card is valuable.",
          },
          {
            term: "in the money",
            metaphor:
              "Your ticket is a winner. The conditions are met, so your contract has real cash value.",
          },
          {
            term: "expires worthless",
            metaphor:
              "Like a coupon you forgot about - once the date passes, it's just paper.",
          },
        ],
      },
      {
        text: "Lululemon is at $400. You buy a Call option with a '$420 strike' for $20. This gives you the RIGHT (not obligation) to buy LULU at $420, no matter how high it goes.",
        actionLabel: "Buy the Call",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Your cost per share", value: "$20" },
          { label: "Strike price", value: "$420" },
          { label: "Current stock", value: "$400" },
          { label: "", value: "" },
          { label: "Breakeven price", value: "$440", highlight: true },
          { label: "(strike + premium)", value: "" },
        ],
        tooltips: [
          {
            term: "RIGHT (not obligation)",
            metaphor:
              "Like a restaurant reservation: you CAN show up and get your table, but nobody forces you to eat there.",
          },
          {
            term: "Breakeven",
            metaphor:
              "The point where you get your money back. Like driving to a show - you need to enjoy it enough to cover the ticket AND the gas.",
          },
          {
            term: "$20",
            metaphor:
              "The 'premium' - what you pay for the contract itself. This is your max loss if things go wrong.",
          },
        ],
        prediction: {
          question:
            "If Lululemon goes to $430 at expiration, do you make money?",
          options: [
            "Yes, I'm above the $420 strike!",
            "No, I need to hit $440 to profit",
            "I break even",
          ],
          correctIndex: 1,
          explanation:
            "Even though $430 is above your $420 strike, you paid $20 for the option. You need $440 ($420 + $20) to actually profit.",
        },
      },
      {
        text: "Wait - breakeven is $440, not $420? Yes! Even if LULU hits $430, you'd exercise at $420, but you PAID $20 for that right. You need $420 + $20 = $440 to actually profit.",
        actionLabel: "See the Payoff",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 430,
          daysLeft: 0,
        },
        math: [
          { label: "Stock at expiry", value: "$430" },
          { label: "Your strike", value: "$420", operation: "-" },
          { label: "Intrinsic value", value: "$10", operation: "=" },
          { label: "What you paid", value: "$20", operation: "-" },
          { label: "Net P&L", value: "-$10", highlight: true },
        ],
        tooltips: [
          {
            term: "exercise",
            metaphor:
              "Using your coupon. Like redeeming a discount code at checkout - you're cashing in your right.",
          },
          {
            term: "Intrinsic value",
            metaphor:
              "The real cash value RIGHT NOW. Like a $50 gift card - it's worth $50, no more, no less.",
          },
        ],
      },
      {
        text: "Lululemon jumps to $480! Let's break down the REAL math on your option profit.",
        actionLabel: "Show Me the Math",
        setup: { simPrice: 480, daysLeft: 0 },
        math: [
          { label: "Stock price at expiry", value: "$480" },
          { label: "Your strike price", value: "$420", operation: "-" },
          { label: "Intrinsic value", value: "$60", operation: "=" },
          { label: "What you paid", value: "$20", operation: "-" },
          { label: "Profit per share", value: "$40", operation: "=" },
          { label: "", value: "" },
          { label: "× 100 shares/contract", value: "", highlight: true },
          { label: "Total profit", value: "$4,000", highlight: true },
        ],
        profit: 4000,
      },
      {
        text: "Compare: buying stock vs. buying options. With $40,000, you could buy 100 shares and make $8,000. OR buy 20 option contracts and make $80,000. Same capital, 10x the return.",
        actionLabel: "What If I'm Wrong?",
        setup: { simPrice: 480, daysLeft: 0 },
        math: [
          { label: "Stock approach", value: "" },
          { label: "Buy 100 shares × $400", value: "$40,000" },
          { label: "Profit ($80 × 100)", value: "+$8,000" },
          { label: "", value: "" },
          { label: "Options approach", value: "", highlight: true },
          { label: "Buy 20 contracts × $2,000", value: "$40,000" },
          {
            label: "Profit ($40 × 100 × 20)",
            value: "+$80,000",
            highlight: true,
          },
        ],
      },
      {
        text: "But if Lululemon stayed at $400 or dropped? Your stock would still be worth something. Your options? Worthless. You'd lose the entire $40,000. High reward = high risk.",
        actionLabel: "Next Lesson",
        setup: { simPrice: 400, daysLeft: 0 },
        math: [
          { label: "Stock approach", value: "" },
          { label: "Stock stays at $400", value: "$0 profit" },
          { label: "You still own shares", value: "✓" },
          { label: "", value: "" },
          { label: "Options approach", value: "", highlight: true },
          {
            label: "Options expire worthless",
            value: "-$40,000",
            highlight: true,
          },
          { label: "You own nothing", value: "✗" },
        ],
      },
    ],
  },
  {
    id: "parachute",
    title: "Put Options",
    description: "Betting the price goes DOWN",
    steps: [
      {
        text: "A PUT option is the opposite. It makes money when the stock goes DOWN. Think of it as insurance against a crash.",
        actionLabel: "Got It",
        setup: {
          type: "put",
          side: "buy",
          strike: 400,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "CALL option", value: "Profits when UP 📈" },
          { label: "", value: "" },
          {
            label: "PUT option",
            value: "Profits when DOWN 📉",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "Think of it as", value: "Crash insurance 🛡️" },
        ],
        tooltips: [
          {
            term: "PUT option",
            metaphor:
              "Like phone insurance: you pay a small premium hoping you'll never need it, but if disaster strikes, it pays out.",
          },
        ],
      },
      {
        text: "Wait - how can you 'sell' stock you don't own? You're not actually selling stock. You're buying the RIGHT to sell at a set price. Think of it as a contract that profits when prices drop, not actual shares.",
        actionLabel: "That Makes Sense",
        setup: {
          type: "put",
          side: "buy",
          strike: 400,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Common confusion", value: "" },
          { label: "'Sell' in put option", value: "≠ selling stock" },
          { label: "", value: "" },
          {
            label: "What you're buying",
            value: "A contract 📜",
            highlight: true,
          },
          { label: "The contract says", value: "You CAN sell @ $400" },
        ],
        tooltips: [
          {
            term: "RIGHT to sell",
            metaphor:
              "Like a store's return policy: 'We'll buy this back for $400 anytime this month.' You don't need to own the item yet - the guarantee itself has value if prices drop.",
          },
        ],
      },
      {
        text: "Lululemon is at $400 but looking shaky. You buy a Put option with a '$400 strike' for $20. This gives you the RIGHT to sell LULU at $400, even if it crashes.",
        actionLabel: "Buy the Put",
        setup: {
          type: "put",
          side: "buy",
          strike: 400,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Your cost per share", value: "$20" },
          { label: "Strike price", value: "$400" },
          { label: "Current stock", value: "$400" },
          { label: "", value: "" },
          { label: "Breakeven price", value: "$380", highlight: true },
          { label: "(strike - premium)", value: "" },
        ],
        prediction: {
          question:
            "If Lululemon crashes to $300, what's your profit per share?",
          options: [
            "$100 (the full drop)",
            "$80 ($100 minus my $20 cost)",
            "$300 (the stock price)",
          ],
          correctIndex: 1,
          explanation:
            "Your Put lets you sell at $400 when it's worth $300 = $100 intrinsic value. But you paid $20, so your net profit is $80 per share.",
        },
      },
      {
        text: "Lululemon crashes to $300! Your Put gives you the right to sell at $400. The difference ($100) is your intrinsic value. Minus your $20 cost = $80 profit per share.",
        actionLabel: "See Full Math",
        setup: { simPrice: 300, daysLeft: 0 },
        math: [
          { label: "Your strike (sell at)", value: "$400" },
          { label: "Stock price now", value: "$300", operation: "-" },
          { label: "Intrinsic value", value: "$100", operation: "=" },
          { label: "What you paid", value: "$20", operation: "-" },
          { label: "Profit per share", value: "$80", operation: "=" },
          { label: "", value: "" },
          { label: "× 100 shares/contract", value: "", highlight: true },
          { label: "Total profit", value: "$8,000", highlight: true },
        ],
        profit: 8000,
      },
      {
        text: "Compare to owning stock: if you held 100 shares through that crash, you'd be down $10,000. Your Put not only avoided that loss - it made money FROM the crash.",
        actionLabel: "What If I'm Wrong?",
        setup: { simPrice: 300, daysLeft: 0 },
        math: [
          { label: "If you owned 100 shares", value: "" },
          { label: "Loss ($100 × 100)", value: "-$10,000", highlight: true },
          { label: "", value: "" },
          { label: "With Put option", value: "" },
          { label: "Profit ($80 × 100)", value: "+$8,000", highlight: true },
        ],
      },
      {
        text: "What if Lululemon went UP to $500 instead? Your Put expires worthless - why sell at $400 when stock is worth $500? But here's the key: you only lose your $20 premium. That's your max loss, ever.",
        actionLabel: "Next Lesson",
        setup: { simPrice: 500, daysLeft: 0 },
        math: [
          { label: "Stock went UP to", value: "$500" },
          { label: "Your strike (sell at)", value: "$400" },
          { label: "Would you exercise?", value: "No way!" },
          { label: "", value: "" },
          { label: "Put expires worthless", value: "" },
          { label: "Your max loss", value: "-$2,000", highlight: true },
          { label: "(That's it. Limited risk.)", value: "" },
        ],
        tooltips: [
          {
            term: "max loss",
            metaphor:
              "Like a bad movie ticket - worst case, you wasted $20. The movie can't reach into your wallet and take more.",
          },
          {
            term: "premium",
            metaphor:
              "The price of admission. Like a cover charge - that money's gone whether you have fun or not.",
          },
        ],
      },
    ],
  },
  {
    id: "ice-cube",
    title: "Time Decay",
    description: "Options expire",
    steps: [
      {
        text: "Here's the catch: options EXPIRE. You pay for the right to buy/sell, but only for a limited time. Like ice melting in your hand.",
        actionLabel: "See an Example",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Stocks", value: "Hold forever ♾️" },
          {
            label: "Options",
            value: "Have expiration date ⏰",
            highlight: true,
          },
          { label: "", value: "" },
          { label: "After expiry", value: "Option = worthless" },
          { label: "Your money", value: "Gone 💨" },
        ],
        tooltips: [
          {
            term: "EXPIRE",
            metaphor:
              "Like a coupon in your wallet - it has a 'use by' date. After that, it's worthless no matter how good the deal was.",
          },
        ],
      },
      {
        text: "You buy a Lululemon Call ($420 strike) for $20 while the stock is at $400. You have 30 days for LULU to go above $420.",
        actionLabel: "Why Does Time Matter?",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "Option cost", value: "$20" },
          { label: "Days until expiry", value: "30" },
          { label: "Stock needs to reach", value: "$440", highlight: true },
          { label: "(for you to profit)", value: "" },
        ],
      },
      {
        text: "Why does time kill your option? Because the less time left, the less CHANCE the stock has to move in your favor. Probability shrinks → value shrinks. Wall Street calls this 'theta decay.'",
        actionLabel: "See It In Action",
        setup: {
          type: "call",
          side: "buy",
          strike: 420,
          simPrice: 400,
          daysLeft: 30,
        },
        math: [
          { label: "More time", value: "More chance to win" },
          { label: "Less time", value: "Less chance to win" },
          { label: "", value: "" },
          { label: "Chance ↓", value: "Value ↓", highlight: true },
          { label: "", value: "" },
          { label: "This is called", value: "Theta (Θ) decay" },
        ],
        tooltips: [
          {
            term: "theta decay",
            metaphor:
              "Like a parking meter ticking down. Every minute that passes, you're losing value - even if nothing else changes.",
          },
          {
            term: "Probability shrinks",
            metaphor:
              "Imagine waiting for a text back. With a week to wait, good odds. With 5 minutes left? Not looking good.",
          },
        ],
      },
      {
        text: "20 days pass. LULU is still at $400. Your option is melting away - it's now worth only $6 because time is running out. You've lost $14 even though the stock hasn't moved!",
        actionLabel: "Can I Get Out?",
        setup: { simPrice: 400, daysLeft: 10 },
        math: [
          { label: "Original cost", value: "$20" },
          { label: "Days left", value: "10" },
          { label: "Current value", value: "$6" },
          { label: "Paper loss", value: "-$14", highlight: true },
        ],
      },
      {
        text: "Yes! You can sell your option anytime before expiration. Right now it's worth $6. Sell and lock in a $14 loss, or hold and risk losing all $20. Knowing when to cut losses is half the game.",
        actionLabel: "I'll Hold",
        setup: { simPrice: 400, daysLeft: 10 },
        math: [
          { label: "If you sell now", value: "" },
          { label: "Get back", value: "$6" },
          { label: "Net loss", value: "-$14" },
          { label: "", value: "" },
          {
            label: "If you hold & stock stays flat",
            value: "",
            highlight: true,
          },
          { label: "Option expires worthless", value: "$0" },
          { label: "Net loss", value: "-$20", highlight: true },
        ],
      },
      {
        text: "The decay isn't linear - it ACCELERATES. Options lose more value per day as expiration approaches. The last week is brutal.",
        actionLabel: "See the Decay Curve",
        setup: { simPrice: 400, daysLeft: 7 },
        math: [
          { label: "Day 1-10", value: "Slow decay" },
          { label: "Day 10-20", value: "Moderate decay" },
          { label: "Day 20-30", value: "Rapid decay", highlight: true },
          { label: "", value: "" },
          { label: "This is called", value: "'Theta burn'" },
        ],
        tooltips: [
          {
            term: "ACCELERATES",
            metaphor:
              "Like ice cream on a hot day. First hour? Slow drip. Last 10 minutes? Melting everywhere.",
          },
          {
            term: "Theta burn",
            metaphor:
              "Watching your value evaporate. The closer you get to expiration, the faster it disappears.",
          },
        ],
      },
      {
        text: "Expiration day. LULU never went above $420. Your option expires worthless. You lost your entire $2,000 (remember, $20 × 100 shares). Time decay is the hidden cost of buying options.",
        actionLabel: "Learn to Collect Premium",
        setup: { simPrice: 400, daysLeft: 0 },
        math: [
          { label: "Option cost", value: "$2,000" },
          { label: "Stock never hit $420", value: "" },
          { label: "Option value at expiry", value: "$0" },
          { label: "", value: "" },
          { label: "Total loss", value: "-$2,000", highlight: true },
          { label: "(This is why 80% of options expire worthless)", value: "" },
        ],
        profit: -2000,
      },
    ],
  },
  {
    id: "casino",
    title: "Selling Options",
    description: "Collecting premium",
    steps: [
      {
        text: "Here's a twist: you can SELL options instead of buying them. You collect the fee (premium) upfront, but you take on the obligation. Think of it like selling insurance.",
        actionLabel: "Show Me",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Buying options", value: "" },
          { label: "You pay premium", value: "Limited loss" },
          { label: "You hope to win big", value: "Unlimited gain" },
          { label: "", value: "" },
          { label: "Selling options", value: "", highlight: true },
          { label: "You collect premium", value: "Limited gain" },
          { label: "You hope nothing happens", value: "Large risk" },
        ],
        tooltips: [
          {
            term: "SELL options",
            metaphor:
              "Like selling insurance policies. Allstate collects premiums every month. Most months, nothing happens and they keep it. But when claims come in, they pay out.",
          },
          {
            term: "selling insurance",
            metaphor:
              "You're the one providing protection. You collect steady income, but you're on the hook if something goes wrong.",
          },
        ],
      },
      {
        text: "When you SELL a Put, someone BUYS it from you. They pay you $5 per share for the insurance. That's $500 (100 shares × $5) in your pocket immediately.",
        actionLabel: "Where Does the Money Come From?",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Premium per share", value: "$5" },
          { label: "Shares per contract", value: "× 100" },
          { label: "Cash you receive NOW", value: "$500", highlight: true },
        ],
      },
      {
        text: "Coca-Cola (KO) is stable at $65. Someone wants insurance (a Put) in case it drops to $60. You sell them that Put and collect $500 upfront.",
        actionLabel: "What's the Catch?",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Stock", value: "KO (Coca-Cola)" },
          { label: "Current price", value: "$65" },
          { label: "Strike price", value: "$60" },
          { label: "", value: "" },
          { label: "You sell a Put", value: "" },
          { label: "You receive", value: "+$500", highlight: true },
        ],
        prediction: {
          question: "If KO stays above $60 at expiration, what happens?",
          options: [
            "I keep the $500, nothing else happens",
            "I have to buy shares anyway",
            "I lose the $500",
          ],
          correctIndex: 0,
          explanation:
            "When you sell a put, you collect premium upfront. If the stock stays ABOVE your strike, the put expires worthless and you keep the premium. That's the best outcome!",
        },
      },
      {
        text: "The catch: your broker will freeze about $6,000 in your account as 'collateral.' If KO drops below $60, you MUST buy 100 shares at $60. No backing out. This is called 'assignment.'",
        actionLabel: "Got It",
        setup: {
          stockSymbol: "KO",
          type: "put",
          side: "sell",
          strike: 60,
          simPrice: 65,
          daysLeft: 30,
        },
        math: [
          { label: "Cash received", value: "+$500" },
          { label: "Collateral frozen", value: "~$6,000" },
          { label: "Your obligation", value: "Buy 100 shares @ $60" },
          { label: "", value: "" },
          { label: "You cannot cancel this", value: "", highlight: true },
        ],
        tooltips: [
          {
            term: "collateral",
            metaphor:
              "Like a security deposit. Your broker holds it to make sure you can fulfill your promise if things go wrong.",
          },
          {
            term: "assignment",
            metaphor:
              "Getting called on your promise. You sold someone insurance, and now they're filing a claim. Time to deliver.",
          },
          {
            term: "No backing out",
            metaphor:
              "You made a binding commitment. The other person is counting on you to honor it.",
          },
        ],
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
          { label: "Collateral", value: "Released ✓" },
        ],
        profit: 500,
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
          { label: "Net result", value: "-$500", highlight: true },
        ],
      },
      {
        text: "What if KO went to $0 (bankruptcy)? You'd owe $6,000 for worthless stock. Minus premium = $5,500 loss. Selling puts has LIMITED profit ($500) but LARGE potential loss ($5,500).",
        actionLabel: "Why Do People Do This?",
        setup: { simPrice: 0, daysLeft: 0 },
        math: [
          { label: "Max profit (premium)", value: "+$500" },
          { label: "Max loss (strike × 100)", value: "-$5,500" },
          { label: "", value: "" },
          {
            label: "Risk/Reward ratio",
            value: "11:1 against you",
            highlight: true,
          },
        ],
        tooltips: [
          {
            term: "Risk/Reward ratio",
            metaphor:
              "You're risking $5,500 to make $500. The probability of winning better be high enough to justify that imbalance.",
          },
        ],
      },
      {
        text: "Because it works MOST of the time. Remember: 80% of options expire worthless. Option sellers collect premium month after month. The key is position sizing - never risk what you can't afford to lose.",
        actionLabel: "One More Thing",
        setup: { simPrice: 65, daysLeft: 0 },
        math: [
          { label: "Options that expire worthless", value: "~80%" },
          { label: "Seller wins", value: "Most months" },
          { label: "", value: "" },
          { label: "But when you lose...", value: "", highlight: true },
          { label: "You lose BIG", value: "Size accordingly" },
        ],
        tooltips: [
          {
            term: "position sizing",
            metaphor:
              "Don't put all your eggs in one basket. If you have $50,000, maybe only risk $5,000 on any single position. One bad outcome shouldn't derail you.",
          },
          {
            term: "80% of options expire worthless",
            metaphor:
              "Most insurance policies never get claimed. As the seller, you're collecting premiums that usually just become profit.",
          },
        ],
      },
      {
        text: "Pro tip: only sell puts on stocks you'd be HAPPY to own at that price. If KO drops to $60 and you get assigned, you now own a solid dividend stock at a discount. That's called a 'cash-secured put.'",
        actionLabel: "See What You Learned",
        setup: { simPrice: 60, daysLeft: 0 },
        math: [
          { label: "Stock you wanted anyway", value: "KO" },
          { label: "Price you wanted", value: "$60" },
          { label: "Actually paid", value: "$55", highlight: true },
          { label: "(strike - premium)", value: "" },
          { label: "", value: "" },
          { label: "Assignment = buying at a discount", value: "" },
        ],
        tooltips: [
          {
            term: "cash-secured put",
            metaphor:
              "Like telling a seller: 'I'll buy that for $6,000 if you pay me $500 to wait.' Either you get $500 free, or you get what you wanted anyway at a discount.",
          },
          {
            term: "dividend stock",
            metaphor:
              "A stock that pays you just for owning it. Like a savings account that sends you interest checks every quarter.",
          },
        ],
      },
      {
        text: "You made it! You now understand more about options than most people who try to trade them. Before you trade real money, practice with paper trading on your broker's platform.",
        actionLabel: "Start Over",
        setup: { simPrice: 400, daysLeft: 30 },
        math: [
          { label: "What you learned", value: "", highlight: true },
          { label: "", value: "" },
          { label: "Calls", value: "Profit when UP" },
          { label: "Puts", value: "Profit when DOWN" },
          { label: "Time decay", value: "Options melt" },
          { label: "Selling", value: "Collect premium, take risk" },
          { label: "", value: "" },
          { label: "Next steps", value: "", highlight: true },
          { label: "1. Paper trade first", value: "No real money" },
          { label: "2. Start small", value: "1-2 contracts max" },
          { label: "3. Know your max loss", value: "Before every trade" },
        ],
      },
    ],
  },
];

// Get modules based on content variant
export const getModules = (variant: ContentVariant = "default"): Module[] => {
  return variant === "tech" ? MODULES_TECH : MODULES_DEFAULT;
};

// Default export for backwards compatibility
export const MODULES = MODULES_DEFAULT;

export const calculateProgress = (totalProfit: number) => {
  const currentLevel =
    LEVELS.findLast((l: Level) => totalProfit >= l.requiredPnl) || LEVELS[0];
  const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1];
  if (!nextLevel) return { currentLevel, nextLevel: null, percent: 100 };
  const range = nextLevel.requiredPnl - currentLevel.requiredPnl;
  const progress = totalProfit - currentLevel.requiredPnl;
  const percent = Math.min(100, Math.max(0, (progress / range) * 100));
  return { currentLevel, nextLevel, percent };
};
