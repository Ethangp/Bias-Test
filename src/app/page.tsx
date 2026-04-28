import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Implicit Association Test
          </h1>
          <p className="text-slate-400 text-lg">
            Discover hidden biases in how your mind associates concepts
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-left space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">How it works</h2>
          <ul className="space-y-3 text-slate-400">
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>You&apos;ll see words appear one at a time on screen.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>Press <kbd className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-sm font-mono">E</kbd> to categorize the word to the left, or <kbd className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-sm font-mono">I</kbd> for the right.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>Respond as quickly and accurately as possible — speed matters!</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">4.</span>
              <span>You&apos;ll complete several rounds. The pairing of categories changes between rounds.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-800 border border-amber-700/40 rounded-2xl p-6 text-left">
          <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">Important Note</h2>
          <p className="text-slate-400 text-sm">
            This test measures the strength of automatic associations and is intended for educational purposes only. Results reflect patterns in response times and do not definitively characterize any individual&apos;s beliefs or character.
          </p>
        </div>

        <Link
          href="/test"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors duration-200 shadow-lg shadow-blue-900/30"
        >
          Start Test →
        </Link>

        <p className="text-slate-600 text-sm">The test takes approximately 5–7 minutes to complete.</p>
      </div>
    </main>
  )
}
