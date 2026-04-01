import React from 'react';
import { Clock } from 'lucide-react';

interface Props {
  title: string;
  currentRound: number;
  totalRounds: number;
  isRunning: boolean;
  elapsedSeconds: number;
}

export const Header: React.FC<Props> = ({
  title,
  currentRound,
  totalRounds,
  isRunning,
  elapsedSeconds,
}) => {
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;

  const roundPct = Math.round(((currentRound - 1) / totalRounds) * 100);

  return (
    <div className="w-full shrink-0 bg-surface/90 backdrop-blur-sm border-b border-border">
      <div className="mx-auto w-full max-w-[720px] px-4 py-3">
        <div className="flex items-center justify-between mb-2.5">
          {/* Left: title + round */}
          <div>
            <h1 className="text-sm font-bold text-slate-900">{title}</h1>
            {isRunning && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold text-slate-700">
                  문항 {currentRound}
                </span>
                <span className="text-xs text-slate-300">/</span>
                <span className="text-xs text-slate-400">{totalRounds}</span>
              </div>
            )}
          </div>

          {/* Right: elapsed time badge */}
          {isRunning && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold text-slate-700 border-border bg-surface">
              <Clock size={12} />
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </div>
          )}
        </div>

        {/* Round-based progress bar */}
        {isRunning && (
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-accent"
              style={{ width: `${roundPct}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
