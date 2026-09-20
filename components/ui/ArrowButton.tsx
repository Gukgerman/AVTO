import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";

type Variant = "amber" | "dark" | "light";

const variantStyles: Record<Variant, { bg: string; text: string; iconBg: string; iconText: string }> = {
  amber: { bg: "bg-amber", text: "text-navy", iconBg: "bg-navy", iconText: "text-amber" },
  dark: { bg: "bg-navy", text: "text-white", iconBg: "bg-amber", iconText: "text-navy" },
  light: { bg: "bg-white", text: "text-navy", iconBg: "bg-navy", iconText: "text-white" },
};

interface ArrowButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  wrapperClassName?: string;
}

const sizeStyles = {
  sm: { pad: "pl-4 pr-1 py-1", text: "text-[13px]", icon: "h-[30px] w-[30px]", iconSvg: "h-3 w-3", gap: "gap-2.5" },
  md: { pad: "pl-[22px] pr-[5px] py-[5px]", text: "text-sm", icon: "h-[34px] w-[34px]", iconSvg: "h-[13px] w-[13px]", gap: "gap-[14px]" },
  lg: { pad: "pl-[26px] pr-[6px] py-[6px]", text: "text-base", icon: "h-11 w-11", iconSvg: "h-4 w-4", gap: "gap-[18px]" },
};

export function ArrowButton({
  children,
  href,
  variant = "amber",
  size = "md",
  onClick,
  type = "button",
  className = "",
  wrapperClassName = "",
}: ArrowButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  const content = (
    <span
      className={`group inline-flex items-center ${s.gap} rounded-pill ${v.bg} ${s.pad} font-semibold ${s.text} ${v.text} transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      <span>{children}</span>
      <span
        className={`flex ${s.icon} shrink-0 items-center justify-center rounded-full ${v.iconBg} ${v.iconText} transition-transform duration-300 group-hover:rotate-45`}
      >
        <ArrowUpRightIcon className={s.iconSvg} />
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={`inline-block ${wrapperClassName}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`inline-block ${wrapperClassName}`}>
      {content}
    </button>
  );
}
