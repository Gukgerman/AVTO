type Tone = "dark" | "light";

export function Eyebrow({ children, tone = "dark" }: { children: string; tone?: Tone }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
      <span
        className={`text-[13px] font-semibold uppercase tracking-wide ${
          tone === "dark" ? "text-gray" : "text-white/60"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
