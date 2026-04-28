"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-gray-900">
          Pattern Check
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/quiz" className="hover:text-gray-900 transition-colors">
            All Tests
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-gray-900 transition-colors"
              >
                My Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-700 transition-colors"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-4 text-sm text-gray-700">
          <Link href="/quiz" onClick={() => setMenuOpen(false)}>
            All Tests
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/auth/signup" onClick={() => setMenuOpen(false)}>
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
