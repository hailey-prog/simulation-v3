import React from 'react';
import { SituationType } from '../types/simulation';

interface Props {
  roundId: number;
  title: string;
  situationType?: SituationType;
}

export const RoundBadge: React.FC<Props> = ({ roundId, title }) => (
  <div className="flex flex-col gap-1.5 mb-2">
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold text-accent tracking-widest uppercase">문항 {roundId}</span>
    </div>
    <p className="text-[15px] font-bold text-slate-900 leading-snug">{title}</p>
  </div>
);
