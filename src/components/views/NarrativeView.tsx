import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { MathLine, Tooltip, Prediction } from "../../lib/progression";

interface NarrativeViewProps {
  moduleIndex: number;
  moduleTitle: string;
  stepText: string;
  actionLabel: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  initialPrice: number;
  currentPrice: number;
  math?: MathLine[];
  tooltips?: Tooltip[];
  prediction?: Prediction;
  isPresentationMode?: boolean;
  totalProfit?: number;
  rankName?: string;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

const TooltipTerm: React.FC<{ term: string; metaphor: string }> = ({
  term,
  metaphor,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const termRef = React.useRef<HTMLSpanElement>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});

  const updatePosition = () => {
    if (termRef.current) {
      const rect = termRef.current.getBoundingClientRect();
      const tooltipWidth = 288; // w-72 = 18rem = 288px
      const margin = 16;

      // Calculate horizontal position
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      let arrowLeft = tooltipWidth / 2;

      // Clamp to viewport
      if (left < margin) {
        arrowLeft = rect.left + rect.width / 2 - margin;
        left = margin;
      } else if (left + tooltipWidth > window.innerWidth - margin) {
        const oldLeft = left;
        left = window.innerWidth - tooltipWidth - margin;
        arrowLeft = tooltipWidth / 2 + (oldLeft - left);
      }

      setTooltipStyle({
        position: "fixed",
        left: `${left}px`,
        top: `${rect.top - 8}px`,
        transform: "translateY(-100%)",
      });

      setArrowStyle({
        left: `${arrowLeft}px`,
        transform: "translateX(-50%)",
      });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsVisible(true);
  };

  return (
    <span className="relative inline">
      <span
        ref={termRef}
        className="border-b-2 border-dashed border-amber-400 cursor-help hover:bg-amber-50 transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => {
          updatePosition();
          setIsVisible(!isVisible);
        }}
      >
        {term}
      </span>
      {isVisible && (
        <span
          style={tooltipStyle}
          className="w-72 p-3 bg-neutral-900 text-white text-sm font-normal rounded-xl shadow-xl z-50 pointer-events-none"
        >
          <span className="block text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            Think of it like...
          </span>
          {metaphor}
          <span
            style={arrowStyle}
            className="absolute top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-neutral-900"
          />
        </span>
      )}
    </span>
  );
};

