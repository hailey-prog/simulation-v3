import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Target } from 'lucide-react';
import { CompetencyScores, OutroData } from '../types/simulation';

type OutroTier = 'high' | 'mid' | 'low';

function getOutroTier(overall: number): OutroTier {
  if (overall >= 70) return 'high';
  if (overall >= 40) return 'mid';
  return 'low';
}

interface Props {
  playerName: string;
  overall: number;
  percentages: CompetencyScores;
  elapsedSeconds: number;
  outro: OutroData;
  competencyLabels: Record<string, string>;
}

export const OutroScreen: React.FC<Props> = ({
  playerName,
  overall,
  percentages,
  elapsedSeconds,
  outro,
  competencyLabels,
}) => {
  const navigate = useNavigate();
  const tier = getOutroTier(overall);
  const tierData = outro.tiers[tier];

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;

  const closing = tierData.closing
    .replace('{name}', playerName)
    .replace('{score}', String(overall));

  const goalScore = tierData.goalScore.replace('{score}', String(overall));

  return (
    <div className="flex flex-col h-full bg-base overflow-y-auto overflow-x-hidden chat-scroll">
      <div className="px-6 pt-8 pb-12 space-y-6 max-w-[720px] mx-auto w-full">

        {/* Closing text */}
        <div className="space-y-4">
          <p className="text-lg font-bold text-slate-900 leading-[1.7] whitespace-pre-wrap">
            {closing}
          </p>
        </div>

        {/* Goal achievement */}
        <div className="bg-surface rounded-2xl p-5 border border-border">
          <div className="flex items-center gap-1.5 mb-3">
            <Target size={13} className="text-slate-400" />
            <p className="text-xs font-semibold text-slate-500">목표 달성도</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{outro.goalLabel}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">{tierData.goalAchievement}</p>
            <span className="text-sm font-bold text-accent">{goalScore}</span>
          </div>
          {/* Score bar */}
          <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-700"
              style={{ width: `${overall}%` }}
            />
          </div>
        </div>

        {/* Character reactions */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 px-1">팀의 반응</p>
          {outro.characters.map((character) => {
            const reaction = tierData.characterReactions[character];
            if (!reaction) return null;
            return (
              <div key={character} className="bg-surface rounded-2xl p-4 border border-border">
                <p className="text-[11px] font-semibold text-slate-400 mb-1.5">{character}</p>
                <p className="text-sm text-slate-700 leading-relaxed">"{reaction}"</p>
              </div>
            );
          })}
        </div>

        {/* Competency feedback */}
        <div className="bg-surface rounded-2xl overflow-hidden border border-border">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs font-semibold text-slate-500">역량별 피드백</p>
          </div>
          <div className="divide-y divide-border">
            {(Object.keys(tierData.competencyFeedback) as Array<keyof typeof tierData.competencyFeedback>).map((key) => (
              <div key={key} className="px-4 py-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-semibold text-slate-600">{competencyLabels[key]}</p>
                  <span className="text-xs font-bold text-accent">{percentages[key]}%</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{tierData.competencyFeedback[key]}</p>
                <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent/60 rounded-full transition-all duration-700"
                    style={{ width: `${percentages[key]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elapsed time */}
        <div className="flex items-center gap-2 px-1">
          <Clock size={13} className="text-slate-400" />
          <p className="text-xs text-slate-500">
            총 소요 시간: <span className="font-semibold text-slate-700 font-mono">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/diagnoses')}
          className="w-full py-4 bg-surface border border-border hover:border-accent/50 hover:bg-accent/5 text-slate-700 font-bold rounded-xl transition-all text-sm"
        >
          진단 목록으로
        </button>

      </div>
    </div>
  );
};
