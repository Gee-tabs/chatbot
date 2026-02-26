"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";
import type {
  ChatContact,
  ChatMedia,
  ChatMessage as ChatMessageType,
  ChatMessageOption,
  ChatProductCard,
} from "./ChatMessage";
import { MessageCircle, X } from "lucide-react";
import products from "@/lib/products";

const WELCOME_MESSAGE = `Hello! I’m Daniel 😊
Your Crystal Prompter AI agent.

I’m here to help you with everything from product details and purchasing to setup and support. Feel free to ask me anything!`;

const QUICK_REPLIES = [
  "Find a Prompter",
  "Rental Info",
  "Contact Sales",
  "About Us",
];

const FIND_OPTIONS: ChatMessageOption[] = [
  { id: "youtube", label: "YouTube / Content Creation" },
  { id: "broadcast", label: "Broadcasting & Film" },
  { id: "teaching", label: "Online Teaching" },
  { id: "speech", label: "Speech & Conferences" },
  { id: "events", label: "Events" },
];

const MOCK_RESPONSES = {
  find: `Great! I can help you find the perfect prompter.\nWhat will you use it for?`,
  rental: `We offer 24 hour rental service!
📞 Rental Hotline: +82-2-302-1000
Available 24 hours, 7 days a week.
Would you like to know more about 
our rental packages?`,
  contact: `You can reach our sales team here:
We typically respond within 1 business day!`,
  about: `Crystal Prompter is South Korea's #1 
professional prompter manufacturer! 🇰🇷
We produce high quality prompters for:
✅ Broadcasting & Film
✅ Education & E-Learning
✅ Speeches & Conferences
✅ YouTube & Content Creation
Located in Incheon, South Korea.`,
};

const DEFAULT_RESPONSES = [
  "Thanks for your message! For detailed\ninquiries please contact our team at\nsales@crystalprompter.co.kr 😊",
  "Great question! Our sales team can\nbest assist you with that.\nCall us at +82-32-576-0077 😊",
  "I'd love to help! Could you tell me\nmore about what you need the\nprompter for? 😊",
];

const CONTACT_INFO: ChatContact = {
  email: "sales@crystalprompter.co.kr",
  phone: "+82 32-576-0077",
  socials: [
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
  ],
};

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

const SW_MEDIA: ChatMedia = {
  title: "Crystal Prompter WebApp Beta 1.0",
  description:
    "The most convenient and stable teleprompter software, built in-house for Crystal Prompter displays.",
  bullets: [
    "Write your script and start prompting in seconds",
    "Works online or offline with ultra-clear hardware",
    "Made for broadcasters, educators, and creators",
  ],
  videos: [
    {
      title: "MacOS Installation",
      embedUrl: "https://www.youtube.com/embed/hck8hsSO3FQ",
    },
    {
      title: "Windows Installation",
      embedUrl: "https://www.youtube.com/embed/qAH4Op5iGHk",
    },
  ],
  actionsTitle: "Download Desktop App",
  actionsLayout: "grid",
  actions: [
    {
      label: "Windows 64-bit (KR)",
      href: "https://github.com/Soojung-Kang/Crystal-Teleprompter-Releases/releases/download/v2.5.2/CrystalPrompter-KR-Setup-2.5.2-win-x64.exe",
      variant: "download",
    },
    {
      label: "Mac (M1/M2) (KR)",
      href: "https://github.com/Soojung-Kang/Crystal-Teleprompter-Releases/releases/download/v2.5.2/CrystalPrompter-KR-2.5.2-mac-arm64.dmg",
      variant: "download",
    },
    {
      label: "Mac (Intel) (KR)",
      href: "https://github.com/Soojung-Kang/Crystal-Teleprompter-Releases/releases/download/v2.5.2/CrystalPrompter-KR-2.5.2-mac-x64.dmg",
      variant: "download",
    },
    {
      label: "Windows 64-bit (Global)",
      href: "https://github.com/Soojung-Kang/Crystal-Teleprompter-Releases/releases/download/v2.5.2/CrystalPrompter-Global-Setup-2.5.2-win-x64.exe",
      variant: "download",
    },
    {
      label: "Mac (M1/M2) (Global)",
      href: "https://github.com/Soojung-Kang/Crystal-Teleprompter-Releases/releases/download/v2.5.2/CrystalPrompter-Global-2.5.2-mac-arm64.dmg",
      variant: "download",
    },
    {
      label: "Mac (Intel) (Global)",
      href: "https://github.com/Soojung-Kang/Crystal-Teleprompter-Releases/releases/download/v2.5.2/CrystalPrompter-Global-2.5.2-mac-x64.dmg",
      variant: "download",
    },
  ],
  secondaryActions: [
    {
      label: "Open Crystal Prompter WebApp",
      href: "https://crystalprompterkr1.netlify.app/?fbclid=IwY2xjawQLt1ZleHRuA2FlbQIxMABicmlkETEyZ2hQYWFmRlNxVHROSlRNc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHplRftNetybFomHxpO7ReyxmEX-v3DEbnQXy0d19z9hsxUGQu8dyjG2c9jUs_aem_zs6PUk8JiJkupv2OtYdUVA",
    },
  ],
};

