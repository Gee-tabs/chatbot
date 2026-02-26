type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Crystal Prompter logo"
      className={className}
      fill="none"
    >
      <rect
        x="12"
        y="12"
        width="96"
        height="96"
        rx="20"
        fill="currentColor"
        className="text-[color:var(--logo-frame)]"
        opacity="0.18"
      />
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="22"
        stroke="currentColor"
        strokeWidth="6"
        className="text-[color:var(--logo-primary)]"
      />
      <path
        d="M46 44C36 44 30 52 30 60C30 68 36 76 46 76H54"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        className="text-[color:var(--logo-primary)]"
      />
      <path
        d="M68 76V44H84C92 44 92 58 84 58H68"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[color:var(--logo-primary)]"
      />
      <path
        d="M78 30H94V46"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[color:var(--logo-accent)]"
      />
      <circle cx="86" cy="30" r="3.5" fill="currentColor" className="text-[color:var(--logo-accent)]" />
    </svg>
  );
}
