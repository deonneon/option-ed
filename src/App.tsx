import { useState, useEffect, useCallback } from 'react'
import Layout from './components/shared/Layout'
import ModuleOutline from './components/shared/ModuleOutline'
import SplashScreen from './components/shared/SplashScreen'
import { RotateCcw, Maximize2 } from 'lucide-react'
import NarrativeView from './components/views/NarrativeView'
import ProgressBar from './components/gamification/ProgressBar'
import AchievementToast from './components/gamification/AchievementToast'
import { calculateProgress, getModules } from './lib/progression'
import type { Level, ContentVariant } from './lib/progression'

const STORAGE_KEY = 'optioned-progress'
const VARIANT_STORAGE_KEY = 'optioned-content-variant'
const ONBOARDING_KEY = 'optioned-onboarding-complete'

const loadOnboardingComplete = (): boolean => {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === 'true'
  } catch (e) {
    console.error('Failed to load onboarding state:', e)
  }
  return false
}

const saveOnboardingComplete = () => {
  try {
    localStorage.setItem(ONBOARDING_KEY, 'true')
  } catch (e) {
    console.error('Failed to save onboarding state:', e)
  }
}

const loadContentVariant = (): ContentVariant => {
  try {
    const saved = localStorage.getItem(VARIANT_STORAGE_KEY)
    if (saved === 'tech' || saved === 'default') {
      return saved
    }
  } catch (e) {
    console.error('Failed to load content variant:', e)
  }
  return 'default'
}

const saveContentVariant = (variant: ContentVariant) => {
  try {
    localStorage.setItem(VARIANT_STORAGE_KEY, variant)
  } catch (e) {
    console.error('Failed to save content variant:', e)
  }
}

interface SavedProgress {
  currentModuleIdx: number
  currentStepIdx: number
  totalProfit: number
  claimedSteps: string[] // Array of "moduleIdx-stepIdx" keys for steps whose profit has been claimed
}

const loadProgress = (): SavedProgress | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load progress:', e)
  }
  return null
}

const saveProgress = (progress: SavedProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error('Failed to save progress:', e)
  }
}

const clearProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.error('Failed to clear progress:', e)
  }
}

