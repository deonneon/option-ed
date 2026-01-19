import { useState, useEffect, useCallback } from 'react'
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

  // Helper to update prices when step changes
  const updateStepPrice = useCallback((moduleIdx: number, stepIdx: number, oldPrice: number) => {
    const targetStep = MODULES[moduleIdx]?.steps[stepIdx]
    if (targetStep?.setup?.simPrice !== undefined) {
      const newPrice = targetStep.setup.simPrice
      setSimPrice(newPrice)
      if (stepIdx === 0) {
        setLastInitialPrice(newPrice)
      } else if (newPrice !== oldPrice) {
        setLastInitialPrice(oldPrice)
      }
    }
  }, [])

  // Check if narrative is complete
  const isLastStep = currentModuleIdx === MODULES.length - 1 &&
                     currentStepIdx === currentModule.steps.length - 1

  // Apply Narrative Step Setup on mount and when step data changes
  useEffect(() => {
    updateStepPrice(currentModuleIdx, currentStepIdx, simPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentModuleIdx, currentStepIdx])

  const { currentLevel, percent } = calculateProgress(totalProfit)

  // Check if we can go back
  const isFirstStep = currentModuleIdx === 0 && currentStepIdx === 0

  // Handlers
  const handleNextStep = useCallback(() => {
    const oldPrice = simPrice
    if (currentStepIdx < currentModule.steps.length - 1) {
      const nextStepIdx = currentStepIdx + 1
      setCurrentStepIdx(nextStepIdx)
      updateStepPrice(currentModuleIdx, nextStepIdx, oldPrice)
    } else if (currentModuleIdx < MODULES.length - 1) {
      const nextModuleIdx = currentModuleIdx + 1
      setCurrentModuleIdx(nextModuleIdx)
      setCurrentStepIdx(0)
      updateStepPrice(nextModuleIdx, 0, oldPrice)
    }
  }, [currentModuleIdx, currentStepIdx, simPrice, currentModule, updateStepPrice])

  const handlePrevStep = () => {
    const oldPrice = simPrice
    if (currentStepIdx > 0) {
      const prevStepIdx = currentStepIdx - 1
      setCurrentStepIdx(prevStepIdx)
      updateStepPrice(currentModuleIdx, prevStepIdx, oldPrice)
    } else if (currentModuleIdx > 0) {
      const prevModuleIdx = currentModuleIdx - 1
      const prevModule = MODULES[prevModuleIdx]
      const lastStepIdx = prevModule.steps.length - 1
      setCurrentModuleIdx(prevModuleIdx)
      setCurrentStepIdx(lastStepIdx)
      updateStepPrice(prevModuleIdx, lastStepIdx, oldPrice)
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
    const oldPrice = simPrice
    setCurrentModuleIdx(moduleIdx)
    setCurrentStepIdx(stepIdx)
    updateStepPrice(moduleIdx, stepIdx, oldPrice)
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
  }, [handleNextStep, isLastStep])

  return (
    <Layout
      headerContent={
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <ProgressBar percent={percent} levelName={currentLevel.title} />
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
