import { quizzesBySlug } from "@/lib/quizData";
import { notFound } from "next/navigation";
import QuizStartClient from "./QuizStartClient";

export async function generateStaticParams() {
  return Object.keys(quizzesBySlug).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = quizzesBySlug[slug];
  if (!quiz) return {};
  return {
    title: `${quiz.title} — Pattern Check`,
    description: quiz.description,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = quizzesBySlug[slug];
  if (!quiz) notFound();

  return <QuizStartClient quiz={quiz} />;
}
