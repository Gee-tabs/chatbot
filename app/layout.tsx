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
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-5">
              <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-[color:var(--text-primary)] sm:gap-4 sm:text-lg">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[color:var(--text-primary)] shadow-[0_0_24px_rgba(59,130,246,0.4)] sm:h-11 sm:w-11">
                  <Logo className="h-5 w-5 sm:h-7 sm:w-7" />
                </span>
                Crystal Prompter
              </Link>
              <nav className="flex flex-wrap items-center justify-end gap-1 text-xs font-semibold text-[color:var(--text-muted)] sm:gap-4 sm:text-base">
                <Link
                  href="/products"
                  className="rounded-full border border-[color:var(--nav-border)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Products
                </Link>
                <Link
                  href="/#rental"
                  className="rounded-full border border-[color:var(--nav-border)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Rental
                </Link>
                <Link
                  href="/#about"
                  className="rounded-full border border-[color:var(--nav-border)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400 sm:px-4 sm:py-2 sm:text-sm"
                >
                  About
                </Link>
                <Link
                  href="/#contact"
                  className="rounded-full border border-[color:var(--nav-border)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--text-primary)] transition hover:border-blue-400 hover:text-blue-400 sm:px-4 sm:py-2 sm:text-sm"
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
