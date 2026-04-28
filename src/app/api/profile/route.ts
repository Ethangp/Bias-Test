import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const userId = session.user.id;

    const [traitScores, quizResults] = await Promise.all([
      prisma.traitScore.findMany({ where: { userId } }),
      prisma.quizResult.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
    ]);

    return NextResponse.json({ traitScores, recentResults: quizResults });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const userId = session.user.id;

    // Delete all user data
    await prisma.quizResult.deleteMany({ where: { userId } });
    await prisma.traitScore.deleteMany({ where: { userId } });
    await prisma.account.deleteMany({ where: { userId } });
    await prisma.session.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
