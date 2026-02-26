"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import Logo from "@/components/Logo";
import AppModal from "@/components/AppModal";
import { ArrowRight, Rocket, Sparkles, X } from "lucide-react";

type SeriesProduct = {
  id: string;
  name: string;
  series: string;
  description: string;
};

const SERIES_FILTERS = ["All", "Spot", "Cue", "Framer", "Mime", "Education", "Ultra"] as const;

const SERIES_PRODUCTS: SeriesProduct[] = [
  {
    id: "spot-12",
    name: "Spot 12",
    series: "Spot",
    description: "Compact on-camera prompter with punchy brightness for tight spaces.",
  },
  {
    id: "spot-22",
    name: "Spot 22",
    series: "Spot",
    description: "Sharper glass and fast setup for small broadcast studios.",
  },
  {
    id: "cue-24",
    name: "Cue 24",
    series: "Cue",
    description: "Balanced prompter engineered for dynamic studio cueing.",
  },
  {
    id: "cue-32",
    name: "Cue 32",
    series: "Cue",
    description: "Studio-ready system for newsrooms and live control rooms.",
  },
  {
    id: "framer-15",
    name: "Framer 15",
    series: "Framer",
    description: "Flexible framing prompter designed for content creators.",
  },
  {
    id: "mime-18",
    name: "Mime 18",
    series: "Mime",
    description: "Minimalist glass build ideal for sleek corporate stages.",
  },
  {
    id: "edu-27",
    name: "Edu 27",
    series: "Education",
    description: "Classroom-friendly prompter for clear, confident teaching.",
  },
  {
    id: "ultra-55",
    name: "Ultra 55",
    series: "Ultra",
    description: "Massive display designed for flagship broadcast productions.",
  },
];

