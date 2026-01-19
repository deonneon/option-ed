# OptionEd: Interactive Options Education Blueprint

OptionEd is a static, interactive educational web application designed to demystify options trading for beginners. It replaces complex jargon with intuitive visuals, sliders, and real-time feedback loops.

---

## 1. Core Philosophy: "Play, Don't Read"
- **Zero Jargon:** No Delta, Gamma, or Theta. We use "Hope Value," "Time Decay," and "Ticket Price."
- **Immediate Feedback:** Every slider movement instantly updates the Profit/Loss chart.
- **Hyperminimalist Aesthetic:** A "Bento Box" or "Terminal-Clean" layout. No clutter, high contrast, and plenty of negative space.
- **Visual Metaphors:** Rocket ships for calls, parachutes for puts, and melting ice cubes for time decay.

### Jargon-to-Simple Mapping
| Professional Term | OptionEd Translation |
| :--- | :--- |
| **Call Option** | "I think it will go **UP**." (The Rocket 🚀) |
| **Put Option** | "I think it will go **DOWN**." (The Parachute 🪂) |
| **Buying (Long)** | "Paying a fee for a choice later." (Buying a Ticket) |
| **Selling (Short)** | "Collecting a fee to take a risk." (Being the House/Casino) |
| **Premium** | "The Ticket Price." |
| **Strike Price** | "The Target Price." |
| **Theta** | "The Melting Ice Cube" (Time Value). |
| **Volatility** | "The Drama Level." |

---

## 2. Tech Stack (Optimized for Speed & Hosting)
- **Framework:** React + Vite (for lightning-fast HMR and simple static hosting).
- **Styling:** Tailwind CSS + Shadcn/UI (Radix-based components for accessibility).
- **Visualization:** Recharts (Customized for "Hockey Stick" payoff diagrams).
- **Icons:** Lucide-React.
- **State Management:** React Context (for global simulation state).
- **Hosting:** Vercel or Netlify (Standard static deployment).

---

## 3. Hyperminimalist Design Guidelines
To maintain a "Zen-like" focus on the numbers and concepts:
- **Palette:** Strictly Monochrome (Black, White, Grays) with semantic color for P/L (Green/Red).
- **Typography:** Sans-serif (Inter/Geist) for UI; Monospaced (JetBrains Mono/Geist Mono) for all numbers and tickers.
- **Layout:** A centered "Bento" layout. Components are cards with thin, subtle borders (`border-neutral-200/80`).
- **Interaction:** Smooth, low-latency slider updates. No heavy shadows or complex gradients.
- **Mobile-First:** Single-column scrollable experience on mobile, clean grid on desktop.

---

## 4. Component Architecture
```text
/src
  /components
    /simulator
      - PayoffChart.tsx       (The Recharts visualizer)
      - ControlPanel.tsx      (Sliders and Toggles)
      - ProfitDisplay.tsx     (Large real-time P/L counter)
      - ScenarioSelector.tsx  (Presets: "Lottery Ticket", "Insurance", etc.)
    /gamification
      - ProgressBar.tsx       (Minimalist level indicator)
      - AchievementToast.tsx  (Subtle unlock notifications)
      - ChallengeCard.tsx     (The "Level" objective)
    /learning
      - ConceptCard.tsx       (Simple explanations with analogies)
      - TimeMachine.tsx       (The melting ice cube visualizer)
    /shared
      - Layout.tsx
      - ThemeToggle.tsx
  /lib
    - engine.ts               (The math logic for P/L and time decay)
    - constants.ts            (Stock data: TSLA, KO, etc.)
    - progression.ts          (Logic for levels and unlocks)
```

---

## 4. Feature Modules

### Module 0: The Big Picture (Stock Market 101)
Before options, users need to understand the "Stage" they are playing on.
- **The Concept:** The stock market is just a giant global garage sale that never closes.
- **The Players:**
    - **The Dreamers (Retail Buyers):** People like you, hoping a company's "Idea" becomes a "Giant."
    - **The Giants (Institutions):** Pension funds and big banks that move the market like ocean currents.
    - **The Shopkeepers (Market Makers):** The people who always stand in the middle, ready to buy from you or sell to you for a tiny fee (the "Spread").
- **The Core Rule:** Price is just a "Vibe Check." If more people want in than want out, the rocket goes up.

### Module A: The Interactive Simulator (Core)
The main dashboard where users "play" with a trade.
- **Stock Selection:** Toggle between **$TSLA** (High Drama/Volatile) and **$KO** (Stable/Safe).
- **The Payoff Chart:** A dynamic "Hockey Stick" diagram. A vertical line follows the "Current Price" slider.
- **Real-time P/L:** A massive green/red number showing total gain/loss including the initial "Ticket Price."

### Module B: The "Time Machine" (Time Decay)
Teaches that *timing* is as important as *direction*.
- **The Ice Cube Visual:** An icon of an ice cube that melts as the "Days to Expiration" slider moves.
- **The "Hope Value" Logic:** Shows how an option can lose value even if the stock price doesn't move.
- **Scenario:** "The Slow Grind" — User is right about direction but loses money because they held too long.

