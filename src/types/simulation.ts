export type SituationType = '긴급' | '협업' | '의사결정' | '위기' | '전략' | '성찰';
export type ChoiceQuality = 'optimal' | 'suboptimal' | 'poor';
export type CompetencyKey = 'user' | 'collaboration' | 'decision' | 'business';
export type SimulationPhase = 'intro' | 'running' | 'submit-review' | 'outro';
export type MessageType = 'system-scenario' | 'user-choice';
export type SituationContentType = 'plain' | 'email' | 'slide' | 'document' | 'attachment';

export interface CompetencyScores {
  user: number;
  collaboration: number;
  decision: number;
  business: number;
}

export interface PlainContent {
  type: 'plain';
  text: string;
}

export interface EmailContent {
  type: 'email';
  from: string;
  to: string;
  date: string;
  subject: string;
  body: string;
  attachments?: string[];
}

export interface SlideContent {
  type: 'slide';
  slides: Array<{
    title: string;
    bullets?: string[];
    table?: { headers: string[]; rows: string[][] };
    note?: string;
  }>;
}

export interface DocumentContent {
  type: 'document';
  title: string;
  author?: string;
  date?: string;
  body: string;
}

export interface AttachmentContent {
  type: 'attachment';
  files: Array<{
    name: string;
    fileType: 'pdf' | 'doc' | 'xls' | 'img';
    preview: string;
  }>;
}

export type SituationContent =
  | PlainContent
  | EmailContent
  | SlideContent
  | DocumentContent
  | AttachmentContent;

export interface Choice {
  id: string;
  text: string;
  branchKey: string;
  scores: CompetencyScores;
  quality: ChoiceQuality;
}

export interface Round {
  id: number;
  situationType: SituationType;
  title: string;
  content: SituationContent;
  branchedContent?: Record<string, SituationContent>;
  question: string;
  choices: Choice[];
}

export interface OutroTierContent {
  closing: string;
  goalAchievement: string;
  goalScore: string;
  characterReactions: Record<string, string>;
  competencyFeedback: Record<CompetencyKey, string>;
}

export interface OutroData {
  goalLabel: string;
  characters: string[];
  tiers: {
    high: OutroTierContent;
    mid: OutroTierContent;
    low: OutroTierContent;
  };
}

export interface IntroData {
  title: string;
  background: string;
  character: { name: string; role: string; organization: string };
  goal: string;
  tasks: string[];
  skills: string[];
  totalRounds: number;
  timeLimitMinutes: number;
}

export interface SimulationData {
  id: string;
  intro: IntroData;
  outro: OutroData;
  rounds: Round[];
  competencyLabels: Record<CompetencyKey, string>;
}

export interface ChatMessage {
  id: string;
  type: MessageType;
  roundId?: number;
  situationContent?: SituationContent;
  question?: string;
  choiceText?: string;
  situationType?: SituationType;
  roundTitle?: string;
  isTyping: boolean;
}

export interface ChoiceHistoryItem {
  roundId: number;
  roundTitle: string;
  choiceId: string;
  choiceText: string;
  scores: CompetencyScores;
  quality: ChoiceQuality;
}
