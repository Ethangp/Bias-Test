"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_INFO } from "@/lib/quizzes";
import { QUIZ_REGISTRY as QUIZZES } from "@/data/quizzes";

export default function QuizzesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = Array.from(new Set(QUIZZES.map((q) => q.category)));

  const filtered = QUIZZES.filter((q) => {
    const matchesCategory =
      activeCategory === "all" || q.category === activeCategory;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      q.title.toLowerCase().includes(term) ||
      q.description.toLowerCase().includes(term) ||
      q.category.toLowerCase().includes(term) ||
      q.tags.some((t) => t.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  const displayCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">All Tests</h1>
        <p className="text-stone-500">
          {QUIZZES.length} tests available · Each test updates your Pattern Profile
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tests…"
          className="w-full sm:w-80 border border-stone-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-stone-400 transition-colors"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            activeCategory === "all"
              ? "bg-stone-900 text-white border-stone-900"
              : "border-stone-200 text-stone-500 hover:border-stone-400"
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const info = CATEGORY_INFO[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-stone-900 text-white border-stone-900"
                  : "border-stone-200 text-stone-500 hover:border-stone-400"
              }`}
            >
              {info?.emoji} {info?.label ?? cat}
            </button>
          );
        })}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-stone-400">
          No tests matched &ldquo;{search}&rdquo;
        </div>
      )}

      {/* Category sections */}
      {displayCategories.map((cat) => {
        const info = CATEGORY_INFO[cat];
        const quizzes = filtered.filter((q) => q.category === cat);
        if (!quizzes.length) return null;

        return (
          <section key={cat} className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">{info?.emoji}</span>
              <h2 className="text-lg font-semibold text-stone-800">
                {info?.label ?? cat}
              </h2>
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
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                    <span>~{quiz.estimatedMinutes} min</span>
                    {quiz.hasObserverMode && (
                      <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                        Self + Observer
                      </span>
                    )}
                    {quiz.isIdentityQuiz && (
                      <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                        Identity
                      </span>
                    )}
                    {quiz.comingSoon && (
                      <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
