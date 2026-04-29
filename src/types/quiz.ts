export type QuizMode = "self" | "observer";

export type TraitKey =
  | "selfAwareness"
  | "empathy"
  | "defensiveness"
  | "conflictAvoidance"
  | "boundaryStrength"
  | "peoplePleasing"
  | "socialPerception"
  | "biasAwareness"
  | "emotionalAvailability"
  | "attachmentSecurity"
  | "accountability"
  | "communicationDirectness";

export type QuizCategory =
  | "Conflict & Communication"
  | "Friendship"
  | "Bias & Awareness"
  | "Identity & Attraction"
  | "Dating & Relationships"
  | "Compatibility";

export type QuizResultLevel = string;

export type ResultEffect = Partial<Record<TraitKey, number>>;

export interface QuizAnswer {
  id: string;
  label: string;
  value: number;
  traitEffects: ResultEffect;
  resultEffects?: ResultEffect;
}

export interface QuizQuestion {
  id: string;
  textSelf: string;
  textObserver: string;
  helperText?: string;
  answers: QuizAnswer[];
}

export interface QuizResultBand {
  id: string;
  minScore: number;
  maxScore: number;
  title: string;
  level: string;
  summary: string;
  whatThisMeans: string;
  whatThisDoesNotMean: string;
  patterns: string[];
  nextSteps: string[];
  profileImpact: {
    traits: TraitKey[];
    note: string;
  };
  recommendedPatternChecks: string[];
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  category: QuizCategory;
  categoryIcon: string;
  shortDescription: string;
  longDescription: string;
  estimatedTime: string;
  supportsModes: boolean;
  availableModes: QuizMode[];
  tags: string[];
  questions: QuizQuestion[];
  scoring: {
    maxScorePerQuestion: number;
  };
  resultBands: QuizResultBand[];
  traitImpacts: TraitKey[];
  startPageTraits: string[];
  comingSoon?: boolean;
}
