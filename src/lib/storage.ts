import {
  UserAccount,
  PatternProfile,
  CompletedQuiz,
  TraitKey,
  TraitScore,
} from "@/types";

const STORAGE_KEY = "pattern_check_account";

export const TRAIT_LABELS: Record<TraitKey, string> = {
  selfAwareness: "Self-Awareness",
  empathy: "Empathy",
  defensiveness: "Defensiveness",
  conflictAvoidance: "Conflict Avoidance",
  boundaryStrength: "Boundary Strength",
  pleasingTendency: "People-Pleasing",
  socialPerception: "Social Perception",
  biasAwareness: "Bias Awareness",
  emotionalAvailability: "Emotional Availability",
  attachmentSecurity: "Attachment Security",
  accountability: "Accountability",
  communicationDirectness: "Communication Directness",
};

function createDefaultProfile(userId: string): PatternProfile {
  return {
    userId,
    traits: {},
    completedQuizzes: [],
    profileConfidence: 0,
    confidenceLevel: "starter",
    strongestPatterns: [],
    growthAreas: [],
    lastUpdated: new Date().toISOString(),
  };
}

export function createAccount(username: string): UserAccount {
  const id = crypto.randomUUID();
  const account: UserAccount = {
    id,
    username,
    createdAt: new Date().toISOString(),
    profile: createDefaultProfile(id),
  };
  saveAccount(account);
  return account;
}

export function getAccount(): UserAccount | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserAccount;
  } catch {
    return null;
  }
}

export function saveAccount(account: UserAccount): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
}

