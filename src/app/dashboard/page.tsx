"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAccount,
  createAccount,
  deleteAccount,
  deleteQuizResult,
  getRecommendedQuizSlugs,
  getConfidenceLevelLabel,
  getConfidenceLevelColor,
} from "@/lib/storage";
import { getLevelBadgeColor } from "@/lib/scoring";
import { UserAccount, TraitScore } from "@/types";
import { getQuizBySlug } from "@/data/quizzes";
import { CATEGORY_INFO } from "@/lib/quizzes";

export default function DashboardPage() {
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);

  useEffect(() => {
    const loadAccount = () => {
      const acc = getAccount();
      setAccount(acc);
      setLoading(false);
    };
    loadAccount();
  }, []);

  const handleCreate = () => {
    if (!username.trim()) return;
    setCreating(true);
    const acc = createAccount(username.trim() || "Explorer");
    setAccount(acc);
    setCreating(false);
  };

  const handleDeleteResult = (id: string) => {
    if (!account) return;
    const updated = deleteQuizResult(account, id);
    setAccount(updated);
    setDeleteConfirm(null);
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    setAccount(null);
    setShowDeleteAccountConfirm(false);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-stone-400">Loading…</div>
      </div>
    );
  }

  // No account — onboarding
  if (!account) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 mb-3">
            Your Pattern Profile
          </h1>
          <p className="text-stone-500 leading-relaxed">
            Create a profile to save your results and build a deeper view of
            your patterns over time. Everything stays on your device.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-6 text-left">
          <h2 className="font-semibold text-stone-800 mb-4">
            Set a display name
          </h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Your name or a nickname"
            className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm mb-4 outline-none focus:border-stone-400 transition-colors"
          />
          <button
            onClick={handleCreate}
            disabled={!username.trim() || creating}
            className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
          >
            Create My Profile
          </button>
        </div>

        <p className="text-xs text-stone-400">
          No email or password required. Your data is stored locally in your
          browser.
        </p>

        <div className="mt-8">
          <Link
            href="/quizzes"
            className="text-stone-500 hover:text-stone-700 underline text-sm"
          >
            Take a quiz without saving →
          </Link>
        </div>
      </div>
    );
  }

  const profile = account.profile;
  const traitScores = Object.values(profile.traits) as TraitScore[];
  const highTraits = traitScores
    .filter((t) => t.confidence >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  const recommendedSlugs = getRecommendedQuizSlugs(account);
  const confidenceColor = getConfidenceLevelColor(profile.confidenceLevel);

  const quizzesNeeded =
    profile.confidenceLevel === "starter"
      ? `Take ${Math.max(1, 3 - profile.completedQuizzes.length)} more test${profile.completedQuizzes.length === 2 ? "" : "s"} to develop your profile`
      : profile.confidenceLevel === "developing"
      ? `Take ${Math.max(1, 6 - profile.completedQuizzes.length)} more tests for a stronger profile`
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-stone-400 mb-1">Pattern Profile</div>
        <h1 className="text-3xl font-bold text-stone-900">
          {account.username}
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <span className={`text-sm font-medium ${confidenceColor}`}>
            {getConfidenceLevelLabel(profile.confidenceLevel)}
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-sm text-stone-400">
            {profile.completedQuizzes.length}{" "}
            {profile.completedQuizzes.length === 1 ? "test" : "tests"} completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Profile Confidence */}
        <div className="md:col-span-1 bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">
            Profile Confidence
          </h2>
          <div className="mb-3">
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-bold text-stone-900">
                {profile.profileConfidence}
              </span>
              <span className="text-stone-400 text-lg mb-0.5">%</span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-stone-900 rounded-full transition-all"
                style={{ width: `${profile.profileConfidence}%` }}
              />
            </div>
          </div>
          {quizzesNeeded && (
            <p className="text-xs text-stone-400 leading-relaxed">
              {quizzesNeeded}
            </p>
          )}
          {!quizzesNeeded && (
            <p className="text-xs text-stone-400 leading-relaxed">
              Strong profile · Keep taking tests to deepen insights
            </p>
          )}
        </div>

        {/* Strongest Patterns */}
        <div className="md:col-span-2 bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">
            Patterns Emerging
          </h2>
          {traitScores.length === 0 || highTraits.length === 0 ? (
            <p className="text-sm text-stone-400">
              Take a few tests to start building your profile.
            </p>
          ) : (
            <div className="space-y-3">
              {highTraits.map((trait) => (
                <div key={trait.key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-stone-700">{trait.label}</span>
                    <span className="text-stone-400 text-xs">{trait.score}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${trait.score}%`,
                        backgroundColor:
                          trait.score >= 65
                            ? "#22c55e"
                            : trait.score < 40
                            ? "#ef4444"
                            : "#94a3b8",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Strongest Patterns and Growth Areas */}
      {(profile.strongestPatterns.length > 0 ||
        profile.growthAreas.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {profile.strongestPatterns.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                Strongest Patterns
              </h2>
              <ul className="space-y-1">
                {profile.strongestPatterns.map((p) => (
                  <li key={p} className="text-sm text-green-800 flex gap-2">
                    <span>✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {profile.growthAreas.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
                Growth Areas
              </h2>
              <ul className="space-y-1">
                {profile.growthAreas.map((a) => (
                  <li key={a} className="text-sm text-amber-800 flex gap-2">
                    <span>→</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Recommended Tests */}
      {recommendedSlugs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedSlugs.map((s) => {
              const q = getQuizBySlug(s);
              if (!q) return null;
              const catInfo = CATEGORY_INFO[q.category];
              return (
                <Link
                  key={s}
                  href={`/quiz/${s}`}
                  className="group bg-white hover:bg-stone-50 border border-stone-200 rounded-xl p-5 transition-colors"
                >
                  <div className="text-xs text-stone-400 mb-1">
                    {catInfo?.emoji} {catInfo?.label}
                  </div>
                  <div className="font-medium text-stone-900 group-hover:text-stone-700">
                    {q.title}
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    ~{q.estimatedMinutes} min
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Tests */}
      {profile.completedQuizzes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">
            Recent Tests
          </h2>
          <div className="space-y-3">
            {[...profile.completedQuizzes]
              .reverse()
              .slice(0, 10)
              .map((cq) => (
                <div
                  key={cq.id}
                  className="bg-white border border-stone-200 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-stone-900 text-sm truncate">
                      {cq.quizTitle}
                    </div>
                    <div className="text-xs text-stone-400 mt-0.5">
                      {new Date(cq.completedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {cq.mode === "observer" &&
                        cq.observerTarget &&
                        ` · About: ${cq.observerTarget}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${getLevelBadgeColor(cq.resultLevel)}`}
                    >
                      {cq.resultLabel}
                    </span>
                    {deleteConfirm === cq.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteResult(cq.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="text-xs text-stone-400 hover:text-stone-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(cq.id)}
                        className="text-xs text-stone-300 hover:text-stone-500 transition-colors"
                        title="Delete result"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* All Tests Link */}
      <div className="text-center mb-8">
        <Link
          href="/quizzes"
          className="bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-700 transition-colors text-sm"
        >
          Take a Test
        </Link>
      </div>

      {/* Privacy Controls */}
      <div className="border-t border-stone-200 pt-8">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">
          Privacy Controls
        </h2>
        <div className="space-y-2">
          <p className="text-xs text-stone-400 leading-relaxed mb-4">
            All data is stored locally in your browser. Nothing is sent to any
            server. You can delete your profile or individual results at any
            time.
          </p>
          {showDeleteAccountConfirm ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-sm text-red-700 mb-3">
                This will permanently delete your profile and all saved results.
                Are you sure?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowDeleteAccountConfirm(false)}
                  className="text-stone-500 text-sm hover:text-stone-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteAccountConfirm(true)}
              className="text-sm text-red-400 hover:text-red-600 transition-colors"
            >
              Delete my profile and all results
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
