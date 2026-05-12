import type { Quiz } from "@/types";

/**
 * New tests belong in `src/lib/quizzes.ts` (append to `QUIZZES`).
 * Copy structure from an existing entry there — not exported from this file.
 */
export const quizTemplate: Quiz = {
  slug: "new-test-slug",
  title: "New Test Title",
  category: "conflict",
  description: "What this test helps someone reflect on.",
  hasObserverMode: false,
  isIdentityQuiz: false,
  estimatedMinutes: 5,
  tags: ["reflection"],
  traitWeights: { selfAwareness: 1 },
  questions: [
    {
      id: "q1",
      selfText: "Question in first person.",
      observerText: "Same question about someone else (if you use observer mode).",
      options: [
        { id: "a", text: "Example option", score: 0, traitDeltas: { selfAwareness: 1 } },
        { id: "b", text: "Higher score moves result toward higher levels", score: 2, traitDeltas: {} },
      ],
    },
  ],
  results: [
    {
      level: 1,
      label: "Low concern",
      description: "What this band suggests.",
      nextSteps: ["Concrete next step"],
    },
    {
      level: 2,
      label: "Mild pattern",
      description: "",
      nextSteps: [],
    },
    {
      level: 3,
      label: "Mixed",
      description: "",
      nextSteps: [],
    },
    {
      level: 4,
      label: "Strong pattern",
      description: "",
      nextSteps: [],
    },
    {
      level: 5,
      label: "High concern",
      description: "",
      nextSteps: [],
    },
  ],
};
