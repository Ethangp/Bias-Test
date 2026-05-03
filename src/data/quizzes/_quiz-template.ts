/**
 * Quiz template — copy this object into the QUIZZES array in src/lib/quizzes.ts
 * to add a new test. Replace all placeholder values.
 *
 * See docs/ADDING_NEW_TESTS.md for a full guide.
 */

import type { Quiz } from "@/types";

export const quizTemplate: Quiz = {
  slug: "your-quiz-slug",                // URL-safe, hyphenated, unique
  title: "Your Quiz Title",
  observerTitle: "Their Version of the Title",  // optional
  category: "conflict",                  // see CATEGORY_INFO in src/lib/quizzes.ts
  description: "Short description shown on the quiz card and start page.",
  observerDescription: "Shown in observer mode. Optional.",
  hasObserverMode: true,
  isIdentityQuiz: false,
  estimatedMinutes: 5,
  tags: ["tag1", "tag2"],
  startPageTraits: ["Accountability", "Self-awareness", "Empathy"],  // 3–6 chips
  traitWeights: {
    selfAwareness: 3,
    accountability: 2,
  },
  questions: [
    {
      id: "xyz-1",                       // unique within this quiz (use slug prefix)
      selfText: "Self-mode question text here.",
      observerText: "Observer-mode question text here.",
      helperText: "Optional clarifying note shown below the question.",
      options: [
        { id: "a", text: "Almost never",   score: 0, traitDeltas: { accountability: 2 } },
        { id: "b", text: "Rarely",         score: 1, traitDeltas: { accountability: 1 } },
        { id: "c", text: "Sometimes",      score: 2, traitDeltas: {} },
        { id: "d", text: "Often",          score: 3, traitDeltas: { defensiveness: 1 } },
        { id: "e", text: "Almost always",  score: 4, traitDeltas: { defensiveness: 2 } },
      ],
    },
    // Add more questions here (6–10 recommended)
  ],
  results: [
    {
      level: 1,
      label: "Low Concern",
      description: "Main result text — 1–2 sentences.",
      whatThisMeans: "What the answers may suggest.",
      whatThisDoesNotMean: "What the result does not prove.",
      patterns: ["Pattern example one.", "Pattern example two."],
      nextSteps: ["Actionable suggestion one.", "Actionable suggestion two."],
    },
    {
      level: 2,
      label: "Mild Pattern",
      description: "...",
      nextSteps: ["...", "..."],
    },
    {
      level: 3,
      label: "Mixed / Unclear",
      description: "...",
      nextSteps: ["...", "..."],
    },
    {
      level: 4,
      label: "Strong Pattern",
      description: "...",
      nextSteps: ["...", "..."],
    },
    {
      level: 5,
      label: "High Concern",
      description: "...",
      nextSteps: ["...", "..."],
    },
  ],
  disclaimer: "This quiz is for reflection and pattern recognition. It does not diagnose, prove fault, or label anyone.",
};