const App = () => {
  // Onboarding state
  const [onboardingComplete, setOnboardingComplete] = useState(loadOnboardingComplete)

  // Load saved progress on mount
  const savedProgress = loadProgress()

  // Content variant state (persisted)
  const [contentVariant, setContentVariant] = useState<ContentVariant>(loadContentVariant)
  const MODULES = getModules(contentVariant)

  // Handle variant selection from splash screen
  const handleSplashVariantSelect = (variant: ContentVariant) => {
    setContentVariant(variant)
    saveContentVariant(variant)
    setOnboardingComplete(true)
    saveOnboardingComplete()
  }

  // Save variant when it changes
  useEffect(() => {
    saveContentVariant(contentVariant)
  }, [contentVariant])

  // Learning State
  const [currentModuleIdx, setCurrentModuleIdx] = useState(savedProgress?.currentModuleIdx ?? 0)
  const [currentStepIdx, setCurrentStepIdx] = useState(savedProgress?.currentStepIdx ?? 0)
  const [lastInitialPrice, setLastInitialPrice] = useState(200)
  const [isPresentationMode, setIsPresentationMode] = useState(false)

  const currentModule = MODULES[currentModuleIdx]
  const currentStep = currentModule?.steps[currentStepIdx]

  // Progress State
  const [totalProfit, setTotalProfit] = useState(savedProgress?.totalProfit ?? 0)
  const [unlockedLevel, setUnlockedLevel] = useState<Level | null>(null)
  const [claimedSteps, setClaimedSteps] = useState<Set<string>>(
    new Set(savedProgress?.claimedSteps ?? [])
  )

  // Current price from step setup
  const [simPrice, setSimPrice] = useState(200)

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress({
      currentModuleIdx,
      currentStepIdx,
      totalProfit,
      claimedSteps: Array.from(claimedSteps)
    })
  }, [currentModuleIdx, currentStepIdx, totalProfit, claimedSteps])

  // Claim profit from a step if not already claimed
  const claimStepProfit = useCallback((moduleIdx: number, stepIdx: number) => {
    const stepKey = `${moduleIdx}-${stepIdx}`
    const step = MODULES[moduleIdx]?.steps[stepIdx]

    if (step?.profit !== undefined && !claimedSteps.has(stepKey)) {
      const previousLevel = calculateProgress(totalProfit).currentLevel
      const newProfit = totalProfit + step.profit
      setTotalProfit(newProfit)
      setClaimedSteps(prev => new Set([...prev, stepKey]))

      // Check for level up
      const newLevel = calculateProgress(newProfit).currentLevel
      if (newLevel.id > previousLevel.id) {
        setUnlockedLevel(newLevel)
      }
    }
  }, [totalProfit, claimedSteps])

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

  // Calculate course progress
  const totalSteps = MODULES.reduce((sum, m) => sum + m.steps.length, 0)
  const stepsBeforeCurrentModule = MODULES.slice(0, currentModuleIdx).reduce((sum, m) => sum + m.steps.length, 0)
  const currentStepNumber = stepsBeforeCurrentModule + currentStepIdx + 1

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
    // Claim profit from current step before advancing
    claimStepProfit(currentModuleIdx, currentStepIdx)

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
  }, [currentModuleIdx, currentStepIdx, simPrice, currentModule, updateStepPrice, claimStepProfit])

  const handlePrevStep = useCallback(() => {
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
  }, [currentModuleIdx, currentStepIdx, simPrice, updateStepPrice])

  const handleReset = () => {
    clearProgress()
    setCurrentModuleIdx(0)
    setCurrentStepIdx(0)
    setLastInitialPrice(200)
    setTotalProfit(0)
    setSimPrice(200)
    setClaimedSteps(new Set())
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
      // Space key to advance
      if (e.code === 'Space' && !isLastStep) {
        e.preventDefault()
        handleNextStep()
      }
      // Arrow forward
      if ((e.code === 'ArrowRight' || e.code === 'ArrowDown') && !isLastStep) {
        e.preventDefault()
        handleNextStep()
      }
      // Arrow backward
      if ((e.code === 'ArrowLeft' || e.code === 'ArrowUp') && !isFirstStep) {
        e.preventDefault()
        handlePrevStep()
      }
      // ESC exits presentation mode
      if (e.code === 'Escape' && isPresentationMode) {
        e.preventDefault()
        setIsPresentationMode(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNextStep, handlePrevStep, isLastStep, isFirstStep, isPresentationMode])

  // Show splash screen if onboarding not complete
  if (!onboardingComplete) {
    return <SplashScreen onSelectVariant={handleSplashVariantSelect} />
  }

  return (
    <Layout
      isPresentationMode={isPresentationMode}
      presentationProgress={{
        modules: MODULES,
        currentModuleIdx,
        currentStepIdx,
        onNavigate: handleNavigate,
        onExit: () => setIsPresentationMode(false),
      }}
      headerContent={
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex-1 min-w-0">
            <ProgressBar
              percent={percent}
              levelName={currentLevel.title}
              currentStep={currentStepNumber}
              totalSteps={totalSteps}
            />
          </div>
          <div className="hidden lg:flex gap-1 p-1 bg-neutral-100 rounded-lg shrink-0">
            <button
              onClick={() => setContentVariant('default')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                contentVariant === 'default'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setContentVariant('tech')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                contentVariant === 'tech'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Tech Bros
            </button>
          </div>
          <button
            onClick={() => setIsPresentationMode(true)}
            className="shrink-0 p-2 rounded-lg text-neutral-300 hover:text-neutral-600 hover:bg-neutral-100 transition-all"
            title="Presentation Mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
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
          contentVariant={contentVariant}
          onVariantChange={setContentVariant}
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
        prediction={currentStep?.prediction}
        isPresentationMode={isPresentationMode}
        totalProfit={totalProfit}
        rankName={currentLevel.title}
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
