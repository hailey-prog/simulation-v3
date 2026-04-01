interface Props {
  onViewReport: () => void;
}

export function SessionEndModal({ onViewReport }: Props) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-5 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-end-title"
    >
      <div className="w-full max-w-[400px] rounded-2xl bg-white shadow-xl border border-border p-6 space-y-4">
        <div className="space-y-2">
          <div className="text-2xl">⏰</div>
          <h2 id="session-end-title" className="text-lg font-bold text-slate-900">
            시간이 초과되었습니다
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            지금까지의 선택을 기반으로 진단 리포트를 확인하세요.
          </p>
        </div>
        <button
          type="button"
          onClick={onViewReport}
          className="w-full py-3.5 bg-accent hover:opacity-90 text-white font-bold rounded-xl transition-opacity text-sm"
        >
          리포트 확인하기
        </button>
      </div>
    </div>
  );
}
