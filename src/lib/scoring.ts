import {
  Quiz,
  Question,
  AnswerOption,
  TraitKey,
  ResultDescriptor,
} from "./quizData";

export interface ScoringResult {
  level: 1 | 2 | 3 | 4 | 5;
  totalScore: number;
  maxScore: number;
  percentage: number;
  resultDescriptor: ResultDescriptor;
  traitDeltas: Partial<Record<TraitKey, number>>;
}

export function scoreQuiz(
  quiz: Quiz,
  answers: Record<string, number>,
  mode: "self" | "observer"
): ScoringResult {
  const questions =
    mode === "observer" && quiz.questionsObserver
      ? quiz.questionsObserver
      : quiz.questionsSelf;

  let totalScore = 0;
  let maxScore = 0;
  const traitAccumulator: Partial<Record<TraitKey, number>> = {};

  for (const question of questions) {
    const selectedValue = answers[question.id];
    if (selectedValue === undefined) continue;

    const selectedAnswer = question.answers.find(
      (a) => a.value === selectedValue
    );
    if (!selectedAnswer) continue;

    totalScore += selectedAnswer.value;

    const maxForQuestion = Math.max(...question.answers.map((a) => a.value));
    maxScore += maxForQuestion;

    for (const [trait, weight] of Object.entries(
      selectedAnswer.traitWeights
    ) as [TraitKey, number][]) {
      traitAccumulator[trait] = (traitAccumulator[trait] ?? 0) + weight;
    }
  }

  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  let level: 1 | 2 | 3 | 4 | 5;
  if (percentage < 20) {
    level = 1;
  } else if (percentage < 40) {
    level = 2;
  } else if (percentage < 60) {
    level = 3;
  } else if (percentage < 80) {
    level = 4;
  } else {
    level = 5;
  }

  const resultDescriptor =
    quiz.results.find((r) => r.level === level) ?? quiz.results[0];

  // Normalize trait deltas to a -10 to +10 scale
  const traitDeltas: Partial<Record<TraitKey, number>> = {};
  for (const [trait, raw] of Object.entries(traitAccumulator) as [
    TraitKey,
    number,
  ][]) {
    // Clamp between -10 and 10
    traitDeltas[trait] = Math.max(-10, Math.min(10, raw));
  }

  return {
    level,
    totalScore,
    maxScore,
    percentage,
    resultDescriptor,
    traitDeltas,
  };
}

export function getLevelColor(level: number, colorOverride?: string): string {
  if (colorOverride && colorOverride !== "green") {
    const colorMap: Record<string, string> = {
      lime: "text-lime-600",
      yellow: "text-yellow-600",
      orange: "text-orange-600",
      red: "text-red-600",
      blue: "text-blue-600",
      purple: "text-purple-600",
      rainbow: "text-purple-500",
    };
    return colorMap[colorOverride] ?? "text-green-600";
  }

  const map: Record<number, string> = {
    1: "text-green-600",
    2: "text-lime-600",
    3: "text-yellow-600",
    4: "text-orange-600",
    5: "text-red-600",
  };
  return map[level] ?? "text-gray-600";
}

export function getLevelBgColor(
  level: number,
  colorOverride?: string
): string {
  if (colorOverride && colorOverride !== "green") {
    const colorMap: Record<string, string> = {
      lime: "bg-lime-50 border-lime-200",
      yellow: "bg-yellow-50 border-yellow-200",
      orange: "bg-orange-50 border-orange-200",
      red: "bg-red-50 border-red-200",
      blue: "bg-blue-50 border-blue-200",
      purple: "bg-purple-50 border-purple-200",
      rainbow: "bg-purple-50 border-purple-200",
    };
    return colorMap[colorOverride] ?? "bg-green-50 border-green-200";
  }

  const map: Record<number, string> = {
    1: "bg-green-50 border-green-200",
    2: "bg-lime-50 border-lime-200",
    3: "bg-yellow-50 border-yellow-200",
    4: "bg-orange-50 border-orange-200",
    5: "bg-red-50 border-red-200",
  };
  return map[level] ?? "bg-gray-50 border-gray-200";
}