const createMessage = (
  role: "user" | "bot",
  content: string,
  options?: ChatMessageOption[],
  products?: ChatProductCard[],
  link?: { label: string; href: string },
  media?: ChatMedia,
  contacts?: ChatContact,
): ChatMessageType => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  content,
  options,
  products,
  link,
  media,
  contacts,
});

const summarizeProduct = (description: string, size: string) => {
  const clean = description.replace(/\.$/, "");
  const combined = `${size} • ${clean}`;
  if (combined.length > 90) return `${combined.slice(0, 90).trim()}…`;
  return combined;
};

const buildProductCards = (matchedProducts: typeof products): ChatProductCard[] =>
  matchedProducts.map((product) => ({
    id: product.id,
    name: product.name,
    description: summarizeProduct(product.description, product.size),
  }));

const buildCategoryResponse = (label: string, categories: string[]) => {
  const matchedProducts = products.filter((product) => categories.includes(product.category));
  const cards = buildProductCards(matchedProducts);
  return [
    createMessage("bot", `Here are our ${label} prompters:`, undefined, cards),
    createMessage("bot", "Would you like more details on any of these?"),
  ];
};

const buildSpecOptions = (): ChatMessageOption[] =>
  products.map((product) => ({
    id: product.id,
    label: product.name,
    value: `${product.name} specs`,
  }));

const findProductForSpecs = (input: string) => {
  const normalized = input.toLowerCase();
  if (!normalized.includes("spec")) return null;

  const compactInput = normalized.replace(/[^a-z0-9]/g, "");

  return (
    products.find((product) => normalized.includes(product.name.toLowerCase())) ||
    products.find((product) => normalized.includes(product.id.replace("-", " "))) ||
    products.find((product) => compactInput.includes(product.name.toLowerCase().replace(/[^a-z0-9]/g, ""))) ||
    products.find((product) => compactInput.includes(product.id.replace(/[^a-z0-9]/g, ""))) ||
    null
  );
};

const findProductMention = (input: string) => {
  const normalized = input.toLowerCase();
  const compactInput = normalized.replace(/[^a-z0-9]/g, "");

  return (
    products.find((product) => normalized.includes(product.name.toLowerCase())) ||
    products.find((product) => normalized.includes(product.id.replace("-", " "))) ||
    products.find((product) => compactInput.includes(product.name.toLowerCase().replace(/[^a-z0-9]/g, ""))) ||
    products.find((product) => compactInput.includes(product.id.replace(/[^a-z0-9]/g, ""))) ||
    null
  );
};

