import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DiagnosisReport } from '../components/report/DiagnosisReport';
import type { ReportPageState } from '../types/reportNavigation';

export function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ReportPageState | null;

  useEffect(() => {
    if (!state?.percentages) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state?.percentages) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center text-sm text-slate-500">
        이동 중…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <header className="shrink-0 border-b border-border bg-surface/90 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[720px] px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="시뮬레이션으로 돌아가기"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-medium text-slate-500">시뮬레이션</span>
        </div>
      </header>
      <div className="flex-1 min-h-0 flex flex-col max-w-[720px] mx-auto w-full">
        <DiagnosisReport
          percentages={state.percentages}
          overall={state.overall}
          history={state.history}
          labels={state.labels}
          timeExpired={state.timeExpired}
          totalRounds={state.totalRounds}
        />
      </div>
    </div>
  );
}
