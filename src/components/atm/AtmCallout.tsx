import { MousePointerClick } from "lucide-react";

type AtmCalloutProps = {
  title: string;
  subtitle: string;
};

export function AtmCallout({ title, subtitle }: AtmCalloutProps) {
  return (
    <div className="relative max-w-[270px] rounded-[26px] border border-[#66a8ff]/45 bg-[linear-gradient(180deg,rgba(12,28,58,0.9),rgba(8,16,33,0.94))] px-6 py-5 shadow-[0_0_22px_rgba(60,120,255,0.34),0_18px_48px_rgba(0,0,0,0.48)]">
      <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top,rgba(93,162,255,0.2),transparent_60%)]" />
      <div className="relative flex items-end gap-4">
        <div>
          <p className="text-2xl font-semibold leading-tight text-[#84b9ff]">
            {title}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/72">{subtitle}</p>
        </div>
        <MousePointerClick className="h-10 w-10 shrink-0 text-white drop-shadow-[0_0_10px_rgba(109,168,255,0.55)]" />
      </div>
      <div className="absolute -left-5 top-1/2 hidden -translate-y-1/2 xl:block">
        <div className="h-[2px] w-10 bg-gradient-to-r from-[#6ca9ff] to-transparent" />
      </div>
    </div>
  );
}
