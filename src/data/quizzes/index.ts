import type { Quiz } from "@/types/quiz";
import { amITheProblemQuiz } from "./am-i-the-problem";
import { amIOverreactingQuiz } from "./am-i-overreacting";
import { isMyFriendToxicQuiz } from "./is-my-friend-toxic";
import { isThisAPreferenceOrBiasQuiz } from "./is-this-a-preference-or-bias";

// New quiz files should be added here as the platform expands.
// The quiz engine should consume this registry instead of hardcoding pages.
export const QUIZ_REGISTRY: Quiz[] = [
  amITheProblemQuiz,
  isMyFriendToxicQuiz,
  isThisAPreferenceOrBiasQuiz,
  amIOverreactingQuiz,
];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return QUIZ_REGISTRY.find((quiz) => quiz.slug === slug);
}

export function getQuizCategories(): string[] {
  return Array.from(new Set(QUIZ_REGISTRY.map((quiz) => quiz.category)));
}
