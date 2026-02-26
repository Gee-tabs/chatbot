import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Crystal Prompter | Chat Widget Demo",
  description: "Customer service chatbot widget for Crystal Prompter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={spaceGrotesk.className}>
        <div className="min-h-screen bg-[color:var(--page-bg)] text-[color:var(--text-primary)]">
          <header className="sticky top-0 z-40 border-b border-[color:var(--nav-border)] bg-[color:var(--nav-bg)] backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
              <Link href="/" className="flex items-center gap-4 text-lg font-semibold text-[color:var(--text-primary)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-[color:var(--text-primary)] shadow-[0_0_24px_rgba(59,130,246,0.4)]">
                  <Logo className="h-7 w-7" />
                </span>
                Crystal Prompter
              </Link>
              <nav className="flex items-center gap-4 text-base font-semibold text-[color:var(--text-muted)]">
                <Link
                  href="/products"
                  className="rounded-full border border-[color:var(--nav-border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400"
                >
                  Products
                </Link>
                <Link
                  href="/#rental"
                  className="rounded-full border border-[color:var(--nav-border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400"
                >
                  Rental
                </Link>
                <Link
                  href="/#about"
                  className="rounded-full border border-[color:var(--nav-border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400"
                >
                  About
                </Link>
                <Link
                  href="/#contact"
                  className="rounded-full border border-[color:var(--nav-border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400"
                >
                  Contact
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
