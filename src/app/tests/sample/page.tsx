import Link from "next/link";
import { CORE_HUB_TESTS } from "@/lib/tests-hub";

export default function SampleResultsPage() {
  const slugs = [
    ...new Set(
      CORE_HUB_TESTS.map((t) => t.slug).filter((s): s is string => Boolean(s))
    ),
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
        Take Tests
      </p>
      <h1 className="text-3xl font-bold text-stone-900 mb-4">Sample results</h1>
      <p className="text-stone-500 leading-relaxed mb-10">
        Pattern Check is not diagnostic. Sample language below illustrates tone
        and structure — your actual bands depend entirely on your answers.
      </p>
      <div className="space-y-10">
        {slugs.map((id) => (
          <section key={id} id={id} className="scroll-mt-24">
            <h2 className="text-lg font-semibold text-stone-900 mb-2 capitalize">
              {id.replace(/-/g, " ")}
            </h2>
            <div className="bg-white border border-stone-200 rounded-2xl p-6 text-sm text-stone-600 leading-relaxed">
              Example output might read like: a short headline band (for example
              “Mixed pattern” or “Low concern”), a paragraph describing what that
              band reflects based on your answers, and bullet next steps. Open the
              test to see the real question set and scoring.
            </div>
            <Link
              href={`/quiz/${id}`}
              className="inline-block mt-4 text-sm font-medium text-stone-900 underline underline-offset-4 hover:text-stone-600"
            >
              Take this test →
            </Link>
          </section>
        ))}
      </div>
      <div className="mt-14">
        <Link href="/tests" className="text-sm text-stone-500 hover:text-stone-800 underline">
          ← Back to test hub
        </Link>
      </div>
    </div>
  );
}
