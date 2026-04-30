import type { Quiz } from "@/types";
import {
  QUIZZES,
  getQuizBySlug as getQuizBySlugFromLib,
} from "@/lib/quizzes";

// The canonical quiz registry lives in src/lib/quizzes.ts and uses the
// schema declared in src/types/index.ts. This module re-exports it so
// pages can import a single, consistent registry.
export const QUIZ_REGISTRY: Quiz[] = QUIZZES;

export function getQuizBySlug(slug: string): Quiz | undefined {
  return getQuizBySlugFromLib(slug);
}

export function getQuizCategories(): string[] {
  return Array.from(new Set(QUIZ_REGISTRY.map((quiz) => quiz.category)));
}
