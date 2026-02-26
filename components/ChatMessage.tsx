import { Mail, Phone } from "lucide-react";

export type ChatMessage = {
  id: string;
  role: "user" | "bot";
  content: string;
  options?: ChatMessageOption[];
  products?: ChatProductCard[];
  link?: {
    label: string;
    href: string;
  };
  media?: ChatMedia;
  contacts?: ChatContact;
};

export type ChatMessageOption = {
  id: string;
  label: string;
  value?: string;
};

export type ChatProductCard = {
  id: string;
  name: string;
  description: string;
};

export type ChatVideo = {
  title: string;
  embedUrl: string;
};

export type ChatAction = {
  label: string;
  href: string;
  variant?: "primary" | "download";
};

export type ChatMedia = {
  title: string;
  description?: string;
  bullets?: string[];
  videos?: ChatVideo[];
  actionsTitle?: string;
  actionsLayout?: "grid" | "row";
  actions?: ChatAction[];
  secondaryActions?: ChatAction[];
};

export type ChatContact = {
  email?: string;
  phone?: string;
  socials?: { label: string; href: string; src: string }[];
};

type ChatMessageProps = {
  message: ChatMessage;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[80%]">
        <div
          className={`whitespace-pre-line rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
            isUser ? "bg-crystalBlue text-white" : "bg-crystalGray text-slate-700"
          }`}
        >
          {message.content}
        </div>
        {message.link && (
          <a
            href={message.link.href}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-crystalBlue/30 bg-white px-3 py-1 text-[11px] font-semibold text-crystalBlue transition hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
          >
            {message.link.label}
          </a>
        )}
        {message.media && (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">{message.media.title}</p>
            {message.media.description && (
              <p className="mt-1 text-xs text-slate-600">{message.media.description}</p>
            )}
            {message.media.bullets && message.media.bullets.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-slate-600">
                {message.media.bullets.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}
            {message.media.videos && message.media.videos.length > 0 && (
              <div className="mt-3 space-y-3">
                {message.media.videos.map((video) => (
                  <div key={video.title} className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {video.title}
                    </p>
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-black">
                      <div className="aspect-video w-full">
                        <iframe
                          title={video.title}
                          src={video.embedUrl}
                          className="h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {message.media.actions && message.media.actions.length > 0 && (
              <div className="mt-3">
                {message.media.actionsTitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {message.media.actionsTitle}
                  </p>
                )}
                <div
                  className={`mt-2 gap-2 ${
                    message.media.actionsLayout === "grid"
                      ? "grid grid-cols-2"
                      : "flex flex-wrap items-center"
                  }`}
                >
                  {message.media.actions.map((action) => {
                    const isDownload = action.variant === "download";
                    return (
                      <a
                        key={action.href + action.label}
                        href={action.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-semibold transition ${
                          isDownload
                            ? "border-blue-200 bg-white text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                            : "border-crystalBlue/30 bg-white text-crystalBlue hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
                        }`}
                      >
                        {isDownload && (
                          <span className="text-[12px]" aria-hidden>
                            ⬇
                          </span>
                        )}
                        {action.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
            {message.media.secondaryActions && message.media.secondaryActions.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {message.media.secondaryActions.map((action) => (
                  <a
                    key={action.href + action.label}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-crystalBlue/30 bg-white px-3 py-1 text-[11px] font-semibold text-crystalBlue transition hover:border-crystalBlueDark hover:bg-crystalBlueDark hover:text-white"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        {message.contacts && (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-slate-700 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Inquire Via</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {message.contacts.email && (
                <a
                  href={`mailto:${message.contacts.email}`}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:border-crystalBlue/40 hover:text-crystalBlue"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.6} />
                  Email
                </a>
              )}
              {message.contacts.phone && (
                <a
                  href={`tel:${message.contacts.phone.replace(/\\s+/g, "")}`}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:border-crystalBlue/40 hover:text-crystalBlue"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.6} />
                  {message.contacts.phone}
                </a>
              )}
            </div>
            {message.contacts.socials && message.contacts.socials.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                {message.contacts.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Crystal Prompter ${social.label}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-crystalBlue/40 hover:text-crystalBlue"
                  >
                    <img src={social.src} alt={social.label} className="h-4 w-4" loading="lazy" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
