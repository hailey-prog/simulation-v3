import React from 'react';
import { FileText } from 'lucide-react';
import { DocumentContent } from '../types/simulation';

interface Props {
  content: DocumentContent;
  typedBody?: string;  // if provided, show as plain text while typing
  bodyTyping?: boolean;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith('## ')) {
      nodes.push(
        <h3 key={i} className="text-xs font-bold text-slate-700 mt-4 mb-1.5 uppercase tracking-wide">
          {line.slice(3)}
        </h3>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      nodes.push(
        <h4 key={i} className="text-xs font-semibold text-slate-600 mt-3 mb-1">
          {line.slice(4)}
        </h4>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      nodes.push(<hr key={i} className="border-slate-100 my-3" />);
      i++;
      continue;
    }

    // Table: collect all consecutive table rows
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      // Filter separator rows (---|---)
      const dataRows = tableLines.filter((l) => !/^\|[\s\-|]+\|$/.test(l));
      if (dataRows.length > 0) {
        const parseRow = (l: string) =>
          l
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim());
        const [headerRow, ...bodyRows] = dataRows;
        nodes.push(
          <div key={`table-${i}`} className="overflow-x-auto my-2">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  {parseRow(headerRow).map((h, ci) => (
                    <th key={ci} className="px-2.5 py-1.5 text-left font-semibold text-slate-600 border border-slate-200 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    {parseRow(row).map((cell, ci) => (
                      <td key={ci} className="px-2.5 py-1.5 text-slate-700 border border-slate-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      nodes.push(
        <p key={i} className="text-xs text-slate-500 italic border-l-2 border-slate-200 pl-2.5 my-1 leading-relaxed">
          {line.slice(2)}
        </p>
      );
      i++;
      continue;
    }

    // List item
    if (line.startsWith('- ') || line.startsWith('* ')) {
      nodes.push(
        <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
          <span className="shrink-0 text-slate-300 mt-0.5">•</span>
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      nodes.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Normal paragraph
    nodes.push(
      <p key={i} className="text-xs text-slate-600 leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return nodes;
}

function renderInline(text: string): React.ReactNode {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-slate-800">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export const DocumentCard: React.FC<Props> = ({ content, typedBody, bodyTyping }) => {
  const isTypingMode = typedBody !== undefined;

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 px-4 py-3 border-b border-border bg-slate-50">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={14} className="text-slate-400 shrink-0" />
          <span className="text-sm font-semibold text-slate-800 leading-snug truncate">{content.title}</span>
        </div>
        {(content.author || content.date) && (
          <div className="shrink-0 text-right">
            {content.author && <p className="text-[11px] text-slate-400 leading-snug">{content.author}</p>}
            {content.date && <p className="text-[11px] text-slate-400 leading-snug">{content.date}</p>}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-4 py-4 max-h-80 overflow-y-auto min-h-[3rem]">
        {isTypingMode ? (
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
            {typedBody}
            {bodyTyping && <span className="typing-cursor" />}
          </p>
        ) : (
          renderMarkdown(content.body)
        )}
      </div>
    </div>
  );
};
