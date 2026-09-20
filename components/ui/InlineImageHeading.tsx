import Image from "next/image";

type Segment = { word: string; amber?: boolean } | { image: string; alt: string } | { break: true };

export function InlineImageHeading({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  return (
    <h2
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-0 sm:gap-y-2 text-[28px] font-bold leading-[1.05] text-navy sm:text-[32px] sm:leading-[1.2] lg:gap-x-3 lg:text-[34px] ${className}`}
    >
      {segments.map((seg, i) =>
        "break" in seg ? (
          <span key={i} className="basis-full sm:hidden" aria-hidden />
        ) : "word" in seg ? (
          <span key={i} className={seg.amber ? "text-amber" : undefined}>
            {seg.word}
          </span>
        ) : (
          <span
            key={i}
            className="relative inline-block h-8 w-[60px] shrink-0 overflow-hidden rounded-full align-middle sm:h-10 sm:w-20 lg:h-11 lg:w-[94px]"
          >
            <Image src={seg.image} alt={seg.alt} fill sizes="94px" className="object-cover" />
          </span>
        )
      )}
    </h2>
  );
}