export default function HomePage() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [activeSeries, setActiveSeries] = useState<(typeof SERIES_FILTERS)[number] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [swOpen, setSwOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState<"mac" | "windows" | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  const guideLinks = {
    mac: "https://youtu.be/hck8hsSO3FQ?si=Ot77tbXqykFgjosj",
    windows: "https://youtu.be/qAH4Op5iGHk?si=aPP3OiJ6tepwTHly",
  } as const;

  const aboutVideos = [
    "https://youtu.be/3V9xlKOeVUU?si=hHj9QXSKZSjExFHF",
    "https://youtu.be/FH0V4LEi4VA?si=skigDDCMjnsTx0Bl",
  ];

  const getYouTubeEmbedUrl = (url: string) => {
    const match =
      url.match(/youtu\.be\/([A-Za-z0-9_-]+)/) ||
      url.match(/v=([A-Za-z0-9_-]+)/) ||
      url.match(/embed\/([A-Za-z0-9_-]+)/);
    if (!match) return null;
    return `https://www.youtube.com/embed/${match[1]}`;
  };

  const filteredProducts = useMemo(() => {
    if (!activeSeries) return [];
    if (activeSeries === "All") return SERIES_PRODUCTS;
    return SERIES_PRODUCTS.filter((product) => product.series === activeSeries);
  }, [activeSeries]);

  const handleOpenChat = () => {
    window.dispatchEvent(new Event("crystal-chat-open"));
  };

  const handleScrollToSeries = () => {
    const section = document.getElementById("series-section");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleOpenWebApp = () => setSwOpen(true);
    window.addEventListener("crystal-open-webapp", handleOpenWebApp);
    return () => window.removeEventListener("crystal-open-webapp", handleOpenWebApp);
  }, []);

  useEffect(() => {
    const handleOpenAbout = () => setAboutOpen(true);
    window.addEventListener("crystal-open-about-videos", handleOpenAbout);
    return () => window.removeEventListener("crystal-open-about-videos", handleOpenAbout);
  }, []);

  const heroTeleprompter = {
    name: "Cue 24",
    image:
      "https://static.wixstatic.com/media/d0630a_a36e5bf9e50449b294ec877e9525391c~mv2.png/v1/fill/w_1200%2Ch_900%2Cal_c%2Cq_90%2Cenc_avif%2Cquality_auto/c%2024.png",
  };

  const scriptLines = [
    "The Most Convenient and Stable Teleprompter Software",
    "Crystal Prompter WebApp Beta 1.0",
    "Crystal Prompter is a professional manufacturer that has specialized in producing medium-to-large teleprompters (22 inches and larger) for over 20 years.",
    "Designed for ultimate convenience and accessibility, the Crystal Prompter WebApp is our in-house developed operating software.",
    "When paired with our ultra-bright and crystal-clear hardware, this software provides a seamless prompting experience.",
    "Our goal is to provide powerful, professional software alongside the highest quality displays.",
    "With Crystal Prompter’s intuitive interface, simply write your script and click the \"Prompting\" icon.",
    "You’ll be ready to perform like a world-class orator or a professional creator in seconds.",
  ];

  return (
    <main className="bg-[color:var(--page-bg)] text-[color:var(--text-primary)]">
      {announcementVisible && (
        <div className="border-b border-black/10 bg-[#fff3a6] text-slate-900">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setSwOpen(true)}
              className="inline-flex items-center gap-2 text-left underline decoration-slate-900/30 underline-offset-4 transition hover:opacity-80"
            >
              <Rocket className="h-4 w-4" strokeWidth={2} />
              Now Live: Crystal Prompter WebApp Beta 1.0 — Seamless Teleprompting Anywhere, Even Offline.
            </button>
            <button
              type="button"
              onClick={() => setAnnouncementVisible(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition hover:bg-black/20"
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--page-grad-from),var(--page-grad-via),var(--page-grad-to))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_55%)]" />
        <div className="absolute left-1/3 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.35),rgba(26,60,110,0.08),transparent)] blur-3xl animate-glowShift" />
        <div className="absolute right-[-80px] top-16 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(26,60,110,0.45),transparent)] opacity-70 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 opacity-20 [background:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(180deg,var(--scanline),var(--scanline)_1px,transparent_1px,transparent_5px)]" />

        <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center gap-8 px-6 pt-12 pb-12 lg:flex-row lg:items-center lg:pt-12 lg:pb-12">
          <div className="flex w-full flex-col items-start gap-6 text-left lg:w-[55%]">
            <div className="space-y-4">
              <h1 className="text-7xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-8xl lg:text-[96px]">
                Professional
                <span className="block text-blue-400">Prompters</span>
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--text-subtle)]">
                Made in Korea
              </p>
              <p className="max-w-xl text-base font-light text-[color:var(--text-muted)] sm:text-lg">
                Trusted by broadcasters, educators, politicians, and content creators across South Korea and the world.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleScrollToSeries}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] backdrop-blur transition hover:border-[color:var(--glass-hover-border)] hover:bg-[color:var(--glass-hover-bg)]"
              >
                View Products
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
              <a
                href="mailto:sales@crystalprompter.co.kr?subject=Rental%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] backdrop-blur transition hover:border-[color:var(--glass-hover-border)] hover:bg-[color:var(--glass-hover-bg)]"
              >
                Rental Inquiry
              </a>
              <button
                type="button"
                onClick={() => setSwOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-gradient-to-r from-emerald-400 to-green-400 px-9 py-4 text-lg font-semibold text-emerald-950 shadow-[0_18px_40px_rgba(34,197,94,0.35)] transition hover:from-emerald-300 hover:to-green-300 hover:shadow-[0_22px_50px_rgba(34,197,94,0.5)]"
              >
                <Sparkles className="h-5 w-5 text-emerald-950" strokeWidth={2} />
                Crystal Prompter SW
                <span className="rounded-full bg-emerald-950/10 px-2.5 py-0.5 text-[11px] font-bold tracking-[0.2em] text-emerald-950">
                  FREE
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:w-[45%]">
            <div className="absolute h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.35),transparent)] blur-3xl" />
            <div className="prompter-frame relative w-full max-w-[720px] min-h-[420px] overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/60 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="relative flex min-h-[360px] items-center justify-center">
                <img src={heroTeleprompter.image} alt={heroTeleprompter.name} loading="lazy" className="prompter-image" />
                <div
                  className="prompter-glass"
                  style={{ top: "26%", left: "18%", width: "64%", height: "28%" }}
                >
                  <span className="prompter-toggle-left" aria-hidden />
                  <div className="prompter-bar">
                    <span className="prompter-bar-icon" aria-hidden>
                      ≡
                    </span>
                    <span className="prompter-bar-title">Crystal Prompter</span>
                    <span className="prompter-bar-actions" aria-hidden>
                      <span className="prompter-pill prompter-pill-muted">Script Edit</span>
                      <span className="prompter-pill prompter-pill-active">Prompting</span>
                      <span className="prompter-settings">⚙</span>
                    </span>
                  </div>
                  <div className="prompter-mask">
                    <div className="prompter-text-inner">
                      <div className="prompter-text space-y-4">
                        {scriptLines.map((line, index) => (
                          <p key={`${line}-${index}`}>{line}</p>
                        ))}
                        {scriptLines.map((line, index) => (
                          <p key={`repeat-${line}-${index}`}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[color:var(--text-muted)]">
                <span>Crystal Cue Series • Live Script</span>
                <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--glass-bg)] px-2 py-1 text-[10px] uppercase tracking-[0.25em]">
                  Auto Scroll
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="series-section" className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">Series Filter</p>
          <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">Find the right prompter series</h2>
          <p className="max-w-2xl text-sm text-[color:var(--text-subtle)]">
            Select a series to reveal the lineup built for your production workflow.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {SERIES_FILTERS.map((filter) => {
            const isActive = activeSeries === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveSeries(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  isActive
                    ? "border-blue-400 bg-blue-500/20 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    : "border-[color:var(--border)] bg-[color:var(--surface-soft)] text-[color:var(--text-muted)] hover:border-blue-400/60 hover:text-[color:var(--text-primary)]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {!activeSeries && (
            <div className="rounded-2xl border border-[color:var(--border)] bg-black/40 px-4 py-6 text-center text-sm text-[color:var(--text-muted)]">
              Select a series above to reveal matching products.
            </div>
          )}

          {activeSeries && filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-[color:var(--border)] bg-black/40 px-4 py-6 text-center text-sm text-[color:var(--text-muted)]">
              No products are listed for the {activeSeries} series yet. Try another filter.
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[color:var(--text-primary)]">{product.name}</h3>
                    <span className="rounded-full bg-blue-500/20 px-2 py-1 text-[11px] font-semibold text-blue-200">
                      {product.series}
                    </span>
                  </div>
                  <p className="text-sm text-[color:var(--text-subtle)]">{product.description}</p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-blue-200"
                  >
                    View full lineup
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AppModal
        open={modalOpen}
        title="Book a Crystal Prompter Demo"
        description="Tell us about your production and we'll tailor a demo kit and quote within 24 hours."
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-4 text-sm text-white/80">
          <p>
            Email our team at{" "}
            <a className="font-semibold text-blue-300" href="mailto:sales@crystalprompter.co.kr">
              sales@crystalprompter.co.kr
            </a>
            . We can arrange a guided walkthrough or recommend the right series for your studio.
          </p>
          <button
            type="button"
            onClick={() => {
              setModalOpen(false);
              handleOpenChat();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2 text-xs font-semibold text-white transition hover:bg-blue-400"
          >
            Open Crystal Assistant
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </AppModal>

      <AppModal
        open={swOpen}
        title="Crystal Prompter WebApp"
        description="Try the free teleprompter software in a secure preview window."
        maxWidthClass="max-w-4xl"
        panelClassName="max-w-4xl"
        onClose={() => setSwOpen(false)}
      >
        <div className="flex flex-nowrap items-center gap-2 pb-3 text-sm text-slate-600">
          <button
            type="button"
            onClick={() => setGuideOpen("mac")}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-[#3B82F6] bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#93c5fd] hover:bg-[#dbeafe] hover:text-[#1a3c6e]"
          >
            Watch Installation Guide (MacOS)
          </button>
          <button
            type="button"
            onClick={() => setGuideOpen("windows")}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-[#3B82F6] bg-[#3B82F6] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#93c5fd] hover:bg-[#dbeafe] hover:text-[#1a3c6e]"
          >
            Watch Installation Guide (Windows)
          </button>
          <a
            href="https://crystalprompterkr1.netlify.app/?fbclid=IwY2xjawQLt1ZleHRuA2FlbQIxMABicmlkETEyZ2hQYWFmRlNxVHROSlRNc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHplRftNetybFomHxpO7ReyxmEX-v3DEbnQXy0d19z9hsxUGQu8dyjG2c9jUs_aem_zs6PUk8JiJkupv2OtYdUVA"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-[150px] items-center justify-center rounded-full border border-[#0000FF] bg-[#0000FF] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#93c5fd] hover:bg-[#dbeafe] hover:text-[#1a3c6e]"
          >
            Open in new tab
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <iframe
            title="Crystal Prompter WebApp"
            src="https://crystalprompterkr1.netlify.app/?fbclid=IwY2xjawQLt1ZleHRuA2FlbQIxMABicmlkETEyZ2hQYWFmRlNxVHROSlRNc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHplRftNetybFomHxpO7ReyxmEX-v3DEbnQXy0d19z9hsxUGQu8dyjG2c9jUs_aem_zs6PUk8JiJkupv2OtYdUVA"
            className="h-[70vh] w-full"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </AppModal>

      <AppModal
        open={Boolean(guideOpen)}
        title={guideOpen === "mac" ? "Installation Guide MacOS" : "Installation Guide Windows"}
        maxWidthClass="max-w-5xl"
        panelClassName="max-w-5xl"
        onClose={() => setGuideOpen(null)}
      >
        {guideOpen && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="aspect-video w-full">
              <iframe
                title="Installation Guide"
                src={getYouTubeEmbedUrl(guideOpen === "mac" ? guideLinks.mac : guideLinks.windows) ?? ""}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </AppModal>

      <AppModal
        open={aboutOpen}
        title="About Crystal Prompter"
        description="Watch the latest Crystal Prompter introduction videos."
        maxWidthClass="max-w-5xl"
        panelClassName="max-w-5xl"
        onClose={() => setAboutOpen(false)}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {aboutVideos.map((video) => {
            const embedUrl = getYouTubeEmbedUrl(video);
            if (!embedUrl) return null;
            return (
              <div key={video} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-video w-full">
                  <iframe
                    title="Crystal Prompter Video"
                    src={embedUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            );
          })}
        </div>
      </AppModal>

      <ChatWidget />
    </main>
  );
}
