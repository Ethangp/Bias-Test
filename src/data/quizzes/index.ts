// Quiz registry — all quizzes live in lib/quizzes.ts.
// To add a new quiz: add it to lib/quizzes.ts QUIZZES array and it will automatically
// appear on All Tests, get a start page, run through the quiz engine, and update the profile.
export {
  QUIZZES as QUIZ_REGISTRY,
  getQuizBySlug,
  getQuizzesByCategory,
  CATEGORY_INFO,
} from "@/lib/quizzes";

export { QUIZZES } from "@/lib/quizzes";

import { QUIZZES } from "@/lib/quizzes";

export function getQuizCategories(): string[] {
  return Array.from(new Set(QUIZZES.map((quiz) => quiz.category)));
}