const TextWithTooltips: React.FC<{ text: string; tooltips?: Tooltip[] }> = ({
  text,
  tooltips,
}) => {
  if (!tooltips || tooltips.length === 0) {
    return <>{text}</>;
  }

  // Build a regex pattern to match all tooltip terms (case-insensitive)
  const pattern = tooltips
    .map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");

  // Split text by tooltip terms
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches any tooltip term
        const tooltip = tooltips.find(
          (t) => t.term.toLowerCase() === part.toLowerCase(),
        );

        if (tooltip) {
          return (
            <TooltipTerm key={index} term={part} metaphor={tooltip.metaphor} />
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

const Whiteboard: React.FC<{ math: MathLine[] }> = ({ math }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm min-w-[200px]">
      <div className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
        The Math
      </div>
      <div className="space-y-2">
        {math.map((line, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-4 ${
              line.highlight ? "font-bold" : ""
            } ${line.operation === "=" ? "pt-2 border-t border-neutral-100" : ""}`}
          >
            <div className="flex items-center gap-2">
              {line.operation && (
                <span
                  className={`w-4 text-center font-mono ${
                    line.operation === "="
                      ? "text-neutral-400"
                      : "text-neutral-300"
                  }`}
                >
                  {line.operation}
                </span>
              )}
              {!line.operation && <span className="w-4" />}
              <span
                className={`text-sm ${line.highlight ? "text-neutral-900" : "text-neutral-600"}`}
              >
                {line.label}
              </span>
            </div>
            <span
              className={`font-mono text-sm ${
                line.highlight
                  ? "text-emerald-600 font-bold"
                  : "text-neutral-900"
              }`}
            >
              {line.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NarrativeView: React.FC<NarrativeViewProps> = ({
  moduleIndex,
  moduleTitle,
  stepText,
  actionLabel,
  isFirstStep,
  isLastStep,
  initialPrice,
  currentPrice,
  math,
  tooltips,
  prediction,
  isPresentationMode,
  totalProfit,
  rankName,
  onPrev,
  onNext,
  onReset,
}) => {
  const hasPriceChange = initialPrice !== currentPrice;
  const priceUp = currentPrice > initialPrice;
  const priceDiff = currentPrice - initialPrice;
  const percentChange = ((currentPrice - initialPrice) / initialPrice) * 100;

  // Prediction state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const hasAnswered = selectedAnswer !== null;
  const isCorrect = hasAnswered && selectedAnswer === prediction?.correctIndex;

  // Reset prediction state when step changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedAnswer(null);
  }, [moduleIndex, stepText]);

  // Presentation mode - fullscreen slide layout
  if (isPresentationMode) {
    // Determine layout based on content
    const hasRightContent = math || prediction;

    return (
      <div className="h-full w-full flex flex-col bg-white overflow-hidden">
        {/* Header - compact */}
        <div className="shrink-0 pt-4 pb-2 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            Module {moduleIndex} • {moduleTitle}
          </div>
        </div>

        {/* Main Content - uses remaining space */}
        <div className="flex-1 min-h-0 flex items-center justify-center px-8 lg:px-16 xl:px-24 py-4">
          <div className={`w-full h-full max-w-7xl flex items-center ${hasRightContent ? 'justify-between gap-8 lg:gap-12' : 'justify-center'}`}>

            {/* Left Column: Text + Price */}
            <div className={`flex flex-col justify-center ${hasRightContent ? 'flex-1 max-w-[55%]' : 'items-center text-center max-w-4xl'}`}>
              {/* Headline */}
              <h2 className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight leading-[1.2] text-neutral-900 mb-6 ${hasRightContent ? 'text-left' : 'text-center'}`}>
                <TextWithTooltips text={stepText} tooltips={tooltips} />
              </h2>

              {/* Price Display */}
              {hasPriceChange ? (
                <div className="space-y-3">
                  <div className={`flex items-center gap-6 lg:gap-8 ${hasRightContent ? 'justify-start' : 'justify-center'}`}>
                    <div className="text-center">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300 block mb-1 font-bold">Was</span>
                      <div className="text-3xl lg:text-4xl font-mono font-medium text-neutral-300">${initialPrice}</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-5 h-5 text-neutral-300" />
                      <span className={`text-xs font-mono font-bold mt-1 ${priceUp ? "text-emerald-500" : "text-rose-500"}`}>
                        {priceUp ? "+" : ""}{percentChange.toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-center">
                      <span className={`text-[9px] font-mono uppercase tracking-[0.2em] block mb-1 font-bold ${priceUp ? "text-emerald-500" : "text-rose-500"}`}>Now</span>
                      <div className={`text-3xl lg:text-4xl font-mono font-bold ${priceUp ? "text-emerald-500" : "text-rose-500"}`}>${currentPrice}</div>
                    </div>
                  </div>
                  {moduleIndex === 0 && (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${priceUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                      {priceUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-bold">{priceUp ? "+" : ""}${priceDiff} profit per stock owned</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className={hasRightContent ? 'text-left' : 'text-center'}>
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-mono font-bold tracking-tighter text-neutral-900 mb-2">
                    ${currentPrice}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                    Current Price
                  </span>
                </div>
              )}

              {/* Completion Stats - inline with left content on last step */}
              {isLastStep && totalProfit !== undefined && rankName && !hasRightContent && (
                <div className="mt-8 flex items-center justify-center gap-6">
                  <div className="text-center px-6 py-3 bg-emerald-50 rounded-2xl">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 mb-1">Total P&L</div>
                    <div className={`text-2xl font-bold font-mono ${totalProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center px-6 py-3 bg-amber-50 rounded-2xl">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-amber-600 mb-1">Rank Achieved</div>
                    <div className="text-2xl font-bold text-amber-600">{rankName}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Math + Prediction stacked */}
            {hasRightContent && (
              <div className="shrink-0 flex flex-col gap-4 max-w-[400px] max-h-full overflow-y-auto">
                {/* Math Panel */}
                {math && (
                  <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5 shadow-sm">
                    <div className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
                      The Math
                    </div>
                    <div className="space-y-2">
                      {math.map((line, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between gap-4 ${
                            line.highlight ? "font-bold" : ""
                          } ${line.operation === "=" ? "pt-2 border-t border-neutral-200" : ""}`}
                        >
                          <div className="flex items-center gap-2">
                            {line.operation && (
                              <span className={`w-4 text-center font-mono ${line.operation === "=" ? "text-neutral-400" : "text-neutral-300"}`}>
                                {line.operation}
                              </span>
                            )}
                            {!line.operation && <span className="w-4" />}
                            <span className={`text-sm ${line.highlight ? "text-neutral-900" : "text-neutral-600"}`}>
                              {line.label}
                            </span>
                          </div>
                          <span className={`font-mono text-sm ${line.highlight ? "text-emerald-600 font-bold" : "text-neutral-900"}`}>
                            {line.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prediction Question */}
                {prediction && (
                  <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                    <div className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-amber-600 mb-2">
                      Quick Check
                    </div>
                    <p className="font-bold text-neutral-900 mb-3 text-sm">{prediction.question}</p>
                    <div className="space-y-1.5">
                      {prediction.options.map((option, idx) => {
                        const isSelected = selectedAnswer === idx;
                        const isCorrectOption = idx === prediction.correctIndex;
                        const showResult = hasAnswered;

                        let buttonStyle = "bg-white border-neutral-200 hover:border-amber-400 hover:bg-amber-50";
                        if (showResult && isCorrectOption) {
                          buttonStyle = "bg-emerald-50 border-emerald-400 text-emerald-700";
                        } else if (showResult && isSelected && !isCorrectOption) {
                          buttonStyle = "bg-rose-50 border-rose-400 text-rose-700";
                        } else if (isSelected) {
                          buttonStyle = "bg-amber-100 border-amber-400";
                        }

                        return (
                          <button
                            key={idx}
                            onClick={(e) => {
                              if (!hasAnswered) {
                                setSelectedAnswer(idx);
                                e.currentTarget.blur();
                              }
                            }}
                            disabled={hasAnswered}
                            className={`w-full text-left px-3 py-2 rounded-lg border-2 transition-all text-sm ${buttonStyle} ${hasAnswered ? "cursor-default" : "cursor-pointer"}`}
                          >
                            <div className="flex items-center gap-2">
                              {showResult && isCorrectOption && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                              {showResult && isSelected && !isCorrectOption && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                              <span>{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {hasAnswered && (
                      <div className={`mt-3 p-2 rounded-lg text-sm ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                        <span className="font-bold">{isCorrect ? "Correct!" : "Not quite."}</span> {prediction.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* Completion Stats - in right column on last step */}
                {isLastStep && totalProfit !== undefined && rankName && (
                  <div className="flex gap-3">
                    <div className="flex-1 text-center px-4 py-3 bg-emerald-50 rounded-xl">
                      <div className="text-[8px] font-mono uppercase tracking-widest text-emerald-600 mb-1">Total P&L</div>
                      <div className={`text-xl font-bold font-mono ${totalProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex-1 text-center px-4 py-3 bg-amber-50 rounded-xl">
                      <div className="text-[8px] font-mono uppercase tracking-widest text-amber-600 mb-1">Rank</div>
                      <div className="text-xl font-bold text-amber-600">{rankName}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer - fixed at bottom */}
        <div className="shrink-0 pb-6 pt-2 text-center space-y-2">
          <div className="flex items-center justify-center gap-4">
            {!isFirstStep && (
              <button
                onClick={onPrev}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-600 rounded-full font-bold text-base hover:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {isLastStep ? (
              <button
                onClick={onReset}
                className="group flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full font-bold text-base hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-xl"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            ) : (
              <button
                onClick={onNext}
                className="group flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-base transition-all active:scale-[0.98] shadow-xl bg-neutral-900 text-white hover:bg-neutral-800"
              >
                {actionLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            )}
          </div>
          <p className="text-[9px] font-mono text-neutral-300 uppercase font-bold tracking-[0.2em]">
            ← → Arrow keys to navigate • ESC to exit
          </p>
        </div>
      </div>
    );
  }

  // Normal mode - card layout
  return (
    <div className="h-full max-w-5xl mx-auto flex flex-col p-4 md:p-6">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 rounded-[2rem] md:rounded-[3rem] border p-6 md:p-8 flex flex-col bg-white border-neutral-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Header */}
          <div className="shrink-0 mb-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-50 text-neutral-400 text-[9px] font-mono font-bold uppercase tracking-[0.2em]">
              Module {moduleIndex} • {moduleTitle}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 min-h-0">
            {/* Left: Text + Price */}
            <div
              className={`flex-1 flex flex-col items-center justify-center text-center ${math ? "md:items-start md:text-left" : ""}`}
            >
              {/* Headline */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-[1.2] text-neutral-900 max-w-xl mb-6">
                <TextWithTooltips text={stepText} tooltips={tooltips} />
              </h2>

              {/* Price Display */}
              {hasPriceChange ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start gap-4 md:gap-6">
                    <div className="text-center">
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300 block mb-1 font-bold">
                        Was
                      </span>
                      <div className="text-2xl md:text-3xl font-mono font-medium text-neutral-300">
                        ${initialPrice}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-4 h-4 text-neutral-300" />
                      <span
                        className={`text-[9px] font-mono font-bold mt-1 ${priceUp ? "text-emerald-500" : "text-rose-500"}`}
                      >
                        {priceUp ? "+" : ""}
                        {percentChange.toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-center">
                      <span
                        className={`text-[9px] font-mono uppercase tracking-[0.2em] block mb-1 font-bold ${priceUp ? "text-emerald-500" : "text-rose-500"}`}
                      >
                        Now
                      </span>
                      <div
                        className={`text-2xl md:text-3xl font-mono font-bold ${priceUp ? "text-emerald-500" : "text-rose-500"}`}
                      >
                        ${currentPrice}
                      </div>
                    </div>
                  </div>
                  {moduleIndex === 0 && (
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${priceUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
                    >
                      {priceUp ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="font-bold text-sm">
                        {priceUp ? "+" : ""}${priceDiff} profit per stock owned
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-mono font-bold tracking-tighter text-neutral-900 mb-2">
                    ${currentPrice}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                    Current Price
                  </span>
                </div>
              )}
            </div>

            {/* Right: Whiteboard (only when math exists) */}
            {math && (
              <div className="shrink-0">
                <Whiteboard math={math} />
              </div>
            )}
          </div>

          {/* Prediction Question */}
          {prediction && (
            <div className="shrink-0 mt-6 mx-auto max-w-lg">
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <div className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">
                  Quick Check
                </div>
                <p className="font-bold text-neutral-900 mb-4">{prediction.question}</p>
                <div className="space-y-2">
                  {prediction.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrectOption = idx === prediction.correctIndex;
                    const showResult = hasAnswered;

                    let buttonStyle = "bg-white border-neutral-200 hover:border-amber-400 hover:bg-amber-50";
                    if (showResult && isCorrectOption) {
                      buttonStyle = "bg-emerald-50 border-emerald-400 text-emerald-700";
                    } else if (showResult && isSelected && !isCorrectOption) {
                      buttonStyle = "bg-rose-50 border-rose-400 text-rose-700";
                    } else if (isSelected) {
                      buttonStyle = "bg-amber-100 border-amber-400";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={(e) => {
                          if (!hasAnswered) {
                            setSelectedAnswer(idx);
                            e.currentTarget.blur();
                          }
                        }}
                        disabled={hasAnswered}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${buttonStyle} ${hasAnswered ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <div className="flex items-center gap-3">
                          {showResult && isCorrectOption && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          )}
                          {showResult && isSelected && !isCorrectOption && (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          )}
                          <span className="text-sm">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {hasAnswered && (
                  <div className={`mt-4 p-3 rounded-xl ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                    <p className="text-sm">
                      <span className="font-bold">{isCorrect ? "Correct!" : "Not quite."}</span>{" "}
                      {prediction.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Completion Stats - only on last step */}
          {isLastStep && totalProfit !== undefined && rankName && (
            <div className="shrink-0 mt-6 mx-auto">
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="text-center px-6 py-3 bg-emerald-50 rounded-2xl">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 mb-1">
                    Total P&L
                  </div>
                  <div className={`text-2xl font-bold font-mono ${totalProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
                  </div>
                </div>
                <div className="text-center px-6 py-3 bg-amber-50 rounded-2xl">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-amber-600 mb-1">
                    Rank Achieved
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    {rankName}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="shrink-0 mt-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              {!isFirstStep && (
                <button
                  onClick={onPrev}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-neutral-100 text-neutral-600 rounded-full font-bold text-base hover:bg-neutral-200 transition-all active:scale-[0.98]"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              {isLastStep ? (
                <button
                  onClick={onReset}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-base hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-2xl shadow-emerald-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  Start Over
                </button>
              ) : (
                <button
                  onClick={onNext}
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all active:scale-[0.98] shadow-2xl shadow-neutral-200 bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  {actionLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              )}
            </div>
            {!isLastStep && (
              <p className="text-[9px] font-mono text-neutral-300 uppercase font-bold tracking-[0.3em] animate-pulse">
                Space to Continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarrativeView;
