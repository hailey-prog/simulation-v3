import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DiagnosisReport } from './DiagnosisReport';
import type { ChoiceHistoryItem, CompetencyScores } from '../../types/simulation';

interface Props {
  percentages: CompetencyScores;
  overall: number;
  history: ChoiceHistoryItem[];
  labels: Record<keyof CompetencyScores, string>;
  timeExpired: boolean;
  totalRounds: number;
}

export const DiagnosisReportModal: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const handleClose = () => navigate('/diagnoses', { replace: true });

  // Intercept browser back → go to /diagnoses instead of simulation
  useEffect(() => {
    const onPop = () => navigate('/diagnoses', { replace: true });
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-base flex flex-col animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <div className="shrink-0 flex justify-end px-4 py-3 border-b border-border bg-surface">
        <button
          onClick={handleClose}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="닫기"
        >
          <X size={20} />
        </button>
      </div>

      {/* Report content */}
      <div className="flex-1 min-h-0 flex flex-col max-w-[720px] mx-auto w-full">
        <DiagnosisReport {...props} />
      </div>
    </div>
  );
};