const getYouTubeEmbedUrl = (url: string) => {
  const match =
    url.match(/youtu\.be\/([A-Za-z0-9_-]+)/) ||
    url.match(/shorts\/([A-Za-z0-9_-]+)/) ||
    url.match(/v=([A-Za-z0-9_-]+)/) ||
    url.match(/embed\/([A-Za-z0-9_-]+)/);
  if (!match) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
};

const isSoftwareQuery = (input: string) => {
  const normalized = input.trim().toLowerCase();
  return (
    normalized.includes("installation") ||
    normalized.includes("install") ||
    normalized.includes("installation guide") ||
    normalized.includes("sw installation") ||
    normalized.includes("prompter sw") ||
    normalized.includes("crystal prompter sw") ||
    normalized.includes("teleprompter software") ||
    normalized.includes("prompter software") ||
    normalized.includes("webapp") ||
    normalized.includes("web app") ||
    normalized.includes("software") ||
    normalized === "sw"
  );
};

const isAboutQuery = (input: string) => input.trim().toLowerCase().includes("about");

const getMockResponse = (input: string): ChatMessageType[] => {
  const normalized = input.trim().toLowerCase();
  const isSoftwareRequest = isSoftwareQuery(normalized);

  if (isSoftwareRequest) {
    return [
      createMessage(
        "bot",
        "Crystal Prompter Software\n• Official WebApp Beta 1.0\n• Includes installation videos and feature highlights below.",
        undefined,
        undefined,
        undefined,
        SW_MEDIA,
      ),
    ];
  }

  if (normalized.includes("youtube") || normalized.includes("content creation")) {
    return buildCategoryResponse("YouTube", ["Portable", "Spot"]);
  }
  if (normalized.includes("broadcast") || normalized.includes("film")) {
    return buildCategoryResponse("Broadcasting & Film", ["Cue", "Framer", "Mime"]);
  }
  if (normalized.includes("online teaching") || normalized.includes("teaching") || normalized.includes("education")) {
    return buildCategoryResponse("Online Teaching", ["Portable", "Cue"]);
  }
  if (normalized.includes("speech") || normalized.includes("conference")) {
    return buildCategoryResponse("Speech & Conferences", ["Mime", "Cue"]);
  }
  if (normalized.includes("events")) {
    return buildCategoryResponse("Events", ["Spot", "Cue"]);
  }

  if (normalized.includes("spec") || normalized.includes("specification")) {
    const product = findProductForSpecs(normalized);
    if (product) {
      return [
        createMessage(
          "bot",
          `Specifications Request\n• Product: ${product.name}\n• Action: Opening full specs now`,
        ),
      ];
    }
    return [
      createMessage(
        "bot",
        "Which product specs do you need?",
        buildSpecOptions(),
      ),
    ];
  }

  const mentionedProduct = findProductMention(normalized);
  if (mentionedProduct) {
    const introLink = PRODUCT_INTRO_LINKS[mentionedProduct.id];
    const introEmbed = introLink ? getYouTubeEmbedUrl(introLink) : null;
    return [
      createMessage(
        "bot",
        `Product Details\n• Product: ${mentionedProduct.name}\n• Action: Opening full details now`,
        undefined,
        undefined,
        undefined,
        introEmbed
          ? {
              title: "Product Introduction",
              videos: [{ title: `${mentionedProduct.name} Intro`, embedUrl: introEmbed }],
            }
          : {
              title: "Product Introduction",
              description: "Intro video will be available soon.",
            },
      ),
    ];
  }

  if (
    normalized.includes("all products") ||
    normalized.includes("catalog") ||
    normalized.includes("details") ||
    normalized.includes("data")
  ) {
    return [
      createMessage(
        "bot",
        "Full Product Lineup\n• Browse all products\n• Open a product for full specs and details",
        undefined,
        undefined,
        { label: "View all products", href: "/products" },
      ),
    ];
  }

  if (normalized.includes("find a prompter") || normalized.includes("prompter")) {
    return [createMessage("bot", MOCK_RESPONSES.find, FIND_OPTIONS)];
  }
  if (normalized.includes("rental")) {
    return [createMessage("bot", MOCK_RESPONSES.rental)];
  }
  if (normalized.includes("contact") || normalized.includes("sales")) {
    return [createMessage("bot", MOCK_RESPONSES.contact, undefined, undefined, undefined, undefined, CONTACT_INFO)];
  }
  if (normalized.includes("about")) {
    return [createMessage("bot", MOCK_RESPONSES.about)];
  }

  const index = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
  return [createMessage("bot", DEFAULT_RESPONSES[index])];
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleBotMessage = useCallback((replyMessages: ChatMessageType[]) => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    setIsTyping(true);
    const delay = 1000 + Math.floor(Math.random() * 1000);
    typingTimeout.current = setTimeout(() => {
      setMessages((prev) => [...prev, ...replyMessages]);
      setIsTyping(false);
    }, delay);
  }, []);

  useEffect(() => {
    if (open && !initialized) {
      scheduleBotMessage([createMessage("bot", WELCOME_MESSAGE)]);
      setInitialized(true);
    }
  }, [open, initialized, scheduleBotMessage]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("crystal-chat-open", handleOpen);
    return () => window.removeEventListener("crystal-chat-open", handleOpen);
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  const showQuickReplies = useMemo(() => messages.length > 0, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    setMessages((prev) => [...prev, createMessage("user", text)]);

    const specProduct = findProductForSpecs(text);
    const wantsSoftware = isSoftwareQuery(text);
    const wantsAboutVideos = isAboutQuery(text);
    const mentionedProduct = findProductMention(text);
    scheduleBotMessage(getMockResponse(text));

    if (specProduct) {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("crystal-open-specs", {
            detail: { productId: specProduct.id },
          }),
        );
      }, 350);
    }

    if (mentionedProduct && !specProduct) {
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("crystal-open-details", {
            detail: { productId: mentionedProduct.id },
          }),
        );
      }, 350);
    }

    if (wantsSoftware) {
      setTimeout(() => {
        window.dispatchEvent(new Event("crystal-open-webapp"));
      }, 350);
    }

    if (wantsAboutVideos) {
      setTimeout(() => {
        window.dispatchEvent(new Event("crystal-open-about-videos"));
      }, 350);
    }
  };

  return (
    <>
      <ChatWindow
        open={open}
        messages={messages}
        isTyping={isTyping}
        showQuickReplies={showQuickReplies}
        quickReplies={QUICK_REPLIES}
        onSend={handleSend}
        onQuickReply={handleSend}
        onClose={() => setOpen(false)}
      />

      <div className="chat-fab-wrapper fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="chat-fab relative flex h-14 w-14 items-center justify-center rounded-full bg-transparent text-white transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label={open ? "Close chat" : "Open chat"}
          aria-expanded={open}
          aria-controls="crystal-chat-window"
        >
          {!open && (
            <span className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-full bg-[#1a3c6e] px-4 py-1.5 text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.35)]">
              Chat with us!
              <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-[#1a3c6e]" />
            </span>
          )}
          {open ? (
            <X className="h-6 w-6 text-slate-600" strokeWidth={2} />
          ) : (
            <svg viewBox="0 0 96 96" role="img" aria-label="Chatbot icon" className="h-11 w-11">
              <circle cx="48" cy="48" r="44" fill="#2f6fe2" />
              <g fill="#ffffff">
                <rect x="26" y="28" width="44" height="34" rx="12" />
                <rect x="20" y="34" width="8" height="22" rx="4" />
                <rect x="68" y="34" width="8" height="22" rx="4" />
                <circle cx="48" cy="22" r="4" />
                <rect x="46.5" y="24.5" width="3" height="6" rx="1.5" />
                <path d="M44 62h16l-8 7z" />
              </g>
              <g fill="#2f6fe2">
                <ellipse cx="40" cy="45" rx="3.5" ry="4.5" />
                <ellipse cx="56" cy="45" rx="3.5" ry="4.5" />
              </g>
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
