import { useState, useEffect } from 'react'
import Layout from './components/shared/Layout'
import ModuleOutline from './components/shared/ModuleOutline'
import { RotateCcw } from 'lucide-react'
import NarrativeView from './components/views/NarrativeView'
import ProgressBar from './components/gamification/ProgressBar'
import AchievementToast from './components/gamification/AchievementToast'
import { calculateProgress, MODULES } from './lib/progression'
import type { Level } from './lib/progression'

const App = () => {
  // Learning State
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0)
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [lastInitialPrice, setLastInitialPrice] = useState(200)

  const currentModule = MODULES[currentModuleIdx]
  const currentStep = currentModule?.steps[currentStepIdx]

  // Progress State
  const [totalProfit, setTotalProfit] = useState(0)
  const [unlockedLevel, setUnlockedLevel] = useState<Level | null>(null)

  // Current price from step setup
  const [simPrice, setSimPrice] = useState(200)

  // Check if narrative is complete
  const isLastStep = currentModuleIdx === MODULES.length - 1 &&
                     currentStepIdx === currentModule.steps.length - 1

  // Apply Narrative Step Setup
  useEffect(() => {
    if (currentStep?.setup) {
      const s = currentStep.setup

      // When entering a new module (step 0), reset the baseline price
      if (currentStepIdx === 0 && s.simPrice !== undefined) {
        setLastInitialPrice(s.simPrice)
      } else if (s.simPrice !== undefined && s.simPrice !== simPrice) {
        setLastInitialPrice(simPrice)
      }

      if (s.simPrice !== undefined) setSimPrice(s.simPrice)
    }
  }, [currentModuleIdx, currentStepIdx])

  const { currentLevel, percent } = calculateProgress(totalProfit)

  // Check if we can go back
  const isFirstStep = currentModuleIdx === 0 && currentStepIdx === 0

  // Handlers
  const handleNextStep = () => {
    if (currentStepIdx < currentModule.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1)
    } else if (currentModuleIdx < MODULES.length - 1) {
      setCurrentModuleIdx(prev => prev + 1)
      setCurrentStepIdx(0)
    }
  }

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1)
    } else if (currentModuleIdx > 0) {
      const prevModule = MODULES[currentModuleIdx - 1]
      setCurrentModuleIdx(prev => prev - 1)
      setCurrentStepIdx(prevModule.steps.length - 1)
    }
  }

  const handleReset = () => {
    setCurrentModuleIdx(0)
    setCurrentStepIdx(0)
    setLastInitialPrice(200)
    setTotalProfit(0)
    setSimPrice(200)
  }

  const handleNavigate = (moduleIdx: number, stepIdx: number) => {
    setCurrentModuleIdx(moduleIdx)
    setCurrentStepIdx(stepIdx)
    // Reset price when navigating to a new module
    const targetStep = MODULES[moduleIdx]?.steps[stepIdx]
    if (targetStep?.setup?.simPrice !== undefined) {
      setSimPrice(targetStep.setup.simPrice)
      if (stepIdx === 0) {
        setLastInitialPrice(targetStep.setup.simPrice)
      }
    }
  }

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isLastStep) {
        e.preventDefault()
        handleNextStep()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentModuleIdx, currentStepIdx, isLastStep])

  return (
    <Layout
      headerContent={
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <ProgressBar percent={percent} levelName={currentLevel.title} />
          </div>
          <div className="shrink-0 pl-8 border-l border-neutral-100 text-right">
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-300 block mb-1">Total Vault</span>
            <span className={`text-xl font-mono font-bold tracking-tighter ${totalProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ${totalProfit.toFixed(0)}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="shrink-0 p-2 rounded-lg text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-all"
            title="Reset Story"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      }
      sidebarContent={
        <ModuleOutline
          modules={MODULES}
          currentModuleIdx={currentModuleIdx}
          currentStepIdx={currentStepIdx}
          onNavigate={handleNavigate}
        />
      }
    >
      <NarrativeView
        moduleIndex={currentModuleIdx}
        moduleTitle={currentModule.title}
        stepText={currentStep?.text || ''}
        actionLabel={currentStep?.actionLabel || 'Continue'}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        initialPrice={lastInitialPrice}
        currentPrice={simPrice}
        math={currentStep?.math}
        tooltips={currentStep?.tooltips}
        onPrev={handlePrevStep}
        onNext={handleNextStep}
        onReset={handleReset}
      />
      <AchievementToast
        level={unlockedLevel}
        onClose={() => setUnlockedLevel(null)}
      />
    </Layout>
  )
}

export default App
