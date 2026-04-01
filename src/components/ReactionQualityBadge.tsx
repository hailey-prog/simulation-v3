import React from 'react';
import { ChoiceQuality } from '../types/simulation';

const badgeStyles: Record<ChoiceQuality, string> = {
  optimal: 'bg-blue-100 text-blue-700 border-blue-200',
  suboptimal: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  poor: 'bg-red-100 text-red-600 border-red-200',
};

const fullLabels: Record<ChoiceQuality, string> = {
  optimal: '최적 선택',
  suboptimal: '보통 선택',
  poor: '미흡한 선택',
};

const shortLabels: Record<ChoiceQuality, string> = {
  optimal: '최적',
  suboptimal: '보통',
  poor: '미흡',
};

interface Props {
  quality: ChoiceQuality;
  variant?: 'full' | 'short';
}

export const ReactionQualityBadge: React.FC<Props> = ({ quality, variant = 'full' }) => (
  <span
    className={`inline-flex items-center text-[11px] px-2 py-0.5 rounded-full border font-semibold shrink-0 ${badgeStyles[quality]}`}
  >
    {variant === 'full' ? fullLabels[quality] : shortLabels[quality]}
  </span>
);
