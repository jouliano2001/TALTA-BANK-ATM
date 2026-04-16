import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AtmActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  subtitle?: string;
  align?: "left" | "right";
  tone?: "primary" | "ghost" | "screen";
};

export function AtmActionButton({
  children,
  className,
  icon,
  subtitle,
  align = "left",
  tone = "primary",
  ...props
}: AtmActionButtonProps) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-[18px] border text-white transition duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65a8ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07162e]",
        tone === "primary" &&
          "border-[#6ea7ff]/45 bg-[linear-gradient(180deg,rgba(42,96,189,0.95),rgba(19,54,117,0.96))] shadow-[0_14px_24px_rgba(3,11,26,0.42),inset_0_1px_0_rgba(196,221,255,0.26)] hover:-translate-y-0.5 hover:border-[#89b8ff] hover:shadow-[0_18px_30px_rgba(3,11,26,0.5),inset_0_1px_0_rgba(196,221,255,0.34)]",
        tone === "ghost" &&
          "border-white/15 bg-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/25",
        tone === "screen" &&
          "border-[#7caefc]/50 bg-[linear-gradient(180deg,rgba(35,92,182,0.78),rgba(24,58,122,0.92))] shadow-[0_10px_18px_rgba(4,12,30,0.36),inset_0_1px_0_rgba(208,227,255,0.2)] hover:border-[#97beff]",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(177,218,255,0.22),transparent_58%)] opacity-80" />
      <span
        className={cn(
          "relative flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:px-5 md:py-4",
          align === "right"
            ? "justify-between text-right"
            : "justify-start text-left",
        )}
      >
        {icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-white/12 bg-black/18 text-[#dce9ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-10 sm:w-10 sm:rounded-[13px] md:h-11 md:w-11 md:rounded-[14px]">
            {icon}
          </span>
        )}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold tracking-[0.01em] sm:text-base md:text-lg">
            {children}
          </span>
          {subtitle && (
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-[#c8daf9]/80 sm:mt-1 sm:text-[11px] md:text-xs md:tracking-[0.18em]">
              {subtitle}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}
