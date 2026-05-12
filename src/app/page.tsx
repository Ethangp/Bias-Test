import Link from "next/link";
import { CATEGORY_INFO } from "@/lib/quizzes";
import { QUIZ_REGISTRY as QUIZZES } from "@/data/quizzes";

const FEATURED_SLUGS = [
  "am-i-the-problem",
  "is-my-friend-toxic",
  "preference-or-bias",
  "microaggression-checker",
  "does-my-friend-like-me",
  "is-this-a-situationship",
  "are-we-compatible",
  "am-i-overreacting",
  "should-i-confront-them",
  "do-i-people-please",
  "am-i-ready-to-date",
  "is-this-moving-too-fast",
];

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((slug) =>
    QUIZZES.find((q) => q.slug === slug)
  ).filter(Boolean);

  const categoryKeys = Array.from(
    new Set(QUIZZES.map((q) => q.category))
  ).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-stone-100 text-stone-600 text-xs font-medium px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Pattern Check
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6">
            See the patterns<br />
            <span className="text-stone-400">you may not notice yet.</span>
          </h1>
          <p className="text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Take reflection-based tests about personality, relationships, bias,
            conflict, and compatibility. Each answer helps build a deeper
            Pattern Profile over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quizzes"
              className="bg-stone-900 text-white px-8 py-3.5 rounded-full font-medium text-base hover:bg-stone-700 transition-colors"
            >
              Start a Test
            </Link>
            <Link
              href="/dashboard"
              className="bg-stone-100 text-stone-800 px-8 py-3.5 rounded-full font-medium text-base hover:bg-stone-200 transition-colors"
            >
              Build My Pattern Profile
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-10 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Take a test",
                body: "Choose from quizzes about dating, friendships, conflict, bias, compatibility, and self-awareness.",
              },
              {
                step: "2",
                title: "Get your result",
                body: "Receive a reflection-based result with clear next steps — not a diagnosis, a pattern read.",
              },
              {
                step: "3",
                title: "Build your profile",
                body: "Every answer updates your Pattern Profile, revealing repeated habits and tendencies over time.",
              },
              {
                step: "4",
                title: "Sharpen the read",
                body: "Recommended Pattern Checks confirm unclear patterns and unlock deeper insights.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl border border-stone-200 p-6"
              >
                <div className="w-9 h-9 rounded-full bg-stone-900 text-white text-sm font-bold flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tests */}
      <section className="py-12 px-4 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-stone-800">Featured Tests</h2>
            <Link
              href="/quizzes"
              className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map(
              (quiz) =>
                quiz && (
                  <Link
                    key={quiz.slug}
                    href={`/quiz/${quiz.slug}`}
                    className="group bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl p-5 transition-colors"
                  >
                    <div className="text-xs text-stone-400 uppercase tracking-wide mb-1">
                      {CATEGORY_INFO[quiz.category]?.emoji}{" "}
                      {CATEGORY_INFO[quiz.category]?.label ?? quiz.category}
                    </div>
                    <div className="font-medium text-stone-900 group-hover:text-stone-700 mb-1 leading-snug">
                      {quiz.title}
                    </div>
                    <div className="text-xs text-stone-400">
                      ~{quiz.estimatedMinutes} min
                      {quiz.hasObserverMode && " · Self or Observer mode"}
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      </section>

      {/* Your Answers Connect */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            Your Answers Connect
          </h2>
          <p className="text-stone-500 leading-relaxed text-base max-w-2xl mx-auto">
            Most quizzes give you one result and stop there. Here, every test
            connects to your broader{" "}
            <strong className="text-stone-700">Pattern Profile</strong>, helping
            reveal repeated habits across dating, friendships, conflict, bias,
            and self-awareness.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categoryKeys.map((cat) => {
              const info = CATEGORY_INFO[cat];
              if (!info) return null;
              const count = QUIZZES.filter((q) => q.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/quizzes?category=${cat}`}
                  className="group bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl p-5 transition-colors"
                >
                  <div className="text-2xl mb-2">{info.emoji}</div>
                  <div className="font-medium text-stone-900 mb-1">{info.label}</div>
                  <div className="text-xs text-stone-400">
                    {count} {count === 1 ? "test" : "tests"}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pattern Checks promo */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-stone-100 text-stone-500 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Coming Soon
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-4">
            Follow-Up Tests Sharpen the Read
          </h2>
          <p className="text-stone-500 leading-relaxed">
            When your answers show an unclear pattern, the site recommends short{" "}
            <strong className="text-stone-700">Pattern Checks</strong> to help
            confirm what&apos;s actually going on. Take more tests to unlock
            this feature.
          </p>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-12 px-4 bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3">Privacy and Trust</h2>
          <p className="text-stone-300 text-sm leading-relaxed max-w-xl mx-auto">
            Your results are private by default. Data is stored locally on your
            device — not on any server. You control what you save, share, or
            delete.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              "Private by default",
              "No accounts required",
              "Stored on your device",
              "Delete anytime",
            ].map((item) => (
              <span
                key={item}
                className="bg-stone-800 text-stone-300 text-xs px-3 py-1.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
