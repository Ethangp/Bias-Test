import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Implicit Association Test",
  description: "Discover hidden biases with a classic Implicit Association Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
