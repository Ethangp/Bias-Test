"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getQuizBySlug } from "@/data/quizzes";
import { CATEGORY_INFO } from "@/lib/quizzes";
import {
  calculateResult,
  buildCompletedQuiz,
  getLevelColor,
  getLevelBadgeColor,
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
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ slug: s }) => setSlug(s));
  }, [params]);

  if (!slug) return <div className="min-h-screen" />;

  return <QuizFlow slug={slug} />;
}

function QuizFlow({ slug }: { slug: string }) {
  const quiz = getQuizBySlug(slug);

  const [phase, setPhase] = useState<"setup" | "questions" | "done">("setup");
  const [mode, setMode] = useState<QuizMode>("self");
  const [modeSelected, setModeSelected] = useState<boolean>(false);
  const [observerTarget, setObserverTarget] = useState<ObserverTarget>("friend");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-stone-800 mb-4">Quiz not found</h1>
        <Link href="/quizzes" className="text-stone-500 hover:text-stone-700 underline">
          ← Back to all tests
        </Link>
      </div>
    );
  }

  const catInfo = CATEGORY_INFO[quiz.category];
  const questions = quiz.questions;
  const currentQuestion = questions[currentQ];

  const handleModeCardClick = (selectedMode: QuizMode) => {
    setMode(selectedMode);
    setModeSelected(true);
  };

  const handleStartQuiz = () => {
    setPhase("questions");
  };

  const handleAnswer = (questionId: string, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 300);
    } else {
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

  // ─── Result Page ──────────────────────────────────────────────────────────
  if (phase === "done") {
    const { level } = calculateResult(quiz, answers);
    const resultRange = getResultRange(quiz, level);
    const levelColor = getLevelColor(level);
    const badgeColor = getLevelBadgeColor(level);

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Result header card */}
        <div className={`rounded-2xl border-2 p-8 mb-6 ${levelColor}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest opacity-70">
              Your Result
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
              {resultRange?.label}
            </span>
          </div>
          <p className="text-base leading-relaxed">{resultRange?.description}</p>
        </div>

        {/* What this means */}
        {resultRange?.whatThisMeans && (
          <div className="bg-white border border-stone-200 rounded-xl p-6 mb-4">
            <h2 className="font-semibold text-stone-800 mb-2 text-sm uppercase tracking-wide">
              What this means
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {resultRange.whatThisMeans}
            </p>
          </div>
        )}

        {/* What this does not mean */}
        {resultRange?.whatThisDoesNotMean && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-4">
            <h2 className="font-semibold text-stone-600 mb-2 text-sm uppercase tracking-wide">
              What this does not mean
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed">
              {resultRange.whatThisDoesNotMean}
            </p>
          </div>
        )}

        {/* Patterns that showed up */}
        {resultRange?.patterns && resultRange.patterns.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-xl p-6 mb-4">
            <h2 className="font-semibold text-stone-800 mb-3 text-sm uppercase tracking-wide">
              Patterns that showed up
            </h2>
            <ul className="space-y-2">
              {resultRange.patterns.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-600">
                  <span className="text-stone-300 mt-0.5 shrink-0">◆</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Steps */}
        {resultRange?.nextSteps && resultRange.nextSteps.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
            <h2 className="font-semibold text-stone-800 mb-3 text-sm uppercase tracking-wide">
              Next steps
            </h2>
            <ul className="space-y-2">
              {resultRange.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-stone-600">
                  <span className="text-stone-400 mt-0.5 shrink-0">→</span>
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
              <span>✓</span> Saved. Your Pattern Profile has been updated.
            </div>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save to My Profile"}
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
              setModeSelected(false);
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

  // ─── Setup / Start Page ───────────────────────────────────────────────────
  if (phase === "setup") {
    const canStart = !quiz.hasObserverMode || modeSelected;

    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/quizzes"
            className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            ← All Tests
          </Link>
        </div>

        {/* Quiz header */}
        <div className="mb-8">
          <div className="text-xs text-stone-400 uppercase tracking-wide mb-2">
            {catInfo?.emoji} {catInfo?.label ?? quiz.category}
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-3">{quiz.title}</h1>
          <p className="text-stone-500 leading-relaxed">{quiz.description}</p>
          <div className="flex items-center gap-3 mt-3 text-sm text-stone-400">
            <span>~{quiz.estimatedMinutes} min</span>
            <span>·</span>
            <span>{quiz.questions.length} questions</span>
          </div>
        </div>

        {/* Trait chips */}
        {quiz.startPageTraits && quiz.startPageTraits.length > 0 && (
          <div className="mb-8">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
              This test looks at
            </div>
            <div className="flex flex-wrap gap-2">
              {quiz.startPageTraits.map((trait) => (
                <span
                  key={trait}
                  className="bg-stone-100 text-stone-600 text-xs px-3 py-1.5 rounded-full border border-stone-200"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Mode selection */}
        {quiz.hasObserverMode ? (
          <div className="mb-6">
            <h2 className="font-semibold text-stone-800 mb-4">
              Who is this test about?
            </h2>
            <div className="space-y-3 mb-4">
              <button
                onClick={() => handleModeCardClick("self")}
                className={`w-full text-left rounded-xl p-5 transition-all border-2 ${
                  modeSelected && mode === "self"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 bg-white hover:border-stone-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-900 mb-1">
                      About myself
                    </div>
                    <div className="text-sm text-stone-500">
                      Questions will be written in first person
                    </div>
                  </div>
                  {modeSelected && mode === "self" && (
                    <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center shrink-0 ml-4">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>

              <button
                onClick={() => handleModeCardClick("observer")}
                className={`w-full text-left rounded-xl p-5 transition-all border-2 ${
                  modeSelected && mode === "observer"
                    ? "border-stone-900 bg-stone-50"
                    : "border-stone-200 bg-white hover:border-stone-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-stone-900 mb-1">
                      About someone else
                    </div>
                    <div className="text-sm text-stone-500">
                      Questions will ask about another person
                    </div>
                  </div>
                  {modeSelected && mode === "observer" && (
                    <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center shrink-0 ml-4">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Mode-specific helper copy */}
            {modeSelected && (
              <div className="bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 mb-5 text-sm text-stone-500 leading-relaxed">
                {mode === "self"
                  ? "Questions will be written in first person and focus on your reactions, communication, and role in the situation."
                  : "Questions will ask about observable behavior. The result should be treated as a pattern read, not proof of someone's intent."}
              </div>
            )}

            {/* Observer target selector */}
            {modeSelected && mode === "observer" && (
              <div className="mb-6">
                <h3 className="font-medium text-stone-800 mb-3 text-sm">
                  Who are you thinking about?
                </h3>
                <div className="grid grid-cols-2 gap-2">
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
              </div>
            )}
          </div>
        ) : null}

        {/* What you'll get */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
            What you&apos;ll get
          </div>
          <ul className="space-y-2">
            {[
              "A reflection-based result about patterns in your answers",
              "Patterns that showed up based on how you responded",
              "Profile impact when you choose to save the result",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-stone-600">
                <span className="text-stone-400 shrink-0 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Start button */}
        <button
          onClick={handleStartQuiz}
          disabled={!canStart}
          className="w-full sm:w-auto bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-6"
        >
          {quiz.hasObserverMode && !modeSelected
            ? "Select a mode to continue"
            : "Start Quiz →"}
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-stone-400 italic">
          {quiz.disclaimer ??
            "This quiz is for reflection and pattern recognition. It does not diagnose, prove fault, or label anyone."}
        </p>
      </div>
    );
  }

  // ─── Questions Screen ─────────────────────────────────────────────────────
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
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-stone-900 leading-snug mb-2">
          {mode === "self"
            ? currentQuestion.selfText
            : currentQuestion.observerText}
        </h2>
        {currentQuestion.helperText && (
          <p className="text-sm text-stone-400 leading-relaxed">
            {currentQuestion.helperText}
          </p>
        )}
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
