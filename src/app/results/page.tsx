'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ResultsContent() {
  const params = useSearchParams()
  const rawScore = params.get('score')
  const interpretation = params.get('interpretation') ?? 'No interpretation available'
  const dScore = rawScore != null ? parseFloat(rawScore) : null

  const getScoreColor = (score: number) => {
    const abs = Math.abs(score)
    if (abs > 0.65) return score > 0 ? 'text-red-400' : 'text-orange-400'
    if (abs > 0.35) return score > 0 ? 'text-orange-400' : 'text-yellow-400'
    if (abs > 0.15) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getScoreLabel = (score: number) => {
    const abs = Math.abs(score)
    if (abs > 0.65) return 'Strong'
    if (abs > 0.35) return 'Moderate'
    if (abs > 0.15) return 'Slight'
    return 'Little to no'
  }

  const getBarWidth = (score: number) => {
    const clamped = Math.max(-1.5, Math.min(1.5, score))
    return `${((clamped + 1.5) / 3) * 100}%`
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Your Results</h1>
          <p className="text-slate-400">Based on your response times across all rounds</p>
        </div>

        {dScore != null ? (
          <>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center space-y-4">
              <div className="text-sm text-slate-500 uppercase tracking-wider">D-Score (Effect Size)</div>
              <div className={`text-7xl font-bold ${getScoreColor(dScore)}`}>
                {dScore > 0 ? '+' : ''}{dScore.toFixed(2)}
              </div>
              <div className="text-slate-300 text-lg font-medium">
                {getScoreLabel(dScore)} association detected
              </div>
            </div>

            {/* Score bar */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between text-xs text-slate-500">
                <span>African / Good</span>
                <span>No preference</span>
                <span>European / Good</span>
              </div>
              <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-0.5 h-full bg-slate-500 mx-auto" />
                </div>
                <div
                  className="absolute h-full w-3 bg-blue-400 rounded-full -translate-x-1/2"
                  style={{ left: getBarWidth(dScore) }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>−1.5</span>
                <span>0</span>
                <span>+1.5</span>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Interpretation</h2>
              <p className="text-slate-200 text-lg">{interpretation}</p>
            </div>

            <div className="bg-slate-800 border border-amber-700/30 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">About this score</h2>
              <div className="text-slate-400 text-sm space-y-2">
                <p>
                  The D-score measures the difference in average response times between the two combined rounds, normalized by the standard deviation of response times. A positive score means you were faster when European names were paired with Good words.
                </p>
                <p>
                  <strong className="text-slate-300">|D| &lt; 0.15</strong>: Little to no preference ·{' '}
                  <strong className="text-slate-300">0.15–0.35</strong>: Slight ·{' '}
                  <strong className="text-slate-300">0.35–0.65</strong>: Moderate ·{' '}
                  <strong className="text-slate-300">|D| &gt; 0.65</strong>: Strong
                </p>
                <p>
                  This result does not define you. Implicit associations are influenced by cultural exposure and can differ from your conscious beliefs and values.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center text-slate-400">
            No results found. Please complete the test first.
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Link
            href="/test"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Take Test Again
          </Link>
          <Link
            href="/"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">Loading results…</div>}>
      <ResultsContent />
    </Suspense>
  )
}
