import { quizzesBySlug } from "@/lib/quizData";
import { notFound } from "next/navigation";
import QuizResultClient from "./QuizResultClient";

export default async function QuizResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ level?: string; mode?: string; resultId?: string }>;
}) {
  const { slug } = await params;
  const { level, mode, resultId } = await searchParams;
  const quiz = quizzesBySlug[slug];
  if (!quiz) notFound();

  const resolvedLevel = Math.min(5, Math.max(1, parseInt(level ?? "1", 10))) as
    | 1
    | 2
    | 3
    | 4
    | 5;
  const resolvedMode: "self" | "observer" =
    mode === "observer" ? "observer" : "self";
  const resultDescriptor =
    quiz.results.find((r) => r.level === resolvedLevel) ?? quiz.results[0];

  return (
    <QuizResultClient
      quiz={quiz}
      level={resolvedLevel}
      mode={resolvedMode}
      resultDescriptor={resultDescriptor}
      resultId={resultId ?? null}
    />
  );
}
