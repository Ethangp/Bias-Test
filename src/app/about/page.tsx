export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">About Pattern Check</h1>

      <div className="prose prose-stone max-w-none space-y-6 text-stone-600 leading-relaxed">
        <p>
          <strong className="text-stone-800">Pattern Check</strong> is a
          reflection-based quiz platform that helps people understand themselves
          and the people around them. Users take tests about dating, friendships,
          bias, personality, compatibility, conflict, and social behavior.
        </p>

        <p>
          Each test gives an immediate result, but also contributes to a larger{" "}
          <strong className="text-stone-800">Pattern Profile</strong> that
          updates over time. As the profile grows, the site surfaces patterns
          and helps clarify contradictions or repeated habits.
        </p>

        <hr className="border-stone-200" />

        <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
          What this site is not
        </h2>
        <ul className="space-y-2 list-disc pl-5 text-stone-500">
          <li>A diagnostic tool or mental health resource</li>
          <li>A way to prove or label anyone&apos;s identity or beliefs</li>
          <li>A replacement for honest conversations or professional support</li>
          <li>A way to out someone or confirm suspicions about them</li>
        </ul>

        <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
          What this site is
        </h2>
        <ul className="space-y-2 list-disc pl-5 text-stone-500">
          <li>A reflection tool for personal and social self-awareness</li>
          <li>A way to spot patterns you may not have noticed yet</li>
          <li>A starting point for conversations, not a conclusion</li>
          <li>A private, locally-stored record of your reflections</li>
        </ul>

        <hr className="border-stone-200" />

        <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
          How results are worded
        </h2>
        <p>
          This site uses careful language to avoid labeling or diagnosing.
          Results are phrased as pattern reads — not verdicts.
        </p>
        <p>
          You will never see results that say &ldquo;you are racist,&rdquo;
          &ldquo;you are gay,&rdquo; or &ldquo;your partner is a
          narcissist.&rdquo; You will see language like &ldquo;there may be
          signs of…&rdquo; or &ldquo;the answers suggest a pattern of…&rdquo;
          because that is more honest and more useful.
        </p>

        <hr className="border-stone-200" />

        <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-3">
          Privacy
        </h2>
        <p>
          All data is stored in your browser&apos;s localStorage. Nothing is
          sent to any server. No account signup is required. You can delete your
          profile or individual results at any time from the dashboard.
        </p>
        <p>
          Sensitive quiz data is never sold or shared, because it never leaves
          your device.
        </p>

        <hr className="border-stone-200" />

        <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-sm text-stone-500">
          <strong className="text-stone-700">Site Disclaimer:</strong> These
          quizzes are for reflection and pattern recognition, not diagnosis,
          proof, or professional evaluation. For identity quizzes: this test
          cannot define your identity. It can only help you reflect on patterns
          in attraction, curiosity, and comfort. For bias quizzes: this test
          cannot prove someone&apos;s beliefs or intent. It can help identify
          patterns that may be worth reflecting on.
        </div>
      </div>
    </div>
  );
}
