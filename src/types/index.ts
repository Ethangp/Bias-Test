// Core quiz types

export type QuizMode = "self" | "observer";

export type ObserverTarget =
  | "friend"
  | "partner"
  | "hookup"
  | "roommate"
  | "family"
  | "coworker"
  | "other";

export type TraitKey =
  | "selfAwareness"
  | "empathy"
  | "defensiveness"
  | "conflictAvoidance"
  | "boundaryStrength"
  | "pleasingTendency"
  | "socialPerception"
  | "biasAwareness"
  | "emotionalAvailability"
  | "attachmentSecurity"
  | "accountability"
  | "communicationDirectness";

export type QuizCategory =
  | "bias"
  | "identity"
  | "compatibility"
  | "friendship"
  | "dating"
  | "social"
  | "conflict"
  | "values"
  | "family"
  | "work";

export type ResultLevel =
  | 1 // Low Concern
  | 2 // Mild Pattern
  | 3 // Mixed / Unclear
  | 4 // Strong Pattern
  | 5; // High Concern

export type IdentityResultLevel =
  | "probably_not"
  | "maybe"
  | "worth_exploring"
  | "strong_signs"
  | "only_you_can_define";

export interface AnswerOption {
  id: string;
  text: string;
  traitDeltas: Partial<Record<TraitKey, number>>;
  score: number; // 0-4, used for level calculation
}

export interface Question {
  id: string;
  selfText: string;
  observerText: string;
  options: AnswerOption[];
}

export interface ResultRange {
  level: ResultLevel | IdentityResultLevel;
  label: string;
  description: string;
  nextSteps: string[];
  traitInsight?: string;
}

export interface Quiz {
  slug: string;
  title: string;
  observerTitle?: string;
  category: QuizCategory;
  description: string;
  observerDescription?: string;
  hasObserverMode: boolean;
  isIdentityQuiz: boolean;
  questions: Question[];
  traitWeights: Partial<Record<TraitKey, number>>;
  results: ResultRange[];
  disclaimer?: string;
  estimatedMinutes: number;
  tags: string[];
}

// Profile types

export interface TraitScore {
  key: TraitKey;
  label: string;
  score: number; // 0-100
  confidence: number; // 0-100, based on how many data points
  lastUpdated: string; // ISO date
}

export interface CompletedQuiz {
  id: string; // uuid
  quizSlug: string;
  quizTitle: string;
  mode: QuizMode;
  observerTarget?: ObserverTarget;
  answers: Record<string, string>; // questionId -> answerId
  resultLevel: ResultLevel | IdentityResultLevel;
  resultLabel: string;
  traitDeltas: Partial<Record<TraitKey, number>>;
  completedAt: string; // ISO date
}

export interface PatternProfile {
  userId: string;
  traits: Partial<Record<TraitKey, TraitScore>>;
  completedQuizzes: CompletedQuiz[];
  profileConfidence: number; // 0-100
  confidenceLevel: "starter" | "developing" | "strong" | "deep";
  strongestPatterns: string[];
  growthAreas: string[];
  lastUpdated: string;
}

export interface UserAccount {
  id: string;
  username: string;
  createdAt: string;
  profile: PatternProfile;
}
