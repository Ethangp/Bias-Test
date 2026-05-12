import type { Quiz } from "@/types";
import { QUIZZES, getQuizBySlug as getQuizFromLib } from "@/lib/quizzes";

/** Single source of truth: quiz definitions live in `@/lib/quizzes`. */
export const QUIZ_REGISTRY: Quiz[] = QUIZZES;

export function getQuizBySlug(slug: string): Quiz | undefined {
  return getQuizFromLib(slug);
}

export function getQuizCategories(): string[] {
  return Array.from(new Set(QUIZ_REGISTRY.map((quiz) => quiz.category)));
}
