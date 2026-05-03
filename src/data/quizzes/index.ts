// Quiz registry — all quizzes live in src/lib/quizzes.ts.
// To add a new test: add it to the QUIZZES array there.
// It will automatically appear on All Tests, get a start page,
// run through the quiz engine, and update the Pattern Profile.
export {
  QUIZZES as QUIZ_REGISTRY,
  getQuizBySlug,
  getQuizzesByCategory,
  CATEGORY_INFO,
} from "@/lib/quizzes";
