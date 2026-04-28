"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    // Auto sign in
    await signIn("credentials", { email, password, redirect: false });
    router.push("/dashboard");
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
      <p className="text-gray-500 text-sm mb-8">
        Build your Pattern Profile. Track patterns across tests. Results are
        private by default.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400"
            placeholder="At least 8 characters"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-700 transition-colors disabled:opacity-40"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Your results are private by default. You can delete your account at
          any time.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-gray-900 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
