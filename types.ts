
export type Language = 'vi' | 'en';

export interface RegionData {
  id: string;
  name: string;
  shortDescription: string;
  coordinates: { top: string; left: string }; // Percentage for CSS positioning
}

export interface Milestone {
  year: string;
  event: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-3
  explanation: string;
}

export interface RegionContentResponse {
  history: string;
  contribution: string;
  meaning: string;
  milestones: Milestone[];
}

export enum RegionID {
  UN = 'UN',
  ASEAN = 'ASEAN',
  APEC = 'APEC',
  EU = 'EU',
  AFRICA = 'AFRICA'
}
