import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  description: string;
  analogy: string;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'info';
}

const ConceptCard: React.FC<ConceptCardProps> = ({ 
  title, 
  description, 
  analogy, 
  icon: Icon,
  variant = 'default' 
}) => {
  const styles = {
    default: 'bg-white border-neutral-100',
    warning: 'bg-rose-50 border-rose-100',
    info: 'bg-blue-50 border-blue-100',
  };

  const iconStyles = {
    default: 'bg-neutral-50 text-neutral-400',
    warning: 'bg-rose-100 text-rose-600',
    info: 'bg-blue-100 text-blue-600',
  };

  return (
    <div className={`rounded-2xl border p-6 shadow-sm flex flex-col gap-4 ${styles[variant]}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="text-sm font-bold uppercase tracking-tight">{title}</h4>
      </div>
      
      <div className="space-y-4">
        <p className="text-xs text-neutral-600 leading-relaxed">
          {description}
        </p>
        
        <div className="pt-4 border-t border-inherit">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">The Analogy</span>
          <p className="text-xs font-medium text-neutral-900 leading-relaxed italic">
            "{analogy}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConceptCard;
