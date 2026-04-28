import Link from "next/link";
import { quizzes } from "@/lib/quizData";
import QuizCard from "@/components/QuizCard";

const FEATURED_SLUGS = [
  "am-i-the-problem",
  "is-my-friend-toxic",
  "is-this-preference-or-bias",
  "microaggression-checker",
  "does-my-friend-like-me",
  "is-this-a-situationship",
  "are-we-compatible",
  "am-i-overreacting",
  "should-i-confront-them",
];

const featuredQuizzes = FEATURED_SLUGS.map((slug) =>
  quizzes.find((q) => q.slug === slug)
).filter(Boolean);

const HOW_IT_WORKS = [
  {
    number: "1",
    title: "Take a test",
    description:
      "Choose from quizzes about dating, friendships, conflict, bias, compatibility, and self-awareness.",
  },
  {
    number: "2",
    title: "Get your result",
    description:
      "Receive a reflection-based result with clear context and next steps.",
  },
  {
    number: "3",
    title: "Build your profile",
    description:
      "Every answer updates your Pattern Profile across 12 trait categories.",
  },
  {
    number: "4",
    title: "Sharpen the read",
    description:
      "The more tests you take, the more accurate and useful your profile becomes.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-block mb-4 text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
          Pattern Check
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          See the patterns you may not notice yet.
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Take reflection-based tests about personality, relationships, bias,
          conflict, and compatibility. Each answer helps build a deeper Pattern
          Profile over time.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/quiz"
            className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-sm"
          >
            Start a Test
          </Link>
          <Link
            href="/auth/signup"
            className="border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Build My Pattern Profile
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tests */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Tests</h2>
          <Link
            href="/quiz"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredQuizzes.map(
            (quiz) => quiz && <QuizCard key={quiz.slug} quiz={quiz} />
          )}
        </div>
      </section>

      {/* Your answers connect */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your answers connect.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Most quizzes give you one result and stop there. Here, every test
            connects to your broader Pattern Profile, helping reveal repeated
            habits across dating, friendships, conflict, bias, and
            self-awareness.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
            {[
              "Self-Awareness",
              "Empathy",
              "Defensiveness",
              "Conflict Avoidance",
              "Boundary Strength",
              "People-Pleasing",
              "Social Perception",
              "Bias Awareness",
              "Emotional Availability",
              "Attachment Security",
              "Accountability",
              "Communication",
            ].map((trait) => (
              <div
                key={trait}
                className="bg-white border border-gray-100 rounded-xl px-3 py-2 text-center text-xs font-medium text-gray-600"
              >
                {trait}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Private by default.
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Your results are private by default. You control what you save, share,
          or delete. Take any test without an account — or create one to track
          your pattern profile over time.
        </p>
        <p className="mt-4 text-xs text-gray-400 max-w-md mx-auto">
          These quizzes are for reflection and pattern recognition, not
          diagnosis, proof, or professional evaluation.
        </p>
        <div className="mt-6">
          <Link
            href="/quiz"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors text-sm"
          >
            Take a Test
          </Link>
        </div>
      </section>
    </div>
  );
}
