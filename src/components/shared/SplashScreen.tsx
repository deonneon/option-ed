import React from "react";
import type { ContentVariant } from "../../lib/progression";

interface SplashScreenProps {
  onSelectVariant: (variant: ContentVariant) => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onSelectVariant }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter text-neutral-900 mb-3 sm:mb-4">
            OptionsEd
          </h1>
          <p className="text-base sm:text-xl text-neutral-600">
            Learn options trading in 15 minutes
          </p>
        </div>

        {/* What you'll learn */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg font-semibold text-neutral-900 mb-4 sm:mb-6">
            What you'll learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="text-lg">📈</span>
              </div>
              <div>
                <div className="font-medium text-neutral-900">Call Options</div>
                <div className="text-sm text-neutral-500">
                  Profit when stocks go up
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-lg">📉</span>
              </div>
              <div>
                <div className="font-medium text-neutral-900">Put Options</div>
                <div className="text-sm text-neutral-500">
                  Profit when stocks go down
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <span className="text-lg">⏰</span>
              </div>
              <div>
                <div className="font-medium text-neutral-900">Time Decay</div>
                <div className="text-sm text-neutral-500">
                  The hidden cost of options
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <span className="text-lg">💰</span>
              </div>
              <div>
                <div className="font-medium text-neutral-900">
                  Selling Options
                </div>
                <div className="text-sm text-neutral-500">
                  Collect premium like a pro
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Style Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5 sm:p-8">
          <h2 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
            Choose your experience
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mb-4 sm:mb-6">
            Pick the style that resonates with you. You can change this anytime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={() => onSelectVariant("default")}
              className="group relative p-4 sm:p-6 rounded-xl border-2 border-neutral-200 hover:border-neutral-900 active:bg-neutral-50 transition-all text-left"
            >
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 rounded-full border-2 border-neutral-300 group-hover:border-neutral-900 transition-colors" />
              <div className="text-xl sm:text-2xl mb-2 sm:mb-3">✨</div>
              <div className="font-semibold text-neutral-900 mb-1">Default</div>
              <div className="text-xs sm:text-sm text-neutral-500">
                Everyday brands like Starbucks & Lululemon. Relatable metaphors
                for everyone.
              </div>
            </button>

            <button
              onClick={() => onSelectVariant("tech")}
              className="group relative p-4 sm:p-6 rounded-xl border-2 border-neutral-200 hover:border-neutral-900 active:bg-neutral-50 transition-all text-left"
            >
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 rounded-full border-2 border-neutral-300 group-hover:border-neutral-900 transition-colors" />
              <div className="text-xl sm:text-2xl mb-2 sm:mb-3">🚀</div>
              <div className="font-semibold text-neutral-900 mb-1">
                Tech Bros
              </div>
              <div className="text-xs sm:text-sm text-neutral-500">
                Tesla-focused with casino metaphors. High energy, Wall Street
                vibes.
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-neutral-400 mt-6 sm:mt-8">
          No account needed. Your progress saves locally.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
