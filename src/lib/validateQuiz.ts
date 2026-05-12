import type { Quiz } from "@/types";

export interface QuizValidationIssue {
  quizId: string;
  message: string;
}

export function validateQuiz(quiz: Quiz): QuizValidationIssue[] {
  const issues: QuizValidationIssue[] = [];
  const quizId = quiz.slug ?? "unknown";

  if (!quiz.slug?.trim()) {
    issues.push({ quizId, message: "Missing quiz slug." });
  }

  if (!quiz.title?.trim()) {
    issues.push({ quizId, message: "Missing quiz title." });
  }

  if (!quiz.questions.length) {
    issues.push({ quizId, message: "Quiz must contain at least one question." });
  }

  const questionIds = new Set<string>();
  quiz.questions.forEach((question) => {
    if (questionIds.has(question.id)) {
      issues.push({ quizId, message: `Duplicate question id: ${question.id}` });
    }
    questionIds.add(question.id);

    if (!question.selfText?.trim()) {
      issues.push({ quizId, message: `Question ${question.id} missing selfText.` });
    }
    if (quiz.hasObserverMode && !question.observerText?.trim()) {
      issues.push({ quizId, message: `Question ${question.id} missing observerText.` });
    }

    if (!question.options.length) {
      issues.push({ quizId, message: `Question ${question.id} must have options.` });
    }

    question.options.forEach((opt) => {
      if (!opt.id?.trim()) {
        issues.push({ quizId, message: `Question ${question.id} has an option missing id.` });
      }
      if (opt.traitDeltas === undefined) {
        issues.push({ quizId, message: `Question ${question.id} option ${opt.id} missing traitDeltas.` });
      }
    });
  });

  if (!quiz.results.length) {
    issues.push({ quizId, message: "Quiz must define at least one result band." });
  }

  return issues;
}

export function validateQuizRegistry(quizzes: Quiz[]): QuizValidationIssue[] {
  const issues: QuizValidationIssue[] = [];
  const slugs = new Set<string>();

  quizzes.forEach((quiz) => {
    if (slugs.has(quiz.slug)) {
      issues.push({ quizId: quiz.slug, message: `Duplicate quiz slug: ${quiz.slug}` });
    }
    slugs.add(quiz.slug);
    issues.push(...validateQuiz(quiz));
  });

  return issues;
}
