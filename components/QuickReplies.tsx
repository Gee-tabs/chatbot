type QuickRepliesProps = {
  items: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
};

export default function QuickReplies({ items, onSelect, disabled = false }: QuickRepliesProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => {
        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            disabled={disabled}
            className="flex items-center justify-center rounded-full border border-[#2f6fe2] bg-[#2f6fe2] px-2.5 py-1.5 text-center text-[11px] font-semibold text-white shadow-sm transition hover:border-crystalBlueDark hover:bg-white hover:text-crystalBlueDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystalBlue/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{item}</span>
          </button>
        );
      })}
    </div>
  );
}
