import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="inline-block bg-stone-100 text-stone-500 text-xs font-medium px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
        404
      </div>
      <h1 className="text-3xl font-bold text-stone-900 mb-3">
        Page not found
      </h1>
      <p className="text-stone-500 leading-relaxed mb-8">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/quizzes"
          className="bg-stone-100 text-stone-800 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors"
        >
          Browse Tests
        </Link>
      </div>
    </div>
  );
}
