import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()

  const { sessionId, category, score } = body

  if (typeof sessionId !== 'string' || sessionId.trim() === '') {
    return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 })
  }
  if (typeof category !== 'string' || category.trim() === '') {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
  }
  if (typeof score !== 'number' || !isFinite(score)) {
    return NextResponse.json({ error: 'Invalid score' }, { status: 400 })
  }

  const result = await prisma.testResult.create({
    data: {
      sessionId: sessionId.trim(),
      category: category.trim(),
      score,
    },
  })
  return NextResponse.json(result)
}
