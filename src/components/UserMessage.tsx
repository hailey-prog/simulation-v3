import React from 'react';
import { Pencil } from 'lucide-react';

interface Props {
  text: string;
  onEdit?: () => void;
}

export const UserMessage: React.FC<Props> = ({ text, onEdit }) => (
  <div className="flex justify-end animate-fadeIn">
    <div className="max-w-[75%] bg-userBubble text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
      {text}
      {onEdit && (
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="inline-flex items-center justify-center ml-2 opacity-50 hover:opacity-100 transition-opacity align-middle relative -top-px"
          title="선택 수정"
        >
          <Pencil size={12} className="text-white" />
        </button>
      )}
    </div>
  </div>
);
