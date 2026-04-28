import { quizzesBySlug } from "@/lib/quizData";
import { notFound } from "next/navigation";
import QuizTakeClient from "./QuizTakeClient";

export default async function QuizTakePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string; target?: string }>;
}) {
  const { slug } = await params;
  const { mode, target } = await searchParams;
  const quiz = quizzesBySlug[slug];
  if (!quiz) notFound();

  const resolvedMode: "self" | "observer" =
    mode === "observer" ? "observer" : "self";

  return (
    <QuizTakeClient
      quiz={quiz}
      mode={resolvedMode}
      target={target ?? "About myself"}
    />
  );
}
