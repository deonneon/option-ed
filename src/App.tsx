import { useState, useMemo } from 'react'
import Layout from './components/shared/Layout'
import { calculatePnl, generatePayoffData } from './lib/engine'
import type { OptionType, TradeSide } from './lib/engine'
import { STOCKS } from './lib/constants'
import { 
  TrendingUp, 
  Info, 
  Target, 
  LayoutGrid, 
  Trophy,
  AlertTriangle,
  Activity
} from 'lucide-react'
import PayoffChart from './components/simulator/PayoffChart'
import TimeMachine from './components/learning/TimeMachine'
import ProgressBar from './components/gamification/ProgressBar'
import ScenarioSelector, { SCENARIOS } from './components/simulator/ScenarioSelector'
import type { Scenario } from './components/simulator/ScenarioSelector'
import ConceptCard from './components/learning/ConceptCard'
import ChallengeCard from './components/gamification/ChallengeCard'
import AchievementToast from './components/gamification/AchievementToast'
import { calculateProgress, LEVELS } from './lib/progression'
import type { Level } from './lib/progression'

const App = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'simulator' | 'levels'>('simulator')

  // Simulation State
  const [totalProfit, setTotalProfit] = useState(0)
  const [unlockedLevel, setUnlockedLevel] = useState<Level | null>(null)
  const [stockSymbol, setStockSymbol] = useState('TSLA')
  const [optionType, setOptionType] = useState<OptionType>('call')
  const [tradeSide, setTradeSide] = useState<TradeSide>('buy')
  const [strike, setStrike] = useState(210)
  const [daysLeft, setDaysLeft] = useState(30)
  const [simPrice, setSimPrice] = useState(200)
  const [currentScenarioId, setCurrentScenarioId] = useState('lottery-ticket')

  const { currentLevel, percent } = calculateProgress(totalProfit)

  const stock = STOCKS[stockSymbol]
  
  // Dynamic Premium Calculation
  const premium = useMemo(() => {
    const base = optionType === 'call' 
      ? Math.max(1, 10 + (stock.currentPrice - strike) * 0.5)
      : Math.max(1, 10 + (strike - stock.currentPrice) * 0.5)
    return parseFloat((base * stock.volatilityMultiplier).toFixed(2))
  }, [stock, strike, optionType])

  const { pnl } = calculatePnl(
    optionType,
    tradeSide,
    strike,
    simPrice,
    premium,
    daysLeft,
    stock.volatilityMultiplier
  )

  const chartData = useMemo(() => {
    return generatePayoffData(
      optionType,
      tradeSide,
      strike,
      premium,
      stock.volatilityMultiplier,
      daysLeft,
      150,
      250,
      1
    )
  }, [optionType, tradeSide, strike, premium, stock.volatilityMultiplier, daysLeft])

  // Handlers
  const handleApplyTrade = () => {
    const oldProgress = calculateProgress(totalProfit)
    const newProfit = totalProfit + pnl
    const newProgress = calculateProgress(newProfit)
    
    if (newProgress.currentLevel.id > oldProgress.currentLevel.id) {
      setUnlockedLevel(newProgress.currentLevel)
    }
    
    setTotalProfit(newProfit)
  }

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentScenarioId(scenario.id)
    setOptionType(scenario.type)
    setTradeSide(scenario.side)
    // Adjust strike based on current price for realism
    setStrike(scenario.type === 'call' ? stock.currentPrice + 10 : stock.currentPrice - 10)
  }

  return (
    <Layout>
      {/* Header-Integrated Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 bg-neutral-100 rounded-2xl">
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'simulator' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <LayoutGrid className="w-4 h-4" />
            Simulator
          </button>
          <button 
            onClick={() => setActiveTab('levels')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'levels' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
          >
            <Trophy className="w-4 h-4" />
            Ranks
          </button>
        </div>
      </div>

      {activeTab === 'simulator' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Top: Header & Progress */}
          <div className="md:col-span-12">
            <div className="rounded-3xl border border-neutral-100 bg-neutral-50/50 p-8 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
                  Module 01: The Basics
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-3">The Global Garage Sale</h2>
                <p className="text-neutral-500 max-w-xl leading-relaxed">
                  Every trade needs a buyer and a seller. Use the scenarios below to see how different "tickets" behave as the stock moves or time runs out.
                </p>
              </div>
              <div className="w-full md:w-72 p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm transition-all hover:shadow-md">
                <ProgressBar percent={percent} levelName={currentLevel.title} />
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-widest">Lifetime P/L</span>
                  <span className={`text-sm font-mono font-bold ${totalProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    ${totalProfit.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Quick Selector */}
          <div className="md:col-span-12">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">Select Strategy</h3>
              <div className="h-px flex-1 bg-neutral-100 mx-4" />
            </div>
            <ScenarioSelector 
              currentScenarioId={currentScenarioId} 
              onSelect={handleScenarioSelect} 
            />
          </div>

          {/* Left: Main Simulator */}
          <div className="md:col-span-8 space-y-6">
            <div className={`rounded-3xl border p-8 shadow-sm transition-all duration-700 ${
              tradeSide === 'sell' && stock.volatilityMultiplier > 2 ? 'bg-rose-50/50 border-rose-200' : 'bg-white border-neutral-100'
            }`}>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${pnl >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Payoff Diagram</h3>
                    <p className="text-xs text-neutral-400 font-mono uppercase tracking-widest">Real-time Visualization</p>
                  </div>
                </div>
                {tradeSide === 'sell' && stock.volatilityMultiplier > 2 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-widest animate-pulse border border-rose-200">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    High Risk Alert
                  </div>
                )}
              </div>

              <div className="h-[350px] w-full mb-10">
                <PayoffChart 
                  data={chartData} 
                  currentPrice={simPrice} 
                  strike={strike} 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-neutral-50/50 border border-neutral-100/50 transition-all hover:bg-neutral-50">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">Simulated Stock Price</span>
                  <span className="text-3xl font-mono font-medium tracking-tight">${simPrice.toFixed(2)}</span>
                </div>
                <div className="p-6 rounded-2xl bg-neutral-50/50 border border-neutral-100/50 transition-all hover:bg-neutral-50">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">Ticket Price (Premium)</span>
                  <span className="text-3xl font-mono font-medium tracking-tight">${premium.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Educational Concept Card */}
            <ConceptCard 
              title={SCENARIOS.find(s => s.id === currentScenarioId)?.name || 'The Strategy'}
              description={SCENARIOS.find(s => s.id === currentScenarioId)?.description || ''}
              analogy={
                tradeSide === 'buy' 
                  ? "You are paying for the right to choose. Like a reservation fee at a fancy restaurant."
                  : "You are the house. You collect the fee, but you must honor the reservation even if it costs you money."
              }
              icon={Info}
              variant={tradeSide === 'sell' ? 'warning' : 'default'}
            />
          </div>

          {/* Right: Controls */}
          <div className="md:col-span-4 space-y-6">
            <div className="rounded-3xl border border-neutral-100 p-8 bg-white shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <Target className="w-4 h-4 text-neutral-400" />
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Simulator Controls</h3>
              </div>
              
              <div className="space-y-10">
                {/* Asset Selector */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-4">Current Asset</label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl">
                    {Object.values(STOCKS).map((s) => (
                      <button 
                        key={s.symbol}
                        onClick={() => {
                          setStockSymbol(s.symbol)
                          setStrike(optionType === 'call' ? s.currentPrice + 10 : s.currentPrice - 10)
                        }}
                        className={`py-3 rounded-xl text-xs font-bold transition-all ${stockSymbol === s.symbol ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                      >
                        {s.symbol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex justify-between mb-3">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Target (Strike)</label>
                      <span className="text-sm font-mono font-bold">${strike}</span>
                    </div>
                    <input 
                      type="range" min={stock.currentPrice - 40} max={stock.currentPrice + 40} value={strike} 
                      onChange={(e) => setStrike(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900 transition-all group-hover:bg-neutral-200" 
                    />
                  </div>

                  <div className="group">
                    <div className="flex justify-between mb-3">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Future Price</label>
                      <span className="text-sm font-mono font-bold">${simPrice}</span>
                    </div>
                    <input 
                      type="range" min={stock.currentPrice - 50} max={stock.currentPrice + 50} value={simPrice} 
                      onChange={(e) => setSimPrice(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900 transition-all group-hover:bg-neutral-200" 
                    />
                  </div>

                  <div className="group">
                    <div className="flex justify-between mb-3">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Time Remaining</label>
                      <span className="text-sm font-mono font-bold">{daysLeft} Days</span>
                    </div>
                    <input 
                      type="range" min="0" max="30" value={daysLeft} 
                      onChange={(e) => setDaysLeft(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-900 transition-all group-hover:bg-neutral-200" 
                    />
                  </div>
                </div>

                {/* Time Machine Integrated */}
                <div className="pt-8 border-t border-neutral-100">
                  <TimeMachine daysLeft={daysLeft} />
                </div>

                {/* Main Action Call */}
                <div className={`mt-4 p-8 rounded-3xl border text-center transition-all duration-700 ${pnl >= 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                  <span className={`block text-[10px] font-mono uppercase tracking-widest mb-2 font-bold ${pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    Net Potential Return
                  </span>
                  <div className={`text-5xl font-mono font-bold tracking-tighter mb-6 ${pnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {pnl >= 0 ? '+' : ''}{pnl.toFixed(0)}
                  </div>
                  <button 
                    onClick={handleApplyTrade}
                    className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg ${pnl >= 0 ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200' : 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200'}`}
                  >
                    Bank this Trade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Trading Ranks</h2>
            <p className="text-neutral-500 max-w-lg mx-auto">
              Your Lifetime P/L determines your rank. Gain experience in the simulator to unlock higher levels and more complex strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEVELS.map((level) => (
              <ChallengeCard 
                key={level.id}
                level={level}
                isUnlocked={totalProfit >= (LEVELS[LEVELS.indexOf(level) - 1]?.requiredPnl || 0)}
                isActive={currentLevel.id === level.id}
              />
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-neutral-50 border border-neutral-100 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm mb-6">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Ready to level up?</h3>
            <p className="text-sm text-neutral-500 mb-8">Head back to the simulator and try to make some profitable trades.</p>
            <button 
              onClick={() => setActiveTab('simulator')}
              className="px-8 py-3 bg-neutral-900 text-white rounded-xl font-bold text-sm hover:bg-neutral-800 transition-all active:scale-95"
            >
              Back to Simulator
            </button>
          </div>
        </div>
      )}

      <AchievementToast 
        level={unlockedLevel} 
        onClose={() => setUnlockedLevel(null)} 
      />
    </Layout>
  )
}

export default App
