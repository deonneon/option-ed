import React from 'react';
import type { OptionType, TradeSide } from '../../lib/engine';
import { Rocket, Shield, Ticket, Landmark } from 'lucide-react';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  type: OptionType;
  side: TradeSide;
  icon: React.ReactNode;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'lottery-ticket',
    name: 'Lottery Ticket',
    description: 'Buy a Call. High risk, high reward if it moons.',
    type: 'call',
    side: 'buy',
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    id: 'insurance-buyer',
    name: 'Insurance Buyer',
    description: 'Buy a Put. Protect against a market crash.',
    type: 'put',
    side: 'buy',
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: 'insurance-seller',
    name: 'Insurance Seller',
    description: 'Sell a Put. Collect fees for promising to buy.',
    type: 'put',
    side: 'sell',
    icon: <Landmark className="w-4 h-4" />,
  },
  {
    id: 'casino-house',
    name: 'The Casino',
    description: 'Sell a Call. Collect fees, but watch for unlimited risk.',
    type: 'call',
    side: 'sell',
    icon: <Ticket className="w-4 h-4" />,
  },
];

interface ScenarioSelectorProps {
  currentScenarioId: string;
  onSelect: (scenario: Scenario) => void;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ currentScenarioId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SCENARIOS.map((scenario) => (
        <button
          key={scenario.id}
          onClick={() => onSelect(scenario)}
          className={`flex flex-col items-start p-4 rounded-2xl border transition-all text-left ${
            currentScenarioId === scenario.id
              ? 'bg-neutral-900 border-neutral-900 text-white shadow-lg'
              : 'bg-white border-neutral-100 text-neutral-900 hover:border-neutral-300'
          }`}
        >
          <div className={`p-2 rounded-lg mb-3 ${
            currentScenarioId === scenario.id ? 'bg-white/10' : 'bg-neutral-50'
          }`}>
            {scenario.icon}
          </div>
          <div className="font-bold text-sm mb-1">{scenario.name}</div>
          <div className={`text-[10px] leading-relaxed ${
            currentScenarioId === scenario.id ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            {scenario.description}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ScenarioSelector;
