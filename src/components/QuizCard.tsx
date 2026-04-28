import Link from "next/link";
import { Quiz } from "@/lib/quizData";

interface QuizCardProps {
  quiz: Quiz;
  compact?: boolean;
}

export default function QuizCard({ quiz, compact = false }: QuizCardProps) {
  if (compact) {
    return (
      <Link
        href={`/quiz/${quiz.slug}`}
        className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
      >
        <span className="text-2xl mt-0.5">{quiz.emoji}</span>
        <div>
          <p className="font-medium text-gray-900 text-sm group-hover:text-gray-700">
            {quiz.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{quiz.category}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/quiz/${quiz.slug}`}
      className="block p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group bg-white"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{quiz.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 group-hover:text-gray-700">
            {quiz.title}
          </p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {quiz.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {quiz.category}
            </span>
            {quiz.hasObserverMode && (
              <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
                Self + Observer
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
