import React, { useState, useRef } from 'react';
import { IntroData } from '../types/simulation';
import { Clock, Target, LayoutGrid, Zap, Pencil, Check } from 'lucide-react';

interface Props {
  intro: IntroData;
  playerName: string;
  onNameChange: (name: string) => void;
  onStart: () => void;
}

function renderIntroBackground(text: string): React.ReactNode {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export const IntroScreen: React.FC<Props> = ({ intro, playerName, onNameChange, onStart }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(playerName);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setDraft(playerName);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const confirmEdit = () => {
    const trimmed = draft.trim();
    if (trimmed) onNameChange(trimmed);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') confirmEdit();
    if (e.key === 'Escape') setEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-base">
      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden chat-scroll">
        <div className="px-6 pt-8 pb-6 space-y-4">

          {/* Title block */}
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold text-slate-500 tracking-widest">시뮬레이션 진단</p>
            <h1 className="text-[27px] font-bold text-slate-900 leading-tight">{intro.title}</h1>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
                <Clock size={11} className="text-blue-800" />
                {intro.timeLimitMinutes}분
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
                <Target size={11} className="text-blue-800" />
                {intro.totalRounds}문항
              </span>
            </div>
          </div>

          {/* Background */}
          <div className="bg-surface rounded-2xl p-5">
            <div className="flex items-center gap-1.5 mb-3">
              <LayoutGrid size={13} className="text-slate-400" />
              <p className="text-xs font-semibold text-slate-500">배경 설명</p>
            </div>
            <p className="text-sm text-slate-600 leading-[1.75] whitespace-pre-wrap">
              {renderIntroBackground(intro.background)}
            </p>
          </div>

          {/* Goal */}
          <div className="bg-surface rounded-2xl p-5">
            <div className="flex items-center gap-1.5 mb-3">
              <Target size={13} className="text-slate-400" />
              <p className="text-xs font-semibold text-slate-500">목표</p>
            </div>
            <p className="text-[15px] font-bold text-slate-900 leading-snug">{intro.goal}</p>
          </div>

          {/* Tasks */}
          <div className="bg-surface rounded-2xl p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <Zap size={13} className="text-slate-400" />
              <p className="text-xs font-semibold text-slate-500">주요 과제</p>
            </div>
            <ul className="space-y-3">
              {intro.tasks.map((task, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-700 font-medium leading-[1.6]">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2 px-1">진단 역량</p>
            <div className="flex flex-wrap gap-2">
              {intro.skills.map((skill, i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-surface border border-border text-slate-500">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Player name */}
          <div className="bg-surface rounded-2xl p-5">
            <p className="text-xs font-semibold text-slate-500 mb-3">응시자 이름</p>
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={confirmEdit}
                  className="flex-1 text-sm font-semibold text-slate-900 bg-white border border-accent rounded-lg px-3 py-2 outline-none"
                  maxLength={20}
                />
                <button
                  onClick={confirmEdit}
                  className="p-2 rounded-lg bg-accent text-white hover:opacity-80 transition-opacity"
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={startEdit}
                className="flex items-center gap-2 group"
              >
                <span className="text-sm font-semibold text-slate-900">{playerName}</span>
                <Pencil size={13} className="text-slate-400 group-hover:text-accent transition-colors" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="flex-shrink-0 px-6 py-5">
        <button
          onClick={onStart}
          className="w-full py-4 bg-accent hover:opacity-80 text-white font-bold rounded-xl transition-opacity text-sm tracking-wide"
        >
          시뮬레이션 시작하기
        </button>
      </div>
    </div>
  );
};
