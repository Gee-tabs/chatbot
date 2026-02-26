export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl bg-crystalGray px-4 py-2 text-sm text-slate-500 shadow-sm">
      <span className="h-2 w-2 rounded-full bg-slate-400 animate-dotPulse" />
      <span
        className="h-2 w-2 rounded-full bg-slate-400 animate-dotPulse"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="h-2 w-2 rounded-full bg-slate-400 animate-dotPulse"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
}
