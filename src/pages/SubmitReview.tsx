import React from 'react';
import { Pencil, Clock } from 'lucide-react';
import { ChoiceHistoryItem } from '../types/simulation';

interface Props {
  choiceHistory: ChoiceHistoryItem[];
  elapsedSeconds: number;
  submitNote: string;
  onNoteChange: (note: string) => void;
  onRollback: (roundId: number) => void;
  onSubmit: () => void;
}

export const SubmitReview: React.FC<Props> = ({
  choiceHistory,
  elapsedSeconds,
  submitNote,
  onNoteChange,
  onRollback,
  onSubmit,
}) => {
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;

  return (
    <div className="flex flex-col h-full bg-base">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden chat-scroll">
        <div className="px-6 pt-8 pb-6 space-y-5">

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              응시를 마쳤습니다.
            </h2>
            <p className="text-sm text-slate-500">최종 제출 전 답변을 확인해보세요.</p>
          </div>

          {/* Choice summary */}
          <div className="bg-surface rounded-2xl overflow-hidden border border-border">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-semibold text-slate-500">라운드별 선택 요약</p>
            </div>
            <div className="divide-y divide-border">
              {choiceHistory.map((item) => (
                <div key={item.roundId} className="flex items-start gap-3 px-4 py-3.5">
                  <div className="shrink-0 mt-0.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
                      {item.roundId}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-slate-400 mb-0.5">{item.roundTitle}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{item.choiceText}</p>
                  </div>
                  <button
                    onClick={() => onRollback(item.roundId)}
                    className="shrink-0 mt-0.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-accent"
                    title="이 라운드 수정"
                  >
                    <Pencil size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Free-text reflection */}
          <div className="bg-surface rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-500 mb-3">
              이번 응시에서 가장 어려웠던 순간은 무엇인가요? <span className="font-normal text-slate-400">(선택)</span>
            </p>
            <textarea
              value={submitNote}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="자유롭게 작성해주세요."
              rows={4}
              className="w-full text-sm text-slate-700 bg-white border border-border rounded-xl px-4 py-3 outline-none focus:border-accent resize-none leading-relaxed placeholder:text-slate-300"
            />
          </div>

          {/* Elapsed time */}
          <div className="flex items-center gap-2 px-1">
            <Clock size={13} className="text-slate-400" />
            <p className="text-xs text-slate-500">
              총 소요 시간: <span className="font-semibold text-slate-700 font-mono">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
            </p>
          </div>

        </div>
      </div>

      {/* Submit CTA */}
      <div className="flex-shrink-0 px-6 py-5">
        <button
          onClick={onSubmit}
          className="w-full py-4 bg-accent hover:opacity-80 text-white font-bold rounded-xl transition-opacity text-sm tracking-wide"
        >
          제출하기
        </button>
      </div>
    </div>
  );
};
