'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { buildBlocks, computeDScore, type Block, type TrialResult } from '@/lib/testData'

type Phase = 'instructions' | 'trial' | 'feedback' | 'between' | 'done'

const ERROR_DURATION = 400
const MIN_TRIAL_DURATION = 300

export default function TestPage() {
  const router = useRouter()
  const [blocks, setBlocks] = useState<Block[]>([])
  const [blockIndex, setBlockIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('instructions')
  const [trials, setTrials] = useState<TrialResult[]>([])
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [startTime, setStartTime] = useState<number>(0)
  const [submitting, setSubmitting] = useState(false)

  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    setBlocks(buildBlocks())
  }, [])

  const currentBlock = blocks[blockIndex]
  const currentWord = currentBlock?.words[wordIndex]

  const showNextWord = useCallback(() => {
    setFeedback(null)
    setPhase('trial')
    setStartTime(Date.now())
  }, [])

  const advanceWord = useCallback(() => {
    if (!currentBlock) return
    const nextWord = wordIndex + 1
    if (nextWord >= currentBlock.words.length) {
      const nextBlock = blockIndex + 1
      if (nextBlock >= blocks.length) {
        setPhase('done')
      } else {
        setBlockIndex(nextBlock)
        setWordIndex(0)
        setPhase('between')
      }
    } else {
      setWordIndex(nextWord)
      showNextWord()
    }
  }, [currentBlock, wordIndex, blockIndex, blocks.length, showNextWord])

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (phaseRef.current === 'between') {
        setPhase('instructions')
        return
      }
      if (phaseRef.current !== 'trial') return
      const key = e.key.toLowerCase()
      if (key !== 'e' && key !== 'i') return
      if (!currentWord || !currentBlock) return

      const rt = Date.now() - startTime
      if (rt < MIN_TRIAL_DURATION) return

      const correctKey = currentBlock.correctKey(currentWord)
      const correct = key === correctKey

      const trial: TrialResult = {
        word: currentWord.text,
        category: currentWord.category,
        block: currentBlock.id,
        responseTimeMs: rt,
        correct,
      }

      setTrials((prev) => [...prev, trial])

      if (correct) {
        setFeedback('correct')
        setTimeout(advanceWord, 150)
      } else {
        setFeedback('wrong')
        setTimeout(() => {
          setPhase('trial')
          setFeedback(null)
          setStartTime(Date.now())
        }, ERROR_DURATION)
      }
      setPhase('feedback')
    },
    [currentWord, currentBlock, startTime, advanceWord]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  useEffect(() => {
    if (phase === 'done' && !submitting) {
      setSubmitting(true)
      const { dScore, interpretation } = computeDScore(trials)
      const sessionId = crypto.randomUUID()

      fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          category: 'race-iat',
          score: dScore,
        }),
      })
        .then(() => {
          const params = new URLSearchParams({
            score: String(dScore),
            interpretation,
          })
          router.push(`/results?${params.toString()}`)
        })
        .catch(() => {
          const params = new URLSearchParams({
            score: String(dScore),
            interpretation,
          })
          router.push(`/results?${params.toString()}`)
        })
    }
  }, [phase, submitting, trials, router])

  if (blocks.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading test…</div>
      </div>
    )
  }

  if (phase === 'between' && currentBlock) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
        <div className="max-w-xl w-full text-center space-y-6">
          <h2 className="text-3xl font-bold">{currentBlock.title}</h2>
          <p className="text-slate-300 text-lg leading-relaxed">{currentBlock.instructions}</p>
          <div className="flex justify-between text-sm font-medium py-3 px-6 bg-slate-800 rounded-xl">
            <span className="text-blue-400">← E: {currentBlock.leftLabel}</span>
            <span className="text-purple-400">I: {currentBlock.rightLabel} →</span>
          </div>
          <p className="text-slate-500 text-sm">Press any key to continue</p>
        </div>
      </div>
    )
  }

  if (phase === 'instructions' && currentBlock) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-8">
        <div className="max-w-xl w-full text-center space-y-6">
          <h2 className="text-3xl font-bold">{currentBlock.title}</h2>
          <p className="text-slate-300 text-lg leading-relaxed">{currentBlock.instructions}</p>
          <div className="flex justify-between text-sm font-medium py-3 px-6 bg-slate-800 rounded-xl">
            <span className="text-blue-400">← E: {currentBlock.leftLabel}</span>
            <span className="text-purple-400">I: {currentBlock.rightLabel} →</span>
          </div>
          <button
            onClick={() => {
              setWordIndex(0)
              showNextWord()
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Begin →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'done' || submitting) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400">Calculating your results…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header with category labels */}
      {currentBlock && (
        <div className="flex justify-between items-start p-6">
          <div className="text-left">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">E key</div>
            <div className="text-blue-400 font-semibold">{currentBlock.leftLabel}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-600">{currentBlock.title}</div>
            <div className="text-xs text-slate-600">
              {wordIndex + 1} / {currentBlock.words.length}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">I key</div>
            <div className="text-purple-400 font-semibold">{currentBlock.rightLabel}</div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {currentBlock && (
        <div className="w-full h-1 bg-slate-800">
          <div
            className="h-full bg-blue-600 transition-all duration-200"
            style={{ width: `${((wordIndex + 1) / currentBlock.words.length) * 100}%` }}
          />
        </div>
      )}

      {/* Main trial area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {feedback === 'wrong' && (
          <div className="mb-6 text-red-400 text-4xl font-bold animate-pulse">✗</div>
        )}
        {currentWord && (
          <div
            className={`text-5xl font-bold transition-colors duration-100 ${
              feedback === 'wrong'
                ? 'text-red-400'
                : feedback === 'correct'
                ? 'text-green-400'
                : 'text-white'
            }`}
          >
            {currentWord.text}
          </div>
        )}
        <p className="mt-8 text-slate-600 text-sm">Press E or I to categorize</p>
      </div>

      {/* Key hints */}
      <div className="flex justify-between items-center p-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <kbd className="bg-slate-700 text-slate-200 px-3 py-1 rounded font-mono text-sm font-bold">E</kbd>
          <span className="text-slate-500 text-sm">Left</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-sm">Right</span>
          <kbd className="bg-slate-700 text-slate-200 px-3 py-1 rounded font-mono text-sm font-bold">I</kbd>
        </div>
      </div>
    </div>
  )
}
