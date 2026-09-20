import Image from "next/image";

type Segment = { word: string; amber?: boolean } | { image: string; alt: string };

export function InlineImageHeading({
  segments,
  className = "",
}: {
  segments: Segment[];
  className?: string;
}) {
  return (
    <h2
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[28px] font-bold leading-[1.2] text-navy sm:text-[32px] lg:gap-x-3 lg:text-[34px] ${className}`}
    >
      {segments.map((seg, i) =>
        "word" in seg ? (
          <span key={i} className={seg.amber ? "text-amber" : undefined}>
            {seg.word}
          </span>
        ) : (
          <span
            key={i}
            className="relative inline-block h-9 w-[68px] shrink-0 overflow-hidden rounded-full align-middle sm:h-10 sm:w-20 lg:h-11 lg:w-[94px]"
          >
            <Image src={seg.image} alt={seg.alt} fill sizes="94px" className="object-cover" />
          </span>
        )
      )}
    </h2>
  );
}
