import type { TraitKey, QuizMode } from "./index";

export interface TraitScore {
  key: TraitKey;
  label: string;
  score: number;
  confidence: number;
  lastUpdated: string;
}

export interface CompletedQuizAttempt {
  id: string;
  quizId: string;
  quizSlug: string;
  quizTitle: string;
  mode: QuizMode;
  selectedMode: QuizMode;
  answers: Record<string, string>;
  resultBandId: string;
  resultTitle: string;
  resultLevel: string;
  traitEffects: Partial<Record<TraitKey, number>>;
  saved: boolean;
  completedAt: string;
}

export interface PatternProfile {
  userId: string;
  displayName: string;
  traits: Partial<Record<TraitKey, TraitScore>>;
  completedAttempts: CompletedQuizAttempt[];
  profileConfidence: number;
  confidenceLevel: "starter" | "developing" | "strong" | "deep";
  strongestPatterns: string[];
  growthAreas: string[];
  lastUpdated: string;
}

export interface UserProfileState {
  id: string;
  displayName: string;
  createdAt: string;
  profile: PatternProfile;
}
