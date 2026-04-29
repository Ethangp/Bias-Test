import Link from "next/link";
import { CATEGORY_INFO } from "@/lib/quizzes";
import { QUIZ_REGISTRY as QUIZZES } from "@/data/quizzes";

export default function QuizzesPage() {
  const categories = Array.from(new Set(QUIZZES.map((q) => q.category)));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">All Tests</h1>
        <p className="text-stone-500">
          {QUIZZES.length} tests available · Each test updates your Pattern Profile
        </p>
      </div>

      {/* Category sections */}
      {categories.map((cat) => {
        const info = CATEGORY_INFO[cat];
        const quizzes = QUIZZES.filter((q) => q.category === cat);
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
    </div>
  );
}
