"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAccount } from "@/lib/storage";
import { GLOBAL_NAV } from "@/lib/site-nav";

function navActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [hasAccount, setHasAccount] = useState(
    () => typeof window !== "undefined" && !!getAccount()
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setHasAccount(!!getAccount());
    });
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="font-semibold text-stone-800 hover:text-stone-600 transition-colors text-base sm:text-lg tracking-tight shrink-0"
        >
          Pattern Check
        </Link>

        <div className="hidden lg:flex flex-1 min-w-0 justify-end items-center gap-1 ml-4">
          <div className="flex items-center gap-0.5 overflow-x-auto max-w-[calc(100%-8rem)] scrollbar-none pb-0.5">
            {GLOBAL_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 whitespace-nowrap px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                  navActive(pathname, item.href)
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {!hasAccount && (
            <Link
              href="/dashboard"
              className="shrink-0 text-xs bg-stone-900 text-white px-3 py-1.5 rounded-full hover:bg-stone-700 transition-colors ml-2"
            >
              Get started
            </Link>
          )}
          <Link
            href="/about"
            className="shrink-0 text-xs text-stone-400 hover:text-stone-700 px-2 py-1 hidden xl:inline"
          >
            About
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          {!hasAccount && (
            <Link
              href="/dashboard"
              className="text-xs bg-stone-900 text-white px-3 py-1.5 rounded-full hover:bg-stone-700 transition-colors"
            >
              Start
            </Link>
          )}
          <button
            className="p-2 text-stone-600 rounded-md hover:bg-stone-100"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white max-h-[min(70vh,calc(100dvh-3.5rem))] overflow-y-auto">
          <div className="px-4 py-3 grid grid-cols-1 divide-y divide-stone-100">
            {GLOBAL_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 text-sm font-medium ${
                  navActive(pathname, item.href) ? "text-stone-900" : "text-stone-600"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="py-3 text-sm text-stone-500 hover:text-stone-800"
              onClick={() => setMenuOpen(false)}
            >
              About this site
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
