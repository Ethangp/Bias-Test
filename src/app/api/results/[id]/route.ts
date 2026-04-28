import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const { id } = await params;

    const result = await prisma.quizResult.findUnique({ where: { id } });
    if (!result || result.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    await prisma.quizResult.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
