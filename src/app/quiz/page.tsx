import { quizzes, quizzesByCategory } from "@/lib/quizData";
import QuizCard from "@/components/QuizCard";

export default function QuizBrowsePage() {
  const categories = Object.values(quizzesByCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Tests</h1>
        <p className="text-gray-500 mt-2">
          {quizzes.length} reflection-based tests. Take one now — no account
          needed.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.slug}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.quizzes.map((quiz) => (
                <QuizCard key={quiz.slug} quiz={quiz} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
