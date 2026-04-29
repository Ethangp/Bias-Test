import type { Quiz } from "@/types/quiz";

export interface QuizValidationIssue {
  quizId: string;
  message: string;
}

export function validateQuiz(quiz: Quiz): QuizValidationIssue[] {
  const issues: QuizValidationIssue[] = [];

  if (!quiz.id?.trim()) {
    issues.push({ quizId: quiz.slug ?? "unknown", message: "Missing quiz id." });
  }

  if (!quiz.slug?.trim()) {
    issues.push({ quizId: quiz.id ?? "unknown", message: "Missing quiz slug." });
  }

  if (!quiz.questions.length) {
    issues.push({ quizId: quiz.id, message: "Quiz must contain at least one question." });
  }

  const questionIds = new Set<string>();
  quiz.questions.forEach((question) => {
    if (questionIds.has(question.id)) {
      issues.push({ quizId: quiz.id, message: `Duplicate question id: ${question.id}` });
    }
    questionIds.add(question.id);

    if (quiz.supportsModes) {
      if (!question.textSelf?.trim()) {
        issues.push({ quizId: quiz.id, message: `Question ${question.id} missing self text.` });
      }
      if (!question.textObserver?.trim()) {
        issues.push({ quizId: quiz.id, message: `Question ${question.id} missing observer text.` });
      }
    }

    if (!question.answers.length) {
      issues.push({ quizId: quiz.id, message: `Question ${question.id} must have answers.` });
    }

    question.answers.forEach((answer) => {
      if (!answer.traitEffects) {
        issues.push({ quizId: quiz.id, message: `Answer ${answer.id} on ${question.id} missing traitEffects.` });
      }
    });
  });

  const sortedBands = [...quiz.resultBands].sort((a, b) => a.minScore - b.minScore);
  if (sortedBands.length > 0) {
    let expectedMin = sortedBands[0].minScore;
    sortedBands.forEach((band) => {
      if (band.minScore > band.maxScore) {
        issues.push({ quizId: quiz.id, message: `Invalid score range on band ${band.id}.` });
      }
      if (band.minScore > expectedMin) {
        issues.push({ quizId: quiz.id, message: `Gap before result band ${band.id}.` });
      }
      expectedMin = band.maxScore + 1;
    });
  }

  return issues;
}

export function validateQuizRegistry(quizzes: Quiz[]): QuizValidationIssue[] {
  const issues: QuizValidationIssue[] = [];
  const ids = new Set<string>();

  quizzes.forEach((quiz) => {
    if (ids.has(quiz.id)) {
      issues.push({ quizId: quiz.id, message: `Duplicate quiz id: ${quiz.id}` });
    }
    ids.add(quiz.id);
    issues.push(...validateQuiz(quiz));
  });

  return issues;
}
