"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import ChatMessage, { ChatMessage as ChatMessageType, ChatMessageOption, ChatProductCard } from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import AppModal from "./AppModal";
import Logo from "./Logo";
import products from "@/lib/products";
import { Clapperboard, GraduationCap, Mail, Mic, Minus, Phone, SendHorizontal, Users, Video, X } from "lucide-react";

type BrandIconProps = {
  src: string;
  label: string;
  className?: string;
};

function BrandIcon({ src, label, className }: BrandIconProps) {
  return <img src={src} alt={`${label} icon`} className={className} loading="lazy" />;
}


type ChatWindowProps = {
  open: boolean;
  messages: ChatMessageType[];
  isTyping: boolean;
  showQuickReplies: boolean;
  quickReplies: string[];
  onSend: (message: string) => void;
  onQuickReply: (message: string) => void;
  onClose: () => void;
};

function CrystalLogo() {
  const logoStyle: CSSProperties = {
    ["--logo-primary" as string]: "#ffffff",
    ["--logo-accent" as string]: "#3b82f6",
    ["--logo-frame" as string]: "rgba(255,255,255,0.5)",
  };

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15" style={logoStyle}>
      <Logo className="h-6 w-6 text-white" />
    </div>
  );
}

const OPTION_ICON_MAP: Record<string, typeof Video> = {
  youtube: Video,
  broadcast: Clapperboard,
  teaching: GraduationCap,
  speech: Mic,
  events: Users,
};

const OPTION_ICON_STYLES: Record<
  string,
  { icon: string; bg: string }
> = {
  youtube: { icon: "text-red-600", bg: "bg-red-100" },
  broadcast: { icon: "text-indigo-600", bg: "bg-indigo-100" },
  teaching: { icon: "text-emerald-600", bg: "bg-emerald-100" },
  speech: { icon: "text-amber-600", bg: "bg-amber-100" },
  events: { icon: "text-pink-600", bg: "bg-pink-100" },
};

type OptionListProps = {
  options: ChatMessageOption[];
  onSelect: (value: string) => void;
};

