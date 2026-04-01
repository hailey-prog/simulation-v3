import React from 'react';
import { Check } from 'lucide-react';
import { Choice } from '../types/simulation';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

interface Props {
  choices: Choice[];
  enabled: boolean;
  onSelect: (choice: Choice) => void;
  selectedChoiceId?: string;
  previousChoiceId?: string;
}

export const ChoiceButtons: React.FC<Props> = ({
  choices,
  enabled,
  onSelect,
  selectedChoiceId,
  previousChoiceId,
}) => {
  const isPast = selectedChoiceId !== undefined;

  return (
    <div className="flex flex-col gap-2 mt-4 animate-fadeIn">
      {choices.map((choice, idx) => {
        const letter = LETTERS[idx] ?? String(idx + 1);
        const isSelected = selectedChoiceId === choice.id;
        const isPrev = previousChoiceId === choice.id;
        const isDisabled = isSelected || (!enabled && !isPast);

        let containerCls = 'group flex items-start gap-3 px-4 py-3.5 rounded-2xl border text-sm transition-all duration-150 ';
        let circleCls = 'shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-150 mt-0.5 ';
        let textCls = 'flex-1 leading-[1.65] ';

        if (isSelected) {
          containerCls += 'border-accent bg-accent/8 cursor-default';
          circleCls += 'bg-accent text-white';
          textCls += 'text-slate-900 font-medium';
        } else if (isPrev) {
          containerCls += 'border-slate-300 bg-slate-50 cursor-pointer hover:border-accent hover:bg-accent/5';
          circleCls += 'bg-slate-200 text-slate-600 group-hover:bg-accent/20 group-hover:text-accent';
          textCls += 'text-slate-700';
        } else if (enabled) {
          containerCls += 'border-border bg-surface cursor-pointer hover:border-accent hover:bg-accent/5 hover:shadow-sm';
          circleCls += 'bg-slate-100 text-slate-500 group-hover:bg-accent group-hover:text-white';
          textCls += 'text-slate-700';
        } else if (isPast) {
          containerCls += 'border-border bg-surface cursor-pointer hover:border-accent/40';
          circleCls += 'bg-slate-100 text-slate-400';
          textCls += 'text-slate-500';
        } else {
          containerCls += 'border-border/40 bg-surface/50 cursor-not-allowed opacity-60';
          circleCls += 'bg-slate-100 text-slate-400';
          textCls += 'text-slate-400';
        }

        return (
          <button
            key={choice.id}
            disabled={isDisabled}
            onClick={() => !isSelected && onSelect(choice)}
            className={containerCls}
          >
            {/* Letter circle */}
            <span className={circleCls}>
              {isSelected ? <Check size={12} strokeWidth={3} /> : letter}
            </span>

            {/* Choice text */}
            <span className={textCls}>{choice.text}</span>

            {/* Previous badge */}
            {isPrev && !isSelected && (
              <span className="shrink-0 self-center text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-1">
                이전
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
