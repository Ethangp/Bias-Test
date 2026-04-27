import {
  Quiz,
  ResultLevel,
  IdentityResultLevel,
  TraitKey,
  CompletedQuiz,
  QuizMode,
  ObserverTarget,
  ResultRange,
} from "@/types";

/**
 * Calculate the result level from a set of answers
 */
export function calculateResult(
  quiz: Quiz,
  answers: Record<string, string>
): { level: ResultLevel | IdentityResultLevel; totalScore: number; traitDeltas: Partial<Record<TraitKey, number>> } {
  let totalScore = 0;
  let maxPossibleScore = 0;
  const traitDeltas: Partial<Record<TraitKey, number>> = {};

  quiz.questions.forEach((question) => {
    const answerId = answers[question.id];
    if (!answerId) return;

    const option = question.options.find((o) => o.id === answerId);
    if (!option) return;

    totalScore += option.score;
    maxPossibleScore += Math.max(...question.options.map((o) => o.score));

    // Accumulate trait deltas
    Object.entries(option.traitDeltas).forEach(([key, value]) => {
      const traitKey = key as TraitKey;
      traitDeltas[traitKey] = (traitDeltas[traitKey] ?? 0) + (value ?? 0);
    });
  });

  if (quiz.isIdentityQuiz) {
    const percentage = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;

    if (percentage < 0.1) return { level: "probably_not", totalScore, traitDeltas };
    if (percentage < 0.3) return { level: "maybe", totalScore, traitDeltas };
    if (percentage < 0.55) return { level: "worth_exploring", totalScore, traitDeltas };
    if (percentage < 0.8) return { level: "strong_signs", totalScore, traitDeltas };
    return { level: "only_you_can_define", totalScore, traitDeltas };
  }

  const percentage = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;

  if (percentage < 0.2) return { level: 1, totalScore, traitDeltas };
  if (percentage < 0.4) return { level: 2, totalScore, traitDeltas };
  if (percentage < 0.6) return { level: 3, totalScore, traitDeltas };
  if (percentage < 0.8) return { level: 4, totalScore, traitDeltas };
  return { level: 5, totalScore, traitDeltas };
}

/**
 * Get the result range object for a given level
 */
export function getResultRange(
  quiz: Quiz,
  level: ResultLevel | IdentityResultLevel
): ResultRange | undefined {
  return quiz.results.find((r) => r.level === level);
}

/**
 * Get level color class for Tailwind CSS
 */
export function getLevelColor(level: ResultLevel | IdentityResultLevel): string {
  if (typeof level === "number") {
    const colors: Record<ResultLevel, string> = {
      1: "text-green-600 bg-green-50 border-green-200",
      2: "text-yellow-600 bg-yellow-50 border-yellow-200",
      3: "text-orange-500 bg-orange-50 border-orange-200",
      4: "text-red-500 bg-red-50 border-red-200",
      5: "text-red-700 bg-red-100 border-red-300",
    };
    return colors[level];
  }

  const identityColors: Record<IdentityResultLevel, string> = {
    probably_not: "text-slate-600 bg-slate-50 border-slate-200",
    maybe: "text-blue-500 bg-blue-50 border-blue-200",
    worth_exploring: "text-purple-500 bg-purple-50 border-purple-200",
    strong_signs: "text-violet-600 bg-violet-50 border-violet-200",
    only_you_can_define: "text-indigo-600 bg-indigo-50 border-indigo-200",
  };
  return identityColors[level];
}

export function getLevelBadgeColor(level: ResultLevel | IdentityResultLevel): string {
  if (typeof level === "number") {
    const colors: Record<ResultLevel, string> = {
      1: "bg-green-100 text-green-700",
      2: "bg-yellow-100 text-yellow-700",
      3: "bg-orange-100 text-orange-700",
      4: "bg-red-100 text-red-600",
      5: "bg-red-200 text-red-800",
    };
    return colors[level];
  }
  return "bg-purple-100 text-purple-700";
}

/**
 * Build a CompletedQuiz record
 */
export function buildCompletedQuiz(
  quiz: Quiz,
  mode: QuizMode,
  observerTarget: ObserverTarget | undefined,
  answers: Record<string, string>,
  level: ResultLevel | IdentityResultLevel,
  traitDeltas: Partial<Record<TraitKey, number>>
): CompletedQuiz {
  const resultRange = getResultRange(quiz, level);
  return {
    id: crypto.randomUUID(),
    quizSlug: quiz.slug,
    quizTitle: mode === "self" ? quiz.title : (quiz.observerTitle ?? quiz.title),
    mode,
    observerTarget,
    answers,
    resultLevel: level,
    resultLabel: resultRange?.label ?? "",
    traitDeltas,
    completedAt: new Date().toISOString(),
  };
}
