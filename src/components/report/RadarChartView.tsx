import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { CompetencyScores } from '../../types/simulation';

interface Props {
  percentages: CompetencyScores;
  labels: Record<keyof CompetencyScores, string>;
}

export const RadarChartView: React.FC<Props> = ({ percentages, labels }) => {
  const data = (Object.keys(percentages) as (keyof CompetencyScores)[]).map((key) => ({
    subject: labels[key],
    value: percentages[key],
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#e2e6f0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#64748b', fontSize: 12 }}
        />
        <Radar
          name="역량"
          dataKey="value"
          stroke="#232334"
          fill="#232334"
          fillOpacity={0.12}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
