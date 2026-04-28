"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleDeleteAccount() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await fetch("/api/profile", { method: "DELETE" });
      await signOut({ redirect: false });
      router.push("/");
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Account Settings
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Manage your privacy and account data.
      </p>

      <div className="space-y-6">
        {/* Privacy */}
        <div className="rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Privacy</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✓ Your results are private by default</li>
            <li>✓ We do not sell or share your quiz data</li>
            <li>✓ You can delete individual results from your dashboard</li>
            <li>✓ You can delete your account and all data below</li>
          </ul>
        </div>

        {/* Sign out */}
        <div className="rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-2">Sign Out</h2>
          <p className="text-sm text-gray-500 mb-4">
            Sign out of your account on this device.
          </p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Delete account */}
        <div className="rounded-2xl border border-red-100 p-5">
          <h2 className="font-semibold text-red-600 mb-2">Delete Account</h2>
          <p className="text-sm text-gray-500 mb-4">
            This will permanently delete your account and all test results. This
            cannot be undone.
          </p>
          {confirmDelete && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">
              Are you sure? Click the button again to permanently delete your
              account.
            </p>
          )}
          <button
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors disabled:opacity-40"
          >
            {deleting
              ? "Deleting…"
              : confirmDelete
                ? "Yes, Delete My Account"
                : "Delete My Account"}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 leading-relaxed">
          These quizzes are for reflection and pattern recognition, not
          diagnosis, proof, or professional evaluation. Pattern Check does not
          provide mental health services. If you need support, please speak with
          a qualified professional.
        </p>
      </div>
    </div>
  );
}