export function deleteAccount(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Add a completed quiz to the profile and update trait scores
 */
export function addCompletedQuiz(
  account: UserAccount,
  completedQuiz: CompletedQuiz
): UserAccount {
  const profile = { ...account.profile };

  // Check if this quiz was already taken (update, don't duplicate)
  const existingIdx = profile.completedQuizzes.findIndex(
    (q) => q.id === completedQuiz.id
  );
  if (existingIdx >= 0) {
    profile.completedQuizzes[existingIdx] = completedQuiz;
  } else {
    profile.completedQuizzes = [...profile.completedQuizzes, completedQuiz];
  }

  // Update trait scores
  const updatedTraits = { ...profile.traits };
  Object.entries(completedQuiz.traitDeltas).forEach(([key, delta]) => {
    const traitKey = key as TraitKey;
    const existing = updatedTraits[traitKey];
    const currentScore = existing?.score ?? 50;
    const currentConfidence = existing?.confidence ?? 0;

    // Clamp delta to [-10, 10] range
    const clampedDelta = Math.max(-10, Math.min(10, delta ?? 0));
    const newScore = Math.max(0, Math.min(100, currentScore + clampedDelta * 2));
    const newConfidence = Math.min(100, currentConfidence + 5);

    updatedTraits[traitKey] = {
      key: traitKey,
      label: TRAIT_LABELS[traitKey],
      score: newScore,
      confidence: newConfidence,
      lastUpdated: new Date().toISOString(),
    };
  });

  profile.traits = updatedTraits;

  // Recalculate profile confidence
  const count = profile.completedQuizzes.length;
  let profileConfidence: number;
  let confidenceLevel: PatternProfile["confidenceLevel"];

  if (count <= 2) {
    profileConfidence = Math.min(25, count * 12);
    confidenceLevel = "starter";
  } else if (count <= 5) {
    profileConfidence = 25 + (count - 2) * 10;
    confidenceLevel = "developing";
  } else if (count <= 10) {
    profileConfidence = 55 + (count - 5) * 5;
    confidenceLevel = "strong";
  } else {
    profileConfidence = Math.min(100, 80 + (count - 10) * 2);
    confidenceLevel = "deep";
  }

  profile.profileConfidence = profileConfidence;
  profile.confidenceLevel = confidenceLevel;

  // Update strongest patterns and growth areas
  const traitScores = Object.values(updatedTraits) as TraitScore[];

  // Traits above 65 are strengths
  const strengths = traitScores
    .filter((t) => t.score >= 65 && t.confidence >= 15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((t) => t.label);

  // Traits below 40 are growth areas
  const growthAreas = traitScores
    .filter((t) => t.score < 40 && t.confidence >= 15)
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map((t) => t.label);

  profile.strongestPatterns = strengths;
  profile.growthAreas = growthAreas;
  profile.lastUpdated = new Date().toISOString();

  const updated: UserAccount = { ...account, profile };
  saveAccount(updated);
  return updated;
}

export function deleteQuizResult(account: UserAccount, quizId: string): UserAccount {
  const profile = { ...account.profile };
  profile.completedQuizzes = profile.completedQuizzes.filter((q) => q.id !== quizId);

  // Recalculate profile
  const count = profile.completedQuizzes.length;
  let profileConfidence: number;
  let confidenceLevel: PatternProfile["confidenceLevel"];

  if (count === 0) {
    profileConfidence = 0;
    confidenceLevel = "starter";
  } else if (count <= 2) {
    profileConfidence = Math.min(25, count * 12);
    confidenceLevel = "starter";
  } else if (count <= 5) {
    profileConfidence = 25 + (count - 2) * 10;
    confidenceLevel = "developing";
  } else if (count <= 10) {
    profileConfidence = 55 + (count - 5) * 5;
    confidenceLevel = "strong";
  } else {
    profileConfidence = Math.min(100, 80 + (count - 10) * 2);
    confidenceLevel = "deep";
  }

  profile.profileConfidence = profileConfidence;
  profile.confidenceLevel = confidenceLevel;
  profile.lastUpdated = new Date().toISOString();

  const updated: UserAccount = { ...account, profile };
  saveAccount(updated);
  return updated;
}

export function getConfidenceLevelLabel(level: PatternProfile["confidenceLevel"]): string {
  const labels: Record<PatternProfile["confidenceLevel"], string> = {
    starter: "Starter Profile",
    developing: "Developing Profile",
    strong: "Strong Profile",
    deep: "Deep Profile",
  };
  return labels[level];
}

export function getConfidenceLevelColor(level: PatternProfile["confidenceLevel"]): string {
  const colors: Record<PatternProfile["confidenceLevel"], string> = {
    starter: "text-slate-500",
    developing: "text-blue-500",
    strong: "text-purple-600",
    deep: "text-indigo-700",
  };
  return colors[level];
}

/**
 * Get recommended quizzes based on profile
 */
export function getRecommendedQuizSlugs(account: UserAccount): string[] {
  const taken = new Set(account.profile.completedQuizzes.map((q) => q.quizSlug));
  const allSlugs = [
    "am-i-the-problem",
    "is-my-friend-toxic",
    "preference-or-bias",
    "microaggression-checker",
    "racial-blind-spots",
    "am-i-gay-bi-curious",
    "does-my-friend-like-me",
    "is-this-a-situationship",
    "are-we-compatible",
    "am-i-overreacting",
    "should-i-confront-them",
    "friendship-one-sided",
    "do-i-people-please",
    "am-i-ready-to-date",
    "is-this-moving-too-fast",
  ];
  return allSlugs.filter((s) => !taken.has(s)).slice(0, 4);
}

const LAST_QUIZ_SESSION_KEY = "pattern_check_last_quiz_session";

export type LastQuizSession = {
  slug: string;
  title: string;
  updatedAt: string;
};

/** Called when the user enters the question flow so Home / History can deep-link. */
export function setLastQuizSession(slug: string, title: string): void {
  if (typeof window === "undefined") return;
  const payload: LastQuizSession = {
    slug,
    title,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(LAST_QUIZ_SESSION_KEY, JSON.stringify(payload));
}

export function getLastQuizSession(): LastQuizSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_QUIZ_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LastQuizSession;
    if (!parsed?.slug?.trim() || !parsed?.title?.trim()) return null;
    return parsed;
  } catch {
    return null;
  }
}
