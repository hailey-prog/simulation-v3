import type { ChoiceHistoryItem, CompetencyScores } from './simulation';

/** Passed via `react-router` location state to `/report`. */
export interface ReportPageState {
  percentages: CompetencyScores;
  overall: number;
  history: ChoiceHistoryItem[];
  labels: Record<keyof CompetencyScores, string>;
  timeExpired: boolean;
  totalRounds: number;
}
