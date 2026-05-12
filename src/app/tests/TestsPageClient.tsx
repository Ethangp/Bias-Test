"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { CATEGORY_INFO } from "@/lib/quizzes";
import { QUIZ_REGISTRY } from "@/data/quizzes";
import {
  CORE_HUB_TESTS,
  ADVANCED_HUB_TESTS,
} from "@/lib/tests-hub";
import TestHubTile from "@/components/tests/TestHubTile";

export default function TestsPageClient() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const categories = useMemo(
    () => Array.from(new Set(QUIZ_REGISTRY.map((q) => q.category))),
    []
  );

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash === "#core") {
      document.getElementById("core-section")?.scrollIntoView({ behavior: "smooth" });
    }
    if (hash === "#bias-pack") {
      document.getElementById("bias-pack")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
          Take Tests
        </p>
        <h1 className="text-3xl font-bold text-stone-900 mb-3">Test hub</h1>
        <p className="text-stone-500 leading-relaxed">
          Start here for curated tracks, then browse every reflection test below.
          Each completion updates your Pattern Profile locally.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 underline underline-offset-4"
          >
            My Profile →
          </Link>
          <Link
            href="/search"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 underline underline-offset-4"
          >
            Search tests & traits →
          </Link>
        </div>
      </header>

      <section id="core-section" className="mb-14 scroll-mt-24">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-stone-900">Core tests</h2>
          <span className="text-sm text-stone-400">Mapped to live Pattern Check tests</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {CORE_HUB_TESTS.map((tile) => (
            <TestHubTile key={tile.id} tile={tile} />
          ))}
        </div>
      </section>

      <section id="bias-pack" className="mb-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-stone-900 mb-3">Bias reflection pack</h2>
        <p className="text-sm text-stone-500 mb-5 max-w-2xl">
          Three lenses on exclusion, impact, and blind spots — each opens a separate deep dive.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { slug: "preference-or-bias", label: "Preference vs. bias" },
            { slug: "microaggression-checker", label: "Microaggressions" },
            { slug: "racial-blind-spots", label: "Racial blind spots" },
          ].map((l) => (
            <Link
              key={l.slug}
              href={`/quiz/${l.slug}`}
              className="bg-white border border-stone-200 rounded-full px-4 py-2 text-sm font-medium text-stone-800 hover:border-stone-400 hover:bg-stone-50 transition-colors"
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-stone-900">Advanced tests</h2>
          <span className="text-sm text-stone-400">Pilot track</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {ADVANCED_HUB_TESTS.map((tile) => (
            <TestHubTile key={tile.id} tile={tile} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-stone-900 mb-2">All tests</h2>
        <p className="text-sm text-stone-500 mb-8">
          {categoryFilter ? (
            <>
              Filter: <span className="font-medium text-stone-700">{categoryFilter}</span> ·{" "}
              <Link href="/tests" className="underline hover:text-stone-800">
                Clear
              </Link>
            </>
          ) : (
            <>{QUIZ_REGISTRY.length} tests · grouped by category</>
          )}
        </p>

        {categories.map((cat) => {
          const quizzes = QUIZ_REGISTRY.filter((q) => q.category === cat);
          if (categoryFilter && cat !== categoryFilter) return null;
          if (!quizzes.length) return null;
          const info = CATEGORY_INFO[cat];
          return (
            <section key={cat} className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{info?.emoji}</span>
                <h3 className="text-lg font-semibold text-stone-800">
                  {info?.label ?? cat}
                </h3>
                <span className="text-sm text-stone-400">
                  {quizzes.length} {quizzes.length === 1 ? "test" : "tests"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {quizzes.map((quiz) => (
                  <Link
                    key={quiz.slug}
                    href={`/quiz/${quiz.slug}`}
                    className="group bg-white hover:bg-stone-50 border border-stone-200 rounded-xl p-5 transition-colors"
                  >
                    <div className="font-medium text-stone-900 group-hover:text-stone-700 leading-snug mb-2">
                      {quiz.title}
                    </div>
                    <p className="text-sm text-stone-400 line-clamp-2 leading-relaxed mb-3">
                      {quiz.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-stone-400">
                      <span>~{quiz.estimatedMinutes} min</span>
                      {quiz.hasObserverMode && (
                        <span className="bg-stone-100 px-2 py-0.5 rounded-full">
                          Self + Observer
                        </span>
                      )}
                      {quiz.isIdentityQuiz && (
                        <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                          Identity
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