function OptionList({ options, onSelect }: OptionListProps) {
  const isSpecsList = options.every((option) => option.value?.includes("spec"));
  return (
    <div className={`mt-2 grid gap-2 ${isSpecsList ? "grid-cols-3" : "grid-cols-1"}`}>
      {options.map((option) => {
        const Icon = OPTION_ICON_MAP[option.id];
        const styles = OPTION_ICON_STYLES[option.id];
        const hasIcon = Boolean(Icon && styles);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.value ?? option.label)}
            className={`flex w-full items-center rounded-xl border border-[#b8ccff] bg-[#bcd3ff] px-3 py-1.5 text-xs font-semibold text-[#1a3c6e] shadow-sm transition hover:border-[#3b82f6] hover:bg-[#aac7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystalBlue/30 ${
              hasIcon ? "gap-2 text-left" : ""
            } ${isSpecsList ? "justify-center text-center" : "text-left"} `}
          >
            {hasIcon && (
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${styles.bg} ${styles.icon}`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            )}
            <span className={`${isSpecsList ? "" : "flex-1"} whitespace-nowrap`}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

const productsData = products;
const PRODUCT_INTRO_LINKS: Record<string, string> = {
  "framer-27": "https://youtube.com/shorts/EPa71dWjLKc?si=IvxI_3s14pfUq7-_",
  "framer-24": "https://youtube.com/shorts/X-3QRIOwAN0?si=eSw8-Tt9QBXqI9o5",
  "flex-15": "https://youtube.com/shorts/eeXqXDttNX4?si=iaaNhgwTpXlSFevm",
  "cue-32": "https://youtube.com/shorts/ZFNiWKEY71s?si=cITqrOPTO2yO9va0",
  "cue-27": "https://youtube.com/shorts/EPa71dWjLKc?si=SXYyVbL2_D3nbhFT",
  "cue-24": "https://youtube.com/shorts/jmy31E2XFgk?si=vCBGg8rVks-UvuYJ",
  "clone-16": "https://youtube.com/shorts/IJlVE8LUHZ0?si=LtXfG3zB9DRULWn_",
  "spot-18": "https://youtube.com/shorts/EPa71dWjLKc?si=r4Ob-5lLAtDEXxwv",
  "folder-22n": "https://youtube.com/shorts/M25aDrHFC9w?si=8E8MlAW5qR3YSUAu",
};

type ProductCardListProps = {
  products: ChatProductCard[];
  onOpenDetails: (productId: string) => void;
};

function ProductCardList({ products, onOpenDetails }: ProductCardListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollByAmount = 240;
  const [inquiryProductId, setInquiryProductId] = useState<string | null>(null);
  const phoneNumber = "+82 32-576-0277";
  const telLink = "tel:+82325760277";
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/instagram/E4405F",
    },
    {
      label: "YouTube",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/youtube/FF0000",
    },
    {
      label: "Facebook",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/facebook/1877F2",
    },
    {
      label: "TikTok",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/tiktok/000000",
    },
    {
      label: "KakaoTalk",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/kakaotalk/FFCD00",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollByAmount : scrollByAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-2">
      <button
        type="button"
        onClick={() => handleScroll("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-2 text-slate-500 shadow-sm transition hover:text-crystalBlue"
        aria-label="Scroll products left"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => handleScroll("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-2 text-slate-500 shadow-sm transition hover:text-crystalBlue"
        aria-label="Scroll products right"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 pr-2 pl-10 pr-10">
        {products.map((product) => {
          const details = productsData.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="min-w-[220px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex flex-col"
            >
              {details?.image && (
                <div className="mb-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <img src={details.image} alt={product.name} className="h-28 w-full object-cover" loading="lazy" />
                </div>
              )}
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{product.name}</p>
              <p className="mt-1 text-xs text-slate-600">{product.description}</p>
            </div>
            <div className="mt-3 flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => onOpenDetails(product.id)}
                className="inline-flex rounded-full border border-crystalBlue/30 bg-crystalBlue px-2 py-1 text-[10px] font-semibold text-white hover:border-crystalBlueDark hover:bg-white hover:text-crystalBlueDark whitespace-nowrap"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() =>
                  setInquiryProductId((prev) => (prev === product.id ? null : product.id))
                }
                className="inline-flex rounded-full border border-crystalBlue/30 bg-crystalBlue px-2 py-1 text-[10px] font-semibold text-white hover:border-crystalBlueDark hover:bg-white hover:text-crystalBlueDark whitespace-nowrap"
              >
                Inquire
              </button>
              <button
                type="button"
                onClick={() => onOpenDetails(product.id)}
                className="inline-flex rounded-full border border-crystalBlue/30 bg-crystalBlue px-2 py-1 text-[10px] font-semibold text-white hover:border-crystalBlueDark hover:bg-white hover:text-crystalBlueDark whitespace-nowrap"
              >
                Buy Now
              </button>
            </div>
            {inquiryProductId === product.id && (
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Inquire Via
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:sales@crystalprompter.com?subject=${encodeURIComponent(
                      `Crystal Prompter Inquiry - ${product.name}`,
                    )}`}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 hover:border-crystalBlue/40 hover:text-crystalBlue"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />
                    Email
                  </a>
                  <a
                    href={telLink}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 hover:border-crystalBlue/40 hover:text-crystalBlue"
                  >
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.6} />
                    {phoneNumber}
                  </a>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {socialLinks.map(({ label, href, src }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Crystal Prompter ${label}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-crystalBlue/40 hover:text-crystalBlue"
                    >
                      <BrandIcon src={src} label={label} className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default function ChatWindow({
  open,
  messages,
  isTyping,
  showQuickReplies,
  quickReplies,
  onSend,
  onQuickReply,
  onClose,
}: ChatWindowProps) {
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const quickReplyDisabled = useMemo(() => isTyping, [isTyping]);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [showSpecs, setShowSpecs] = useState(false);
  const [specsOnly, setSpecsOnly] = useState(false);
  const [introVideo, setIntroVideo] = useState<string | null>(null);
  const activeProduct = useMemo(
    () => (activeProductId ? productsData.find((item) => item.id === activeProductId) : null),
    [activeProductId],
  );
  const productIntroLink = activeProduct ? PRODUCT_INTRO_LINKS[activeProduct.id] : undefined;
  const phoneNumber = "+82 32-576-0277";
  const telLink = "tel:+82325760277";
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/instagram/E4405F",
    },
    {
      label: "YouTube",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/youtube/FF0000",
    },
    {
      label: "Facebook",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/facebook/1877F2",
    },
    {
      label: "TikTok",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/tiktok/000000",
    },
    {
      label: "KakaoTalk",
      href: "https://www.crystalprompter.com/",
      src: "https://cdn.simpleicons.org/kakaotalk/FFCD00",
    },
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!activeProductId) {
      setShowSpecs(false);
      setSpecsOnly(false);
    }
  }, [activeProductId]);

  const getYouTubeEmbedUrl = (url: string) => {
    const match =
      url.match(/youtu\.be\/([A-Za-z0-9_-]+)/) ||
      url.match(/shorts\/([A-Za-z0-9_-]+)/) ||
      url.match(/v=([A-Za-z0-9_-]+)/) ||
      url.match(/embed\/([A-Za-z0-9_-]+)/);
    if (!match) return null;
    return `https://www.youtube.com/embed/${match[1]}`;
  };

  useEffect(() => {
    const handleOpenSpecs = (event: Event) => {
      const customEvent = event as CustomEvent<{ productId?: string }>;
      if (!customEvent.detail?.productId) return;
      setActiveProductId(customEvent.detail.productId);
      setShowSpecs(true);
      setSpecsOnly(true);
    };
    window.addEventListener("crystal-open-specs", handleOpenSpecs as EventListener);
    return () => window.removeEventListener("crystal-open-specs", handleOpenSpecs as EventListener);
  }, []);

  useEffect(() => {
    const handleOpenDetails = (event: Event) => {
      const customEvent = event as CustomEvent<{ productId?: string }>;
      if (!customEvent.detail?.productId) return;
      setActiveProductId(customEvent.detail.productId);
      setShowSpecs(false);
      setSpecsOnly(false);
    };
    window.addEventListener("crystal-open-details", handleOpenDetails as EventListener);
    return () => window.removeEventListener("crystal-open-details", handleOpenDetails as EventListener);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setDraft("");
  };

  const handleOpenDetails = (productId: string) => {
    setActiveProductId(productId);
    setSpecsOnly(false);
    setShowSpecs(false);
  };

  return (
    <div
      id="crystal-chat-window"
      role="dialog"
      aria-modal="false"
      className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] origin-bottom-right rounded-2xl border border-slate-200 bg-slate-100/95 shadow-floating backdrop-blur transition-all duration-200 sm:bottom-24 sm:right-6 ${
        open
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-br from-crystalBlue to-crystalBlueDark px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <CrystalLogo />
          <div>
            <p className="text-sm font-semibold">Crystal Prompter AI Agent</p>
            <p className="text-xs text-white/70">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Online · Typically replies instantly
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Minimize chat"
          >
            <Minus className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="flex h-[500px] max-h-[calc(100vh-10rem)] flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              {message.options && message.role === "bot" && (
                <div className="flex justify-start">
                  <div className="max-w-[85%]">
                    <OptionList options={message.options} onSelect={onSend} />
                  </div>
                </div>
              )}
              {message.products && message.role === "bot" && (
                <div className="flex justify-start">
                  <div className="max-w-[85%]">
                    <ProductCardList
                      products={message.products}
                      onOpenDetails={handleOpenDetails}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
          <div ref={endRef} />
        </div>

        {showQuickReplies && (
          <div className="border-t border-slate-200 bg-white px-4 py-2">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400">
                Quick Replies
              </p>
              <QuickReplies items={quickReplies} onSelect={onQuickReply} disabled={quickReplyDisabled} />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="border-t border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full bg-slate-100 px-4 py-2">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type a message..."
                aria-label="Message input"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-crystalBlue transition hover:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystalBlue/30"
              aria-label="Send message"
            >
              <SendHorizontal className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </form>
      </div>

      <AppModal
        open={Boolean(activeProduct)}
        title={activeProduct?.name ?? "Product Details"}
        action={
          activeProduct ? (
            <div className="flex flex-wrap items-center gap-1">
              <a
                href="https://www.crystalprompter.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-crystalBlue/30 bg-crystalBlue px-2.5 py-1 text-[11px] font-semibold text-white transition hover:border-white hover:bg-white hover:text-crystalBlue"
              >
                Buy Now
              </a>
              <button
                type="button"
                onClick={() => {
                  setShowSpecs((prev) => !prev);
                  setSpecsOnly(false);
                }}
                className={`inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  showSpecs
                    ? "border-crystalBlueDark bg-crystalBlueDark text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
                }`}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setIntroVideo(productIntroLink ?? "pending")}
                className="inline-flex items-center justify-center rounded-full border border-crystalBlue/30 bg-white px-2.5 py-1 text-[11px] font-semibold text-crystalBlue transition hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
              >
                Watch Product Intro
              </button>
              <a
                href={`mailto:${activeProduct.contact}?subject=${encodeURIComponent(
                  `Crystal Prompter Quote Request - ${activeProduct.name}`,
                )}`}
                className="inline-flex items-center justify-center rounded-full border border-crystalBlue/30 bg-white px-2.5 py-1 text-[11px] font-semibold text-crystalBlue transition hover:border-white hover:bg-crystalBlueDark hover:text-white"
              >
                Request Quote
              </a>
            </div>
          ) : null
        }
        sidePanel={
          activeProduct && showSpecs ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <p className="text-2xl font-extrabold text-crystalBlueDark">
                  Specifications
                  {activeProduct ? (
                    <span className="ml-2 text-base font-semibold text-crystalBlueDark/60">
                      ({activeProduct.name})
                    </span>
                  ) : null}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveProductId(null);
                    setSpecsOnly(false);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
                  aria-label="Close specifications"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
              {activeProduct.specs && activeProduct.specs.length > 0 ? (
                <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 text-sm text-slate-600">
                  <table className="w-full border-collapse text-left text-sm">
                    <tbody>
                      {activeProduct.specs.map((spec) => (
                        <tr key={`${spec.label}-${spec.value}`} className="border-b border-slate-200">
                          <th className="w-2/5 py-2 pr-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            {spec.label}
                          </th>
                          <td className="py-2 text-sm text-slate-700">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">Specifications will be available soon.</p>
              )}
              {activeProduct ? (
                <a
                  href={`mailto:${activeProduct.contact}?subject=${encodeURIComponent(
                    `Crystal Prompter Quote Request - ${activeProduct.name}`,
                  )}`}
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-crystalBlue/30 bg-crystalBlue px-4 py-2 text-xs font-semibold text-white transition hover:border-crystalBlueDark hover:bg-white hover:text-crystalBlueDark"
                >
                  Request Quote
                </a>
              ) : null}
            </div>
          ) : null
        }
        hidePrimary={specsOnly}
        onClose={() => {
          setActiveProductId(null);
          setSpecsOnly(false);
        }}
      >
        {activeProduct && (
          <div className="space-y-4 text-sm text-slate-700">
            {activeProduct.image && (
              <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
                <img src={activeProduct.image} alt={activeProduct.name} className="h-48 w-full object-cover" />
              </div>
            )}
            <p className="text-slate-700">{activeProduct.description}</p>
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-crystalBlue">
                Features
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {activeProduct.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-crystalBlue/20 bg-crystalBlue/5 px-4 py-3">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-crystalBlue">
                Best For
              </p>
              <p className="mt-1 text-sm text-slate-700">{activeProduct.bestFor}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-crystalBlue">Connect</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <a
                  href={telLink}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-700 transition hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {phoneNumber}
                </a>
                <a
                  href={`mailto:${activeProduct.contact}?subject=${encodeURIComponent(
                    `Crystal Prompter Inquiry - ${activeProduct.name}`,
                  )}`}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-semibold text-slate-700 transition hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
                >
                  {activeProduct.contact}
                </a>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {socialLinks.map(({ label, href, src }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Crystal Prompter ${label}`}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-crystalBlueDark hover:bg-crystalBlueDark"
                  >
                    <BrandIcon src={src} label={label} className="h-4 w-4 group-hover:brightness-0 group-hover:invert" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </AppModal>

      <AppModal
        open={Boolean(introVideo)}
        title="Product Introduction"
        maxWidthClass="max-w-4xl"
        panelClassName="max-w-4xl"
        onClose={() => setIntroVideo(null)}
      >
        {introVideo === "pending" ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-600">
            Product introduction video will be available soon.
          </div>
        ) : (
          introVideo && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="aspect-video w-full">
                <iframe
                  title="Crystal Prompter Product Introduction"
                  src={getYouTubeEmbedUrl(introVideo) ?? ""}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )
        )}
      </AppModal>
    </div>
  );
}
