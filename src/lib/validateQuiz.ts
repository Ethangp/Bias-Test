import type { Quiz } from "@/types";

export interface QuizValidationIssue {
  quizSlug: string;
  message: string;
}

/**
 * Validate a single quiz against the current schema.
 * Call this during development to catch authoring mistakes before they reach the UI.
 */
export function validateQuiz(quiz: Quiz): QuizValidationIssue[] {
  const issues: QuizValidationIssue[] = [];
  const id = quiz.slug ?? "unknown";

  if (!quiz.slug?.trim()) {
    issues.push({ quizSlug: id, message: "Missing quiz slug." });
  }

  if (!quiz.title?.trim()) {
    issues.push({ quizSlug: id, message: "Missing quiz title." });
  }

  if (!quiz.questions?.length) {
    issues.push({ quizSlug: id, message: "Quiz must contain at least one question." });
  }

  const questionIds = new Set<string>();
  quiz.questions.forEach((question) => {
    if (questionIds.has(question.id)) {
      issues.push({ quizSlug: id, message: `Duplicate question id: ${question.id}` });
    }
    questionIds.add(question.id);

    if (quiz.hasObserverMode) {
      if (!question.selfText?.trim()) {
        issues.push({ quizSlug: id, message: `Question ${question.id} missing selfText.` });
      }
      if (!question.observerText?.trim()) {
        issues.push({ quizSlug: id, message: `Question ${question.id} missing observerText.` });
      }
    } else if (!question.selfText?.trim()) {
      issues.push({ quizSlug: id, message: `Question ${question.id} missing selfText.` });
    }

    if (!question.options?.length) {
      issues.push({ quizSlug: id, message: `Question ${question.id} must have options.` });
    }

    question.options?.forEach((option) => {
      if (!option.traitDeltas) {
        issues.push({
          quizSlug: id,
          message: `Option ${option.id} on question ${question.id} missing traitDeltas.`,
        });
      }
    });
  });

  if (!quiz.results?.length) {
    issues.push({ quizSlug: id, message: "Quiz must have at least one result band." });
  }

  const levels = quiz.results?.map((r) => r.level) ?? [];
  const uniqueLevels = new Set(levels);
  if (uniqueLevels.size !== levels.length) {
    issues.push({ quizSlug: id, message: "Duplicate result levels detected." });
  }

  return issues;
}

/**
 * Validate all quizzes in the registry and return all issues.
 */
export function validateQuizRegistry(quizzes: Quiz[]): QuizValidationIssue[] {
  const issues: QuizValidationIssue[] = [];
  const slugs = new Set<string>();

  quizzes.forEach((quiz) => {
    if (slugs.has(quiz.slug)) {
      issues.push({ quizSlug: quiz.slug, message: `Duplicate quiz slug: ${quiz.slug}` });
    }
    slugs.add(quiz.slug);
    issues.push(...validateQuiz(quiz));
  });

  return issues;
}
