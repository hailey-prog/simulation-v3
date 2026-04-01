import React, { useState } from 'react';
import { ChoiceHistoryItem, CompetencyScores } from '../../types/simulation';
import { ScoreSummary } from './ScoreSummary';
import { RadarChartView } from './RadarChartView';
import { RoundReview } from './RoundReview';
import { BarChart2, Activity, List } from 'lucide-react';

interface Props {
  percentages: CompetencyScores;
  overall: number;
  history: ChoiceHistoryItem[];
  labels: Record<keyof CompetencyScores, string>;
  timeExpired: boolean;
  /** Total rounds in the simulation (for “n / m 완료”). */
  totalRounds?: number;
}

type Tab = 'summary' | 'radar' | 'review';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'summary', label: '점수 요약', icon: <BarChart2 size={14} /> },
  { id: 'radar', label: '역량 차트', icon: <Activity size={14} /> },
  { id: 'review', label: '라운드 리뷰', icon: <List size={14} /> },
];

const getFeedback = (overall: number) => {
  if (overall >= 80) return '탁월한 PM 역량을 보여주었습니다. 복잡한 상황에서도 균형 잡힌 판단을 내렸습니다.';
  if (overall >= 60) return '전반적으로 균형 잡힌 판단을 보였습니다. 일부 역량을 더 발전시키면 좋겠습니다.';
  return '도전적인 상황에서 많은 것을 배울 수 있었습니다. 각 역량을 집중적으로 개발해보세요.';
};

export const DiagnosisReport: React.FC<Props> = ({
  percentages,
  overall,
  history,
  labels,
  timeExpired,
  totalRounds = 10,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  return (
    <div className="flex flex-col h-full bg-base">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border bg-surface">
        <div className="flex items-center gap-2 mb-1">
          {timeExpired && (
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full border border-orange-200 font-medium">
              시간 초과
            </span>
          )}
          <span className="text-xs text-slate-400">
            {history.length} / {totalRounds} 라운드 완료
          </span>
        </div>
        <h2 className="text-lg font-bold text-slate-900">진단 리포트</h2>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{getFeedback(overall)}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-surface">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors
              ${activeTab === tab.id ? 'tab-active' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto chat-scroll px-5 py-4">
        {activeTab === 'summary' && (
          <ScoreSummary percentages={percentages} overall={overall} labels={labels} />
        )}
        {activeTab === 'radar' && (
          <RadarChartView percentages={percentages} labels={labels} />
        )}
        {activeTab === 'review' && (
          <RoundReview history={history} />
        )}
      </div>
    </div>
  );
};
