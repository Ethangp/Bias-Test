"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Quiz, ResultDescriptor } from "@/lib/quizData";
import { getLevelBgColor, getLevelColor } from "@/lib/scoring";
import { quizzes } from "@/lib/quizData";

interface QuizResultClientProps {
  quiz: Quiz;
  level: 1 | 2 | 3 | 4 | 5;
  mode: "self" | "observer";
  resultDescriptor: ResultDescriptor;
  resultId: string | null;
}

// Get other quizzes for recommendations
function getRecommendations(currentSlug: string, count = 3) {
  return quizzes
    .filter((q) => q.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

export default function QuizResultClient({
  quiz,
  level,
  mode,
  resultDescriptor,
  resultId,
}: QuizResultClientProps) {
  const { data: session } = useSession();
  const bgColor = getLevelBgColor(level, resultDescriptor.color);
  const textColor = getLevelColor(level, resultDescriptor.color);
  const recommendations = getRecommendations(quiz.slug);

  const levelBars = [1, 2, 3, 4, 5];

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Result card */}
      <div className={`rounded-2xl border p-6 mb-8 ${bgColor}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {quiz.emoji} {mode === "observer" ? quiz.titleObserver : quiz.titleSelf}
          </span>
          <div className="flex gap-1">
            {levelBars.map((bar) => (
              <div
                key={bar}
                className={`h-2 w-6 rounded-full transition-all ${
                  bar <= level ? "bg-current opacity-80" : "bg-gray-200"
                } ${textColor}`}
              />
            ))}
          </div>
        </div>

        <h1 className={`text-2xl font-bold mb-2 ${textColor}`}>
          {resultDescriptor.label}
        </h1>
        <p className="text-gray-700 font-medium mb-3">
          {resultDescriptor.description}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {resultDescriptor.details}
        </p>
      </div>

      {/* Disclaimer */}
      {quiz.disclaimer && (
        <p className="text-xs text-gray-400 mb-8 leading-relaxed text-center">
          {quiz.disclaimer}
        </p>
      )}

      {/* Actions */}
      <div className="space-y-3 mb-10">
        {session ? (
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="block w-full text-center bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-sm"
            >
              View My Pattern Profile
            </Link>
            {resultId && (
              <p className="text-xs text-center text-gray-400">
                Result saved to your profile.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-5 text-center">
            <p className="text-sm text-gray-700 font-medium mb-1">
              Save this result to your Pattern Profile
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Create an account to track how your answers change over time.
            </p>
            <div className="flex gap-2 justify-center">
              <Link
                href="/auth/signup"
                className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="/auth/signin"
                className="border border-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href={`/quiz/${quiz.slug}`}
            className="flex-1 text-center border border-gray-200 text-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors"
          >
            Retake Test
          </Link>
          <Link
            href="/quiz"
            className="flex-1 text-center border border-gray-200 text-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-50 transition-colors"
          >
            All Tests
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          You might also try
        </h2>
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <Link
              key={rec.slug}
              href={`/quiz/${rec.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
            >
              <span className="text-xl">{rec.emoji}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                <p className="text-xs text-gray-500">{rec.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
