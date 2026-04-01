import React from 'react';
import { Mail, Paperclip } from 'lucide-react';
import { EmailContent } from '../types/simulation';

interface Props {
  content: EmailContent;
  typedBody?: string;  // if provided, shows this instead of content.body
  bodyTyping?: boolean; // show cursor at end
}

export const EmailCard: React.FC<Props> = ({ content, typedBody, bodyTyping }) => {
  const bodyToShow = typedBody !== undefined ? typedBody : content.body;
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-slate-50">
        <Mail size={14} className="text-indigo-500 shrink-0" />
        <span className="text-xs font-semibold text-slate-500 tracking-wide">이메일</span>
      </div>

      {/* Meta */}
      <div className="px-4 pt-4 pb-3 space-y-1.5 border-b border-slate-100">
        <MetaRow label="From" value={content.from} />
        <MetaRow label="To" value={content.to} />
        <MetaRow label="Date" value={content.date} />
        <div className="pt-1">
          <span className="text-sm font-semibold text-slate-900">{content.subject}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4 min-h-[3rem]">
        <p className="text-sm text-slate-700 leading-[1.8] whitespace-pre-wrap">
          {bodyToShow}
          {bodyTyping && <span className="typing-cursor" />}
        </p>
      </div>

      {/* Attachments */}
      {content.attachments && content.attachments.length > 0 && (
        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {content.attachments.map((file, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-600"
            >
              <Paperclip size={11} className="text-slate-400" />
              {file}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MetaRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-2 text-xs">
    <span className="shrink-0 w-9 text-slate-400 font-medium">{label}</span>
    <span className="text-slate-600 break-all">{value}</span>
  </div>
);
