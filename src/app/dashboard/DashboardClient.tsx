"use client";

import { useState } from "react";
import Link from "next/link";
import TraitBar from "@/components/TraitBar";
import { TraitKey, quizzes } from "@/lib/quizData";
import { getLevelColor } from "@/lib/scoring";

interface TraitDataItem {
  trait: TraitKey;
  score: number;
  count: number;
  label: string;
}

interface ResultDataItem {
  id: string;
  quizSlug: string;
  quizTitle: string;
  quizEmoji: string;
  mode: string;
  level: number;
  createdAt: string;
  resultLabel: string;
  resultColor: string;
}

interface DashboardClientProps {
  userName: string;
  traitData: TraitDataItem[];
  resultData: ResultDataItem[];
  totalTests: number;
  confidenceLevel: "starter" | "developing" | "strong" | "deep";
  confidencePercent: number;
}

const CONFIDENCE_LABELS = {
  starter: "Starter Profile",
  developing: "Developing Profile",
  strong: "Strong Profile",
  deep: "Deep Profile",
};

const CONFIDENCE_DESCRIPTIONS = {
  starter: "1–2 tests completed. Low confidence.",
  developing: "3–5 tests completed. Early patterns forming.",
  strong: "6–10 tests completed. More reliable cross-category insights.",
  deep: "10+ tests completed. Stronger repeated patterns.",
};

const NEXT_MILESTONE: Record<
  "starter" | "developing" | "strong" | "deep",
  string
> = {
  starter: "Take 2 more tests to unlock early pattern insights.",
  developing: "Take 3 more tests for a Strong Profile.",
  strong: "Take 4 more tests for a Deep Profile.",
  deep: "Your profile is well-developed. Keep exploring.",
};

// Suggest quizzes not yet taken
function getSuggestedQuizzes(
  takenSlugs: string[],
  count = 3
): typeof quizzes {
  return quizzes
    .filter((q) => !takenSlugs.includes(q.slug))
    .slice(0, count);
}

export default function DashboardClient({
  userName,
  traitData,
  resultData,
  totalTests,
  confidenceLevel,
  confidencePercent,
}: DashboardClientProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [results, setResults] = useState(resultData);

  const takenSlugs = results.map((r) => r.quizSlug);
  const suggested = getSuggestedQuizzes(takenSlugs);

  async function handleDeleteResult(id: string) {
    if (!confirm("Remove this result from your profile?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/results/${id}`, { method: "DELETE" });
      setResults((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {userName ? `${userName}'s Pattern Profile` : "Your Pattern Profile"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Your profile updates every time you take a test.
        </p>
      </div>

      {/* Profile confidence */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold text-gray-900">
              {CONFIDENCE_LABELS[confidenceLevel]}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              {CONFIDENCE_DESCRIPTIONS[confidenceLevel]}
            </p>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {confidencePercent}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-500"
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {NEXT_MILESTONE[confidenceLevel]}
        </p>
      </div>

      {/* Trait Profile */}
      {traitData.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Trait Pattern
          </h2>
          <div className="space-y-5">
            {traitData.map((td) => (
              <TraitBar
                key={td.trait}
                trait={td.trait}
                score={td.score}
                count={td.count}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-center">
          <p className="text-gray-500 text-sm">
            Your trait pattern will appear here after you take a few tests.
          </p>
        </div>
      )}

      {/* Suggested tests */}
      {suggested.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recommended Next Tests
          </h2>
          <div className="space-y-2">
            {suggested.map((quiz) => (
              <Link
                key={quiz.slug}
                href={`/quiz/${quiz.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
              >
                <span className="text-2xl">{quiz.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">
                    {quiz.title}
                  </p>
                  <p className="text-xs text-gray-500">{quiz.category}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  Take test →
                </span>
              </Link>
            ))}
          </div>
          {suggested.length < quizzes.length - takenSlugs.length && (
            <Link
              href="/quiz"
              className="block text-center text-sm text-gray-500 hover:text-gray-900 mt-3"
            >
              See all tests
            </Link>
          )}
        </div>
      )}

      {/* Recent results */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Results
        </h2>
        {results.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-gray-500 text-sm mb-4">
              No results yet. Take your first test to get started.
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Browse Tests
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100"
              >
                <span className="text-2xl">{result.quizEmoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {result.quizTitle}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-xs font-medium ${getLevelColor(result.level, result.resultColor)}`}
                    >
                      {result.resultLabel}
                    </span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400 capitalize">
                      {result.mode}
                    </span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/quiz/${result.quizSlug}`}
                    className="text-xs text-gray-400 hover:text-gray-700"
                  >
                    Retake
                  </Link>
                  <button
                    onClick={() => handleDeleteResult(result.id)}
                    disabled={deletingId === result.id}
                    className="text-xs text-gray-300 hover:text-red-500 transition-colors disabled:opacity-40"
                    title="Remove result"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account settings link */}
      <div className="border-t border-gray-100 pt-6">
        <Link
          href="/account"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          Account Settings & Privacy →
        </Link>
      </div>
    </div>
  );
}
