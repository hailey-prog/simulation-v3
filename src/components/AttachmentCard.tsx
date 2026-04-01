import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Paperclip, FileText, Sheet, Image, File, X, ChevronRight } from 'lucide-react';
import { AttachmentContent } from '../types/simulation';
import { DocumentCard } from './DocumentCard';

interface Props {
  content: AttachmentContent;
}

const fileTypeIcon = {
  pdf: FileText,
  doc: FileText,
  xls: Sheet,
  img: Image,
};

const fileTypeLabel = {
  pdf: 'PDF',
  doc: 'DOC',
  xls: 'XLS',
  img: 'IMG',
};

const fileTypeColor = {
  pdf: 'text-red-500',
  doc: 'text-blue-500',
  xls: 'text-emerald-600',
  img: 'text-purple-500',
};

export const AttachmentCard: React.FC<Props> = ({ content }) => {
  const [openFileIdx, setOpenFileIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const openFile = (idx: number) => {
    setOpenFileIdx(idx);
    setActiveTab(idx);
  };

  const closePanel = () => setOpenFileIdx(null);

  const isOpen = openFileIdx !== null;

  return (
    <>
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-slate-50">
          <Paperclip size={14} className="text-slate-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-500 tracking-wide">첨부파일</span>
        </div>

        {/* File list */}
        <div className="px-3 py-3 flex flex-col gap-2">
          {content.files.map((file, idx) => {
            const Icon = fileTypeIcon[file.fileType] ?? File;
            const color = fileTypeColor[file.fileType] ?? 'text-slate-400';
            const label = fileTypeLabel[file.fileType] ?? file.fileType.toUpperCase();

            return (
              <button
                key={idx}
                onClick={() => openFile(idx)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-left group"
              >
                <div className={`shrink-0 ${color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{label} 문서</p>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-xs text-slate-400 group-hover:text-accent transition-colors">
                  <span>열어보기</span>
                  <ChevronRight size={12} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel portal */}
      {createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[200] transition-opacity duration-300"
            style={{
              background: 'rgba(0,0,0,0.25)',
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
            }}
            onClick={closePanel}
          />

          {/* Sliding panel */}
          <div
            className="fixed top-0 right-0 h-full z-[201] flex flex-col bg-white shadow-2xl border-l border-border"
            style={{
              width: 'min(480px, 100vw)',
              transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border shrink-0 bg-white">
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <Paperclip size={14} className="text-slate-400 shrink-0" />
                {content.files.length > 1 ? (
                  <div className="flex gap-1 overflow-x-auto">
                    {content.files.map((f, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`shrink-0 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          activeTab === idx
                            ? 'bg-accent text-white'
                            : 'text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-slate-800 truncate">
                    {content.files[0]?.name}
                  </span>
                )}
              </div>
              <button
                onClick={closePanel}
                className="shrink-0 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={16} className="text-slate-500" />
              </button>
            </div>

            {/* Panel body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5">
              {isOpen && (
                <DocumentCard
                  content={{
                    type: 'document',
                    title: content.files[activeTab]?.name ?? '',
                    body: content.files[activeTab]?.preview ?? '',
                  }}
                />
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};
