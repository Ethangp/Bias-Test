"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getAccount } from "@/lib/storage";

export default function Navbar() {
  const pathname = usePathname();
  const [hasAccount, setHasAccount] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateHasAccount = () => {
      const account = getAccount();
      setHasAccount(!!account);
    };
    updateHasAccount();
  }, [pathname]);

  const navLinks = [
    { href: "/quizzes", label: "Quizzes" },
    { href: "/dashboard", label: "My Profile" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-stone-800 hover:text-stone-600 transition-colors text-lg tracking-tight"
        >
          Pattern Check
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-stone-900 font-medium"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!hasAccount && (
            <Link
              href="/dashboard"
              className="text-sm bg-stone-900 text-white px-4 py-1.5 rounded-full hover:bg-stone-700 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-1 text-stone-600"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
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
        <div className="sm:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-stone-700 hover:text-stone-900"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!hasAccount && (
            <Link
              href="/dashboard"
              className="block py-2 text-sm font-medium text-stone-900"
              onClick={() => setMenuOpen(false)}
            >
              Get Started →
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