### Module C: The "House vs. Gambler" (Selling vs. Buying)
- **Buying:** Capped loss (the ticket price), unlimited win. UI is friendly and blue.
- **Selling:** Capped win (the fee collected), unlimited risk. UI turns **Warning Red** to indicate danger.
- **Analogy:** "Are you the person buying the insurance (safe, pays a fee) or the company selling it (risky, collects fees)?"

---

## 5. Gamification & Progression
To turn learning into a game without cluttering the UI:

- **The "Rank" System:**
    - Level 1: **The Spectator** (Unlocked after Stock Market 101)
    - Level 2: **The Ticket Buyer** (Unlocked after first Call/Put profit)
    - Level 3: **The Ice Cube Survivor** (Unlocked after navigating Time Decay)
    - Level 4: **The Casino Owner** (Unlocked after successful Selling scenario)
    - Level 5: **The Options Greek** (Final Mastery)
- **Interactive Challenges:** Instead of tutorials, use "Scenario Levels."
    - *Level 1-1:* "Tesla is mooning. Pick the right ticket to make $500."
    - *Level 2-1:* "The clock is ticking. Exit the trade before the Ice Cube melts."
- **Feedback Loops:**
    - **Visual Haptic:** Screen shakes slightly on "Total Loss."
    - **Sound:** Subtle "Chime" on profit, low "Thud" on loss.
    - **Streak Tracker:** A minimalist "🔥" counter in the corner for consecutive correct simulation predictions.

---

## 6. Simulation Logic (Simplified Math)

We avoid the Black-Scholes model to keep the code fast and the concepts accessible.

### Total Option Value = Intrinsic Value + Hope (Extrinsic) Value

1.  **Intrinsic Value:**
    - Call: `Math.max(0, StockPrice - StrikePrice)`
    - Put: `Math.max(0, StrikePrice - StockPrice)`
2.  **Hope Value (Time + Volatility):**
    - `timeFactor = Math.sqrt(daysRemaining / 30)` (Decay accelerates near expiration).
    - `volatilityFactor = stock.volatilityMultiplier` (TSLA = 2.5, KO = 0.8).
    - `extrinsic = timeFactor * volatilityFactor * (10 / (distanceFromStrike + 1))`.

### JavaScript Implementation (`lib/engine.ts`)
```typescript
export const calculatePnl = (
  type: 'call' | 'put',
  side: 'buy' | 'sell',
  strike: number,
  currentPrice: number,
  premium: number,
  daysLeft: number,
  volatility: number
) => {
  const multiplier = 100; // 1 contract = 100 shares
  
  // 1. Calculate Intrinsic
  const intrinsic = type === 'call' 
    ? Math.max(0, currentPrice - strike) 
    : Math.max(0, strike - currentPrice);

  // 2. Calculate Remaining Hope Value (simplified decay)
  const timeDecay = Math.sqrt(daysLeft / 30);
  const hopeValue = premium * timeDecay * (volatility / 2);
  
  const currentOptionValue = intrinsic + hopeValue;
  const pnl = side === 'buy' 
    ? (currentOptionValue - premium) * multiplier 
    : (premium - currentOptionValue) * multiplier;

  return pnl;
};
```

---

## 6. Learning Path (The "Aha!" Moments)

0.  **The Garage Sale:** Understanding that every time you buy, someone else is selling (and why they might do that).
1.  **The Cheap Bet:** Buy a Call on Tesla. Price moons. User sees a 10x return. (Dopamine hit).
2.  **The Trap:** Same Tesla Call, but stock moves sideways for 20 days. User sees the "Ice Cube" melt and money disappear.
3.  **The Casino:** Sell a Put on Coca-Cola. Stock stays flat. User collects a "service fee" (Premium). "I get paid for doing nothing?"
4.  **The Disaster:** Sell a Call on Tesla. Stock moons. User sees a massive, uncapped red number. "Wait, I owe how much?!"

---

## 7. Development Roadmap

### Phase 1: Foundation (Completed)
- [x] Initialize Vite + React + TypeScript project.
- [x] Install Tailwind CSS v4 and Framer Motion.
- [x] Build the `engine.ts` math library.
- [x] Create basic Layout and Navigation.

### Phase 2: The Simulator (Completed)
- [x] Implement `PayoffChart.tsx` using Recharts.
- [x] Build interactive controls with dynamic Sliders.
- [x] Link state so Sliders -> Engine -> Chart.
- [x] Implement Scenario Presets (Lottery Ticket, Casino, etc.).

### Phase 3: Education & Gamification (Completed)
- [x] Add "Time Machine" ice cube animations for time decay.
- [x] Write "Concept Cards" with simple market analogies.
- [x] Implement "Warning" UI for high-risk selling scenarios.
- [x] Build Rank & Progression system with Achievement Toasts.

### Phase 4: Final Polish & Deployment
- [x] Build for production (`npm run build`).
- [ ] Final SEO optimization & Meta tags.
- [ ] Deploy to Vercel/Netlify.
- [ ] Final accessibility audit (Aria labels, keyboard nav).

---

## 8. Future Scope (V2)
- **Multi-Leg Spreads:** "The Iron Condor" (The "Safe Range" bet).
- **Paper Trading:** A simple "Save this trade" button to track fake performance over a real week.
- **Quiz Mode:** "What's the best move if you think the market will stay flat?"
