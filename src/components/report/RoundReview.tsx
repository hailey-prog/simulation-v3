import React, { useState } from 'react';
import { ChoiceHistoryItem } from '../../types/simulation';
import { ReactionQualityBadge } from '../ReactionQualityBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';

const qualityConfig = {
  optimal: { bg: 'bg-blue-50 border-blue-200' },
  suboptimal: { bg: 'bg-yellow-50 border-yellow-200' },
  poor: { bg: 'bg-red-50 border-red-200' },
};

interface Props {
  history: ChoiceHistoryItem[];
}

export const RoundReview: React.FC<Props> = ({ history }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {history.map((item) => {
        const q = qualityConfig[item.quality];
        const isOpen = expanded === item.roundId;
        return (
          <div
            key={item.roundId}
            className={`border rounded-xl overflow-hidden ${q.bg}`}
          >
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              onClick={() => setExpanded(isOpen ? null : item.roundId)}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold text-accent">R{item.roundId}</span>
                <span className="text-sm text-slate-700 font-medium">{item.roundTitle}</span>
                <ReactionQualityBadge quality={item.quality} variant="short" />
              </div>
              {isOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-2 border-t border-black/5">
                <p className="text-xs text-slate-400 mt-3">선택한 답변</p>
                <p className="text-sm text-slate-700 bg-white rounded-lg px-3 py-2 border border-border">{item.choiceText}</p>
                <p className="text-xs font-medium text-slate-600 mt-2">{item.reaction.headline}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.reaction.body}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
