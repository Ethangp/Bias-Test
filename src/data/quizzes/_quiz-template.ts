import type { Quiz } from "@/types/quiz";

// Copy this file when adding a new test.
// Replace placeholder ids, text, tags, scoring, and result bands.
export const quizTemplate: Quiz = {
  id: "new-test-id",
  slug: "new-test-slug",
  title: "New Test Title",
  category: "Conflict & Communication",
  categoryIcon: "⚡",
  shortDescription: "Short description for the test card.",
  longDescription: "Longer summary of what this test reflects on.",
  estimatedTime: "~5 min",
  supportsModes: true,
  availableModes: ["self", "observer"],
  tags: ["Reflection", "Self + Observer"],
  questions: [
    {
      id: "q1",
      textSelf: "Self mode question text.",
      textObserver: "Observer mode question text.",
      helperText: "Optional helper text.",
      answers: [
        {
          id: "a1",
          label: "Almost never",
          value: 0,
          traitEffects: { selfAwareness: 1 },
        },
      ],
    },
  ],
  scoring: {
    maxScorePerQuestion: 4,
  },
  resultBands: [
    {
      id: "low-concern",
      minScore: 0,
      maxScore: 4,
      title: "Low concern",
      level: "Low",
      summary: "Summary language for the result band.",
      whatThisMeans: "Describe what the answers may suggest.",
      whatThisDoesNotMean: "Describe what the result does not prove.",
      patterns: ["Pattern example one", "Pattern example two"],
      nextSteps: ["Next step one", "Next step two"],
      profileImpact: {
        traits: ["selfAwareness"],
        note: "What this means for the Pattern Profile.",
      },
      recommendedPatternChecks: ["conflict-avoidance-check"],
    },
  ],
  traitImpacts: ["selfAwareness"],
  startPageTraits: ["Self-awareness", "Accountability"],
};
