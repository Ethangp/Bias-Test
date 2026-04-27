import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pattern Check — See the patterns you may not notice yet",
  description:
    "Take reflection-based tests about personality, dating, friendships, bias, conflict, and compatibility. Each answer helps build a deeper Pattern Profile over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 py-8 mt-16">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-stone-400">
            <p className="mb-1">
              <strong className="text-stone-600">Pattern Check</strong> — quizzes for reflection, not diagnosis
            </p>
            <p>
              Results are private by default. Your data stays on your device.{" "}
              <a href="/about" className="underline hover:text-stone-600">
                About this site
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
