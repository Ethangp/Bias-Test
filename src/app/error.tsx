"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-stone-900 mb-3">
        Something went wrong
      </h1>
      <p className="text-stone-500 leading-relaxed mb-8">
        An unexpected error occurred while loading this page. Your saved
        results were not affected — they live on your device.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => unstable_retry()}
          className="bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-stone-100 text-stone-800 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-200 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
