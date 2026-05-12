import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-20 text-center text-stone-400 text-sm">
          Loading search…
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
