import { Suspense } from "react";
import TestsPageClient from "./TestsPageClient";

export default function TestsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-20 text-center text-stone-400">
          Loading tests…
        </div>
      }
    >
      <TestsPageClient />
    </Suspense>
  );
}
