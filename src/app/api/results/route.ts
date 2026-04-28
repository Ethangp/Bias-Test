import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { scoreQuiz } from "@/lib/scoring";
import { quizzesBySlug, TraitKey } from "@/lib/quizData";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { quizSlug, mode, answers } = await req.json();

    const quiz = quizzesBySlug[quizSlug];
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    const result = scoreQuiz(quiz, answers, mode);

    if (session?.user?.id) {
      const userId = session.user.id;

      const savedResult = await prisma.quizResult.create({
        data: {
          userId,
          quizSlug,
          mode,
          score: result.totalScore,
          level: result.level,
          answers: JSON.stringify(answers),
        },
      });

      // Update trait scores
      for (const [trait, delta] of Object.entries(result.traitDeltas) as [
        TraitKey,
        number,
      ][]) {
        await prisma.traitScore.upsert({
          where: { userId_trait: { userId, trait } },
          update: {
            score: { increment: delta },
            count: { increment: 1 },
          },
          create: {
            userId,
            trait,
            score: delta,
            count: 1,
          },
        });
      }

      return NextResponse.json({ result, savedResultId: savedResult.id });
    }

    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const results = await prisma.quizResult.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
