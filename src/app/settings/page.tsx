"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteAccount, getAccount } from "@/lib/storage";
import type { UserAccount } from "@/types";

export default function SettingsPage() {
  const [account, setAccount] = useState<UserAccount | null>(() =>
    typeof window !== "undefined" ? getAccount() : null
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setAccount(getAccount());
    });
  }, []);

  const handleDelete = () => {
    deleteAccount();
    setAccount(null);
    setConfirmDelete(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
          Settings
        </p>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Controls</h1>
        <p className="text-stone-500 text-sm leading-relaxed">
          Pattern Check stores everything locally. These toggles describe the
          roadmap for personalization, exports, and notifications.
        </p>
      </header>

      <section className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
          Privacy
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          No account server, no ads SDK, no background sync. Clearing site data
          removes your profile — same as the delete control below.
        </p>
      </section>

      <section className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
          AI personalization
        </h2>
        <label className="flex items-center justify-between gap-4 text-sm text-stone-600">
          <span>Allow on-device summaries (future)</span>
          <input type="checkbox" disabled className="rounded border-stone-300" />
        </label>
        <p className="text-xs text-stone-400">
          When enabled, optional local models or private APIs could narrate your
          history. Off by default.
        </p>
      </section>

      <section className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
          Notifications
        </h2>
        <label className="flex items-center justify-between gap-4 text-sm text-stone-600">
          <span>Weekly reflection nudge</span>
          <input type="checkbox" disabled className="rounded border-stone-300" />
        </label>
      </section>

      <section id="share" className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 scroll-mt-24">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
          Share & export
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Public profile cards, archetype permalinks, and downloadable PDFs are
          planned. For now, screenshots from{" "}
          <Link href="/dashboard" className="underline hover:text-stone-900">
            My Profile
          </Link>{" "}
          stay on your device.
        </p>
        <button
          type="button"
          disabled
          className="text-sm font-medium text-stone-400 border border-stone-200 rounded-full px-4 py-2 cursor-not-allowed"
        >
          Download JSON (soon)
        </button>
      </section>

      <section className="bg-white border border-red-100 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-red-700 uppercase tracking-wide">
          Danger zone
        </h2>
        {account ? (
          confirmDelete ? (
            <div>
              <p className="text-sm text-red-700 mb-3">
                Delete {account.username} and every saved result on this device?
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-red-700"
                >
                  Yes, delete everything
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="text-sm text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Delete profile & local data
            </button>
          )
        ) : (
          <p className="text-sm text-stone-500">No profile on this device.</p>
        )}
      </section>

      <p className="text-xs text-stone-400">
        Looking for the science disclaimer?{" "}
        <Link href="/about" className="underline hover:text-stone-600">
          About this site
        </Link>
      </p>
    </div>
  );
}
