"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quiz, Question } from "@/lib/quizData";

interface QuizTakeClientProps {
  quiz: Quiz;
  mode: "self" | "observer";
  target: string;
}

export default function QuizTakeClient({
  quiz,
  mode,
  target,
}: QuizTakeClientProps) {
  const router = useRouter();
  const questions =
    mode === "observer" && quiz.questionsObserver
      ? quiz.questionsObserver
      : quiz.questionsSelf;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion: Question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(value: number) {
    setSelectedValue(value);
  }

  async function handleNext() {
    if (selectedValue === null) return;

    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedValue };
    setAnswers(updatedAnswers);

    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      setSelectedValue(null);
      return;
    }

    // Submit
    setSubmitting(true);
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug: quiz.slug,
          mode,
          answers: updatedAnswers,
        }),
      });
      const data = await res.json();
      const resultLevel = data.result?.level ?? 1;
      const resultId = data.savedResultId ?? null;

      const params = new URLSearchParams({
        level: String(resultLevel),
        mode,
        ...(resultId ? { resultId } : {}),
      });
      router.push(`/quiz/${quiz.slug}/result?${params.toString()}`);
    } catch {
      setSubmitting(false);
    }
  }

  const title = mode === "observer" ? quiz.titleObserver : quiz.titleSelf;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">
            {quiz.emoji} {title}
          </span>
          <span className="text-xs text-gray-400">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mode chip */}
      {mode === "observer" && (
        <div className="mb-4">
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
            {target}
          </span>
        </div>
      )}

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">
          {currentQuestion.text}
        </h2>
      </div>

      {/* Answers */}
      <div className="space-y-2.5 mb-8">
        {currentQuestion.answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(answer.value)}
            className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all text-sm ${
              selectedValue === answer.value
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-100 hover:border-gray-300 text-gray-700"
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>

      {/* Next / Submit */}
      <button
        onClick={handleNext}
        disabled={selectedValue === null || submitting}
        className="w-full bg-gray-900 text-white py-3.5 rounded-full font-medium hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting…" : isLast ? "See My Result" : "Next →"}
      </button>
    </div>
  );
}
