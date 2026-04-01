import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, LayoutList } from 'lucide-react';
import { SlideContent } from '../types/simulation';

interface Props {
  content: SlideContent;
}

export const SlideCard: React.FC<Props> = ({ content }) => {
  const [current, setCurrent] = useState(0);
  const slides = content.slides;
  const slide = slides[current];
  const total = slides.length;

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-slate-50">
        <LayoutList size={14} className="text-purple-500 shrink-0" />
        <span className="text-xs font-semibold text-slate-500 tracking-wide">자료</span>
      </div>

      {/* Slide content */}
      <div className="px-5 py-5 min-h-[140px]">
        <h3 className="text-sm font-bold text-slate-900 mb-4 leading-snug">{slide.title}</h3>

        {slide.bullets && slide.bullets.length > 0 && (
          <ul className="space-y-2 mb-4">
            {slide.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
                <span className="shrink-0 text-slate-300 mt-0.5">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {slide.table && (
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  {slide.table.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-3 py-2 text-left font-semibold text-slate-600 border border-slate-200 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.table.rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-3 py-2 text-slate-700 border border-slate-200 whitespace-nowrap ${
                          cell.startsWith('▼') ? 'text-red-500 font-medium' :
                          cell.startsWith('▲') ? 'text-emerald-600 font-medium' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {slide.note && (
          <p className="mt-4 text-xs text-slate-400 leading-relaxed">{slide.note}</p>
        )}
      </div>

      {/* Navigation */}
      {total > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-slate-50">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} className="text-slate-500" />
          </button>
          <span className="text-xs text-slate-500 font-medium">
            {current + 1} / {total}
          </span>
          <button
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            disabled={current === total - 1}
            className="p-1.5 rounded-lg hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={14} className="text-slate-500" />
          </button>
        </div>
      )}
    </div>
  );
};
