import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Pattern Check — See the patterns you may not notice yet",
  description:
    "Take reflection-based tests about personality, relationships, bias, conflict, and compatibility. Each answer helps build a deeper Pattern Profile over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
            <p>
              Pattern Check &mdash; These quizzes are for reflection and pattern
              recognition, not diagnosis, proof, or professional evaluation.
            </p>
            <p className="mt-1">
              Results are private by default.{" "}
              <a href="/quiz" className="underline hover:text-gray-600">
                Browse all tests
              </a>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
