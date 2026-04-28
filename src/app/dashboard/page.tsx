import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { quizzesBySlug, TRAIT_LABELS, TraitKey } from "@/lib/quizData";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/signin");

  const userId = session.user.id;

  const [traitScores, quizResults] = await Promise.all([
    prisma.traitScore.findMany({ where: { userId } }),
    prisma.quizResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Compute profile confidence
  const totalTests = quizResults.length;
  let confidenceLevel: "starter" | "developing" | "strong" | "deep";
  let confidencePercent: number;

  if (totalTests === 0) {
    confidenceLevel = "starter";
    confidencePercent = 0;
  } else if (totalTests <= 2) {
    confidenceLevel = "starter";
    confidencePercent = Math.round((totalTests / 3) * 20);
  } else if (totalTests <= 5) {
    confidenceLevel = "developing";
    confidencePercent = Math.round(20 + ((totalTests - 2) / 3) * 30);
  } else if (totalTests <= 10) {
    confidenceLevel = "strong";
    confidencePercent = Math.round(50 + ((totalTests - 5) / 5) * 30);
  } else {
    confidenceLevel = "deep";
    confidencePercent = Math.min(95, 80 + (totalTests - 10) * 1.5);
  }

  // Serialize for client
  const traitData = traitScores.map((ts) => ({
    trait: ts.trait as TraitKey,
    score: ts.score,
    count: ts.count,
    label: TRAIT_LABELS[ts.trait as TraitKey] ?? ts.trait,
  }));

  const resultData = quizResults.map((r) => ({
    id: r.id,
    quizSlug: r.quizSlug,
    quizTitle: quizzesBySlug[r.quizSlug]?.title ?? r.quizSlug,
    quizEmoji: quizzesBySlug[r.quizSlug]?.emoji ?? "📋",
    mode: r.mode,
    level: r.level,
    createdAt: r.createdAt.toISOString(),
    resultLabel:
      quizzesBySlug[r.quizSlug]?.results.find((res) => res.level === r.level)
        ?.label ?? `Level ${r.level}`,
    resultColor:
      quizzesBySlug[r.quizSlug]?.results.find((res) => res.level === r.level)
        ?.color ?? "gray",
  }));

  return (
    <DashboardClient
      userName={session.user.name ?? ""}
      traitData={traitData}
      resultData={resultData}
      totalTests={totalTests}
      confidenceLevel={confidenceLevel}
      confidencePercent={Math.round(confidencePercent)}
    />
  );
}
