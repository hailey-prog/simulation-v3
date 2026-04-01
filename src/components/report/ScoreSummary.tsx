import React from 'react';
import { CompetencyScores } from '../../types/simulation';

interface Props {
  percentages: CompetencyScores;
  overall: number;
  labels: Record<keyof CompetencyScores, string>;
}

const getGrade = (score: number) => {
  if (score >= 85) return { label: 'S', color: 'text-violet-600' };
  if (score >= 70) return { label: 'A', color: 'text-emerald-600' };
  if (score >= 55) return { label: 'B', color: 'text-blue-600' };
  if (score >= 40) return { label: 'C', color: 'text-yellow-600' };
  return { label: 'D', color: 'text-red-500' };
};

const barColor = (score: number) => {
  if (score >= 85) return 'bg-violet-500';
  if (score >= 70) return 'bg-emerald-500';
  if (score >= 55) return 'bg-blue-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const ScoreSummary: React.FC<Props> = ({ percentages, overall, labels }) => {
  const grade = getGrade(overall);

  return (
    <div className="space-y-5">
      {/* Overall */}
      <div className="flex items-center gap-5 bg-surface rounded-2xl p-5 border border-border shadow-sm">
        <div className="text-center">
          <div className={`text-5xl font-bold ${grade.color}`}>{grade.label}</div>
          <div className="text-xs text-slate-400 mt-1">등급</div>
        </div>
        <div className="flex-1">
          <div className="text-2xl font-bold text-slate-900">{overall}<span className="text-sm text-slate-400 ml-1">점</span></div>
          <div className="text-sm text-slate-500 mt-0.5">종합 역량 점수</div>
          <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${barColor(overall)}`}
              style={{ width: `${overall}%` }}
            />
          </div>
        </div>
      </div>

      {/* Per-competency bars */}
      <div className="space-y-3">
        {(Object.keys(percentages) as (keyof CompetencyScores)[]).map((key) => {
          const pct = percentages[key];
          return (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-700">{labels[key]}</span>
                <span className="text-slate-500 font-medium">{pct}점</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barColor(pct)}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
