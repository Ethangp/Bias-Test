"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getQuizBySlug } from "@/data/quizzes";
import { CATEGORY_INFO } from "@/lib/quizzes";
import {
  calculateResult,
  buildCompletedQuiz,
  getLevelColor,
  getResultRange,
} from "@/lib/scoring";
import { getAccount, addCompletedQuiz } from "@/lib/storage";
import { QuizMode, ObserverTarget } from "@/types";

const OBSERVER_TARGETS: { value: ObserverTarget; label: string }[] = [
  { value: "friend", label: "A friend" },
  { value: "partner", label: "A romantic partner" },
  { value: "hookup", label: "A hookup / situationship" },
  { value: "roommate", label: "A roommate" },
  { value: "family", label: "A family member" },
  { value: "coworker", label: "A coworker or classmate" },
  { value: "other", label: "Someone else" },
];

export default function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <QuizFlow slug={slug} />;
}

function QuizFlow({ slug }: { slug: string }) {
  const quiz = getQuizBySlug(slug);

  const [phase, setPhase] = useState<"setup" | "questions" | "done">("setup");
  const [mode, setMode] = useState<QuizMode>("self");
  const [observerTarget, setObserverTarget] = useState<ObserverTarget>("friend");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-stone-800 mb-4">Test not found</h1>
        <p className="text-stone-500 mb-6">
          We couldn&apos;t find a test at this address. It may have been
          renamed or removed.
        </p>
        <Link
          href="/quizzes"
          className="text-stone-700 hover:text-stone-900 underline"
        >
          ← Back to all tests
        </Link>
      </div>
    );
  }

  const catInfo = CATEGORY_INFO[quiz.category];
  const questions = quiz.questions;
  const currentQuestion = questions[currentQ];

  const handleModeSelect = (selectedMode: QuizMode) => {
    setMode(selectedMode);
    if (selectedMode === "self" || !quiz.hasObserverMode) {
      setPhase("questions");
    }
  };

  const handleObserverTargetSelect = () => {
    setPhase("questions");
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 300);
    } else {
      // Done
      setPhase("done");
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
    } else {
      setPhase("setup");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    let account = getAccount();
    if (!account) {
      // Create a guest account
      const { createAccount } = await import("@/lib/storage");
      account = createAccount("Guest");
    }

    const { level, traitDeltas } = calculateResult(quiz, answers);
    const completedQuiz = buildCompletedQuiz(
      quiz,
      mode,
      mode === "observer" ? observerTarget : undefined,
      answers,
      level,
      traitDeltas
    );

    addCompletedQuiz(account, completedQuiz);
    setSaved(true);
    setSaving(false);
  };

  // Result screen
  if (phase === "done") {
    const { level } = calculateResult(quiz, answers);
    const resultRange = getResultRange(quiz, level);
    const levelColor = getLevelColor(level);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Result card */}
        <div className={`rounded-2xl border-2 p-8 mb-6 ${levelColor}`}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-70">
            Your Result
          </div>
          <h1 className="text-2xl font-bold mb-4">{resultRange?.label}</h1>
          <p className="text-base leading-relaxed">{resultRange?.description}</p>
        </div>

        {/* Next Steps */}
        {resultRange?.nextSteps && resultRange.nextSteps.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
            <h2 className="font-semibold text-stone-800 mb-4">Suggested Next Steps</h2>
            <ul className="space-y-2">
              {resultRange.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-600">
                  <span className="text-stone-400 mt-0.5">→</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        {quiz.disclaimer && (
          <p className="text-xs text-stone-400 italic mb-6 px-1">
            {quiz.disclaimer}
          </p>
        )}

        {/* Save to profile */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-stone-800 mb-1">
            Save to Your Pattern Profile
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            Saving this result updates your Pattern Profile with new data points.
            Stored locally on your device.
          </p>
          {saved ? (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <span>✓</span> Saved to your profile
            </div>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Result"}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/quizzes"
            className="bg-stone-100 text-stone-800 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors"
          >
            Take Another Test
          </Link>
          <Link
            href="/dashboard"
            className="bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            View My Profile
          </Link>
          <button
            onClick={() => {
              setAnswers({});
              setCurrentQ(0);
              setPhase("setup");
              setSaved(false);
            }}
            className="text-stone-400 hover:text-stone-600 text-sm px-2 py-2.5 transition-colors"
          >
            Retake
          </button>
        </div>
      </div>
    );
  }

  // Setup / mode selection screen
  if (phase === "setup") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Quiz header */}
        <div className="mb-8">
          <div className="text-xs text-stone-400 uppercase tracking-wide mb-2">
            {catInfo?.emoji} {catInfo?.label ?? quiz.category}
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-3">{quiz.title}</h1>
          <p className="text-stone-500 leading-relaxed">{quiz.description}</p>
          <div className="flex items-center gap-3 mt-3 text-sm text-stone-400">
            <span>~{quiz.estimatedMinutes} minutes</span>
            <span>·</span>
            <span>{quiz.questions.length} questions</span>
          </div>
        </div>

        {quiz.hasObserverMode ? (
          <div>
            <h2 className="font-semibold text-stone-800 mb-4">
              Who is this test about?
            </h2>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleModeSelect("self")}
                className="w-full text-left bg-white border-2 border-stone-200 hover:border-stone-400 rounded-xl p-5 transition-colors"
              >
                <div className="font-medium text-stone-900 mb-1">
                  About myself
                </div>
                <div className="text-sm text-stone-500">
                  Questions will be written in first-person
                </div>
              </button>
              <button
                onClick={() => handleModeSelect("observer")}
                className="w-full text-left bg-white border-2 border-stone-200 hover:border-stone-400 rounded-xl p-5 transition-colors"
              >
                <div className="font-medium text-stone-900 mb-1">
                  About someone else
                </div>
                <div className="text-sm text-stone-500">
                  Questions will ask about another person
                </div>
              </button>
            </div>

            {/* Observer target selector */}
            {mode === "observer" && (
              <div className="mt-4">
                <h3 className="font-medium text-stone-800 mb-3 text-sm">
                  Who are you thinking about?
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {OBSERVER_TARGETS.map((target) => (
                    <button
                      key={target.value}
                      onClick={() => setObserverTarget(target.value)}
                      className={`text-left border rounded-lg px-4 py-2.5 text-sm transition-colors ${
                        observerTarget === target.value
                          ? "border-stone-900 bg-stone-50 text-stone-900 font-medium"
                          : "border-stone-200 text-stone-500 hover:border-stone-400"
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleObserverTargetSelect}
                  className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-700 transition-colors"
                >
                  Start Test →
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setPhase("questions")}
            className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-700 transition-colors"
          >
            Start Test →
          </button>
        )}

        {quiz.disclaimer && (
          <p className="text-xs text-stone-400 italic mt-8">{quiz.disclaimer}</p>
        )}
      </div>
    );
  }

  // Questions screen
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
          <span>
            {currentQ + 1} of {questions.length}
          </span>
          <button
            onClick={handleBack}
            className="hover:text-stone-600 transition-colors"
          >
            ← Back
          </button>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-900 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-stone-900 leading-snug">
          {mode === "self"
            ? currentQuestion.selfText
            : currentQuestion.observerText}
        </h2>
      </div>

      {/* Answer options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option) => {
          const isSelected = answers[currentQuestion.id] === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(currentQuestion.id, option.id)}
              className={`w-full text-left border-2 rounded-xl px-5 py-4 text-sm transition-all ${
                isSelected
                  ? "border-stone-900 bg-stone-50 text-stone-900 font-medium"
                  : "border-stone-200 text-stone-700 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
