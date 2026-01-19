# OptionEd: Interactive Options Education Blueprint

OptionEd is a static, interactive educational web application designed to demystify options trading for beginners. It replaces complex jargon with intuitive visuals, narrative storytelling, and a math whiteboard for transparent calculations.

---

## 1. Core Philosophy: "Experience, Don't Study"
- **Narrative-First Learning:** Users follow a story-driven path with definite outcomes, rather than aimless exploration.
- **Zero Jargon:** No Delta, Gamma, or Theta. We use plain language: "Call options" (bet on up), "Put options" (bet on down/insurance).
- **Leverage-First Explanation:** Every options concept emphasizes WHY options are powerful (same money, 10x the profit).
- **Transparent Math:** A whiteboard panel shows every calculation step-by-step, making the math digestible.
- **Fixed-Frame Experience:** Designed as a focused, app-like interface to minimize distraction.

---

## 2. Tech Stack
- **Framework:** React + Vite (Standard for static educational apps).
- **Styling:** Tailwind CSS v4 (Modern, utility-first styling).
- **Animation:** Framer Motion (For transitions and level-up notifications).
- **Icons:** Lucide-React (Minimalist line icons).

---

## 3. Design Guidelines (Hyperminimalist)
- **Layout:** Fixed-screen with left sidebar (module outline) and centered narrative card.
- **Typography:** Sans-serif (Inter/Geist) for instructions; Monospaced for financial data.
- **Palette:** Strictly Monochrome (Black, White, Grays) with semantic Green/Red for P/L outcomes.
- **Interaction:** Button-driven progression with Back/Next navigation and Spacebar support.

---

## 4. Component Architecture
```text
/src
  /components
    /learning
      - StoryOutcome.tsx    (Price display for narrative context)
    /gamification
      - ProgressBar.tsx     (Global rank indicator in header)
      - AchievementToast.tsx (Level-up notifications)
    /shared
      - Layout.tsx          (Fixed-frame shell with header and sidebar)
      - ModuleOutline.tsx   (Left sidebar navigation showing all modules/steps)
    /views
      - NarrativeView.tsx   (Main narrative display with whiteboard)
  /lib
    - engine.ts             (P/L and time decay math)
    - progression.ts        (Narrative Modules, Steps, and Math definitions)
    - constants.ts          (Stock data: TSLA, KO, etc.)
```

---

## 5. Narrative Modules (The Learning Path)

### Module 0: The Stage (Market 101)
- **Concept:** Stock prices move based on supply and demand.
- **Story:** Tesla announces Robotaxi; price jumps from $200 to $230.
- **Whiteboard:** Shows price change calculation.

### Module 1: Call Options (Betting Up)
- **Concept:** Options give you LEVERAGE - same investment, bigger returns.
- **Story:** Buy a $210 Call for $10. Tesla rockets to $240.
- **Whiteboard:**
  - Stock approach: Buy 1 share for $200 → +$40 profit
  - Options approach: Buy 20 calls × $10 = $200 → +$400 profit
  - **Key insight: Same money, 10x the profit**

### Module 2: Put Options (Insurance/Betting Down)
- **Concept:** Put options profit when stocks crash, or protect existing holdings.
- **Story:** Tesla crashes to $150. Your $10 Put makes $40 profit.
- **Whiteboard:** Shows stock loss vs put profit comparison.

### Module 3: Time Decay (The Hidden Cost)
- **Concept:** Options expire - if the stock doesn't move fast enough, you lose everything.
- **Story:** Tesla stays flat. Your option melts to $0 at expiration.
- **Whiteboard:** Shows option cost → $0 value → total loss.

### Module 4: Selling Options (Being the House)
- **Concept:** Instead of buying options, you can SELL them and collect premiums.
- **Story:** Sell a Put on Coca-Cola. KO stays flat. You keep the $5 premium.
- **Whiteboard:** Shows both scenarios - profit if flat, loss if crash.

---

## 6. Key UI Features

### Module Outline Sidebar
- Left sidebar showing all 5 modules
- Current module highlighted with step indicators
- Completed modules show green checkmark
- Click to navigate to any completed section

### Math Whiteboard
- Right-aligned panel on narrative steps
- Shows calculations line by line
- Key values highlighted for emphasis
- Supports comparison layouts (Stock vs Options)

### Navigation
- Back/Next buttons for linear progression
- Reset button to restart storyline
- Spacebar for quick forward navigation
- Module sidebar for jumping to sections

---

## 7. Development Roadmap

### Phase 1: Foundation (Completed)
- [x] Initialize Vite + React + TS project
- [x] Build `engine.ts` math library
- [x] Create Fixed-Frame `Layout.tsx`

### Phase 2: Narrative System (Completed)
- [x] Implement `progression.ts` with 5 Story Modules
- [x] Build `NarrativeView.tsx` with whiteboard
- [x] Add Spacebar navigation support
- [x] Add Back button navigation

### Phase 3: UI Polish (Completed)
- [x] Add Module Outline sidebar
- [x] Simplify header (removed unnecessary elements)
- [x] Remove footer for cleaner experience
- [x] Add Reset storyline functionality

### Phase 4: Narrative Clarity (Completed)
- [x] Rewrite all modules for beginner clarity
- [x] Add math whiteboard to show calculations
- [x] Emphasize leverage advantage (10x profit comparison)
- [x] Add cost breakdown to trade entry steps

---

## 8. Future Scope (V2)
- **Sandbox Mode:** Free-form experimentation with sliders after completing narrative
- **Multi-Leg Narratives:** "The Iron Condor" (Playing the Safe Range)
- **Paper Trading Mode:** Track real-time market data vs. narrative predictions
- **Quiz Challenges:** "What's the best tool for this market vibe?"
