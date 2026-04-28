"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quiz } from "@/lib/quizData";

interface QuizStartClientProps {
  quiz: Quiz;
}

export default function QuizStartClient({ quiz }: QuizStartClientProps) {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<"self" | "observer">("self");
  const [selectedTarget, setSelectedTarget] = useState<string>(
    quiz.observerTargets?.[0] ?? "About myself"
  );

  function handleStart() {
    const params = new URLSearchParams({
      mode: selectedMode,
      target: selectedTarget,
    });
    router.push(`/quiz/${quiz.slug}/take?${params.toString()}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
          {quiz.category}
        </span>
        <div className="flex items-start gap-3 mt-2">
          <span className="text-4xl">{quiz.emoji}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-500 mt-2">{quiz.description}</p>
          </div>
        </div>
      </div>

      {/* Mode selection */}
      {quiz.hasObserverMode && (
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Who is this test about?
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedMode("self")}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                selectedMode === "self"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <span className="font-medium text-gray-900">Myself</span>
              <span className="text-gray-400 text-sm ml-2">
                — I'm reflecting on my own patterns
              </span>
            </button>
            <button
              onClick={() => setSelectedMode("observer")}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                selectedMode === "observer"
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <span className="font-medium text-gray-900">Someone else</span>
              <span className="text-gray-400 text-sm ml-2">
                — I'm reflecting on someone in my life
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Observer target */}
      {quiz.hasObserverMode &&
        selectedMode === "observer" &&
        quiz.observerTargets && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Who specifically?
            </p>
            <div className="flex flex-wrap gap-2">
              {quiz.observerTargets.map((target) => (
                <button
                  key={target}
                  onClick={() => setSelectedTarget(target)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                    selectedTarget === target
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {target}
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Info cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400 mb-1">Questions</p>
          <p className="font-semibold text-gray-900">
            {selectedMode === "observer" && quiz.questionsObserver
              ? quiz.questionsObserver.length
              : quiz.questionsSelf.length}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400 mb-1">Time</p>
          <p className="font-semibold text-gray-900">~3 min</p>
        </div>
      </div>

      {/* Traits affected */}
      <div className="mb-8">
        <p className="text-xs text-gray-400 mb-2">Traits this test updates</p>
        <div className="flex flex-wrap gap-1.5">
          {quiz.traits.map((trait) => (
            <span
              key={trait}
              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
            >
              {trait
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
            </span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      {quiz.disclaimer && (
        <p className="text-xs text-gray-400 mb-6 leading-relaxed">
          {quiz.disclaimer}
        </p>
      )}

      {/* Start button */}
      <button
        onClick={handleStart}
        className="w-full bg-gray-900 text-white py-3.5 rounded-full font-medium hover:bg-gray-700 transition-colors"
      >
        Start Test
      </button>
    </div>
  );
}
