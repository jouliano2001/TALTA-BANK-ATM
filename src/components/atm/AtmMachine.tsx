import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  MousePointerClick,
  ShoppingCart,
  Waves,
} from "lucide-react";
import { AtmActionButton } from "@/components/atm/AtmActionButton";
import { BalanceCustomerSelectScreen } from "@/components/atm/screens/BalanceCustomerSelectScreen";
import { BalanceResultScreen } from "@/components/atm/screens/BalanceResultScreen";
import { atmContent, translate, type SupportedLanguage } from "@/content/atmContent";
import { customers, type Customer } from "@/data/customers";
import { cn } from "@/lib/utils";

type FlowScreen =
  | "idle"
  | "language"
  | "welcome"
  | "services"
  | "balance-select"
  | "balance-result"
  | "purchase";

type AtmMachineProps = {
  screen: FlowScreen;
  language: SupportedLanguage;
  isZoomed: boolean;
  selectedCustomerId: number | null;
  selectedCustomer: Customer | null;
  onScreenClick: () => void;
  onSelectLanguage: (language: SupportedLanguage) => void;
  onPrimaryAction: () => void;
  onBalanceAction: () => void;
  onPurchaseAction: () => void;
  onBackToServices: () => void;
  onSelectCustomer: (customerId: number) => void;
  onConfirmCustomerBalance: () => void;
  onBackToBalanceSelection: () => void;
  onCancel: () => void;
};

export function AtmMachine({
  screen,
  language,
  isZoomed,
  selectedCustomerId,
  selectedCustomer,
  onScreenClick,
  onSelectLanguage,
  onPrimaryAction,
  onBalanceAction,
  onPurchaseAction,
  onBackToServices,
  onSelectCustomer,
  onConfirmCustomerBalance,
  onBackToBalanceSelection,
  onCancel,
}: AtmMachineProps) {
  const isArabic = language === "ar";
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const baseMachineWidth = 720;
  const baseMachineHeight = 1120;

  useEffect(() => {
    function updateViewport() {
      const visualViewport = window.visualViewport;

      setViewport({
        width: visualViewport?.width ?? window.innerWidth,
        height: visualViewport?.height ?? window.innerHeight,
      });
    }

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("scroll", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("scroll", updateViewport);
    };
  }, []);

  const isMobileViewport = viewport.width > 0 && viewport.width < 640;
  const cameraScale = isMobileViewport ? (isZoomed ? 0.98 : 0.84) : isZoomed ? 1.08 : 0.84;
  const maxCameraScale = isMobileViewport ? 0.98 : 1.08;
  const viewportPadding = isMobileViewport ? 10 : 24;
  const availableWidth = Math.max(viewport.width - viewportPadding * 2, 280);
  const availableHeight = Math.max(viewport.height - viewportPadding * 2, 420);
  const fitScale =
    viewport.width > 0 && viewport.height > 0
      ? Math.min(
          availableWidth / (baseMachineWidth * maxCameraScale),
          availableHeight / (baseMachineHeight * maxCameraScale),
          1,
        )
      : 1;
  const reservedWidth = baseMachineWidth * fitScale * maxCameraScale;
  const reservedHeight = baseMachineHeight * fitScale * maxCameraScale;
  const screenContentScale = isMobileViewport
    ? fitScale < 0.42
      ? 0.9
      : fitScale < 0.5
        ? 0.96
        : fitScale < 0.58
          ? 1.01
          : fitScale < 0.66
            ? 1.05
            : 1.08
    : fitScale < 0.8
      ? 0.94
      : 1;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: `${reservedWidth}px`,
        height: `${reservedHeight}px`,
      }}
    >
      <motion.div
        layout
        initial={false}
        animate={{
          scale: fitScale * cameraScale,
          y: isMobileViewport ? (isZoomed ? -4 : 0) : isZoomed ? -10 : 0,
          x: isMobileViewport ? 0 : isZoomed ? -6 : 0,
        }}
        transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
        className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `${baseMachineWidth}px`,
          minHeight: `${baseMachineHeight}px`,
        }}
      >
        <div className="relative rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,#5d6167_0%,#2e3238_18%,#11151b_68%,#070a10_100%)] p-4 shadow-[0_45px_100px_rgba(0,0,0,0.58)]">
          <div className="absolute inset-[1px] rounded-[33px] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_26%,transparent_56%,rgba(255,255,255,0.08)_82%,rgba(0,0,0,0.4))]" />
          <div className="relative rounded-[28px] border border-black/40 bg-[linear-gradient(180deg,#2b2e33_0%,#141920_24%,#090d13_100%)] px-5 pb-6 pt-5">
          <header className="mb-3 flex items-center justify-between rounded-[14px] border border-white/12 bg-[linear-gradient(180deg,#3a3e45,#191d22)] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:mb-4 sm:rounded-[16px] sm:px-4 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#f4da8c] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:h-11 sm:w-11 sm:rounded-xl md:h-12 md:w-12">
                <img
                  src={atmContent.logo.image}
                  alt={atmContent.logo.alt}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div className="font-atm text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-[#ecf2ff] sm:text-[clamp(1.1rem,2.2vw,1.55rem)] sm:tracking-[0.18em]">
                ATM
              </div>
            </div>
            <div className="flex h-9 items-center justify-end sm:h-12 md:h-14">
              <img
                src={atmContent.bankLogo.image}
                alt={atmContent.bankLogo.alt}
                className="h-full w-auto max-w-[118px] object-contain sm:max-w-[162px] md:max-w-[190px]"
              />
            </div>
          </header>

          <div className="relative rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,#26292e,#090c11)] p-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_18px_34px_rgba(0,0,0,0.36)] sm:rounded-[24px] sm:p-3 md:p-4">
            <div className="flex items-stretch gap-1.5 sm:gap-2 md:gap-3">
              <MachineSideButtons side="left" />

              <div className="relative min-w-0 flex-1 rounded-[15px] border border-black/60 bg-[linear-gradient(180deg,#11161f,#060a12)] p-[8px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] sm:rounded-[18px] sm:p-[10px]">
                <div className="absolute inset-[8px] rounded-[12px] border border-white/5 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),transparent_26%,transparent_74%,rgba(255,255,255,0.04))] sm:inset-[10px] sm:rounded-[14px]" />
                <div
                  onClick={screen === "idle" ? onScreenClick : undefined}
                  className={cn(
                    "relative flex aspect-[1.18/1] w-full overflow-hidden rounded-[10px] border border-[#18325f] bg-[radial-gradient(circle_at_top,rgba(33,70,129,0.45),transparent_38%),linear-gradient(180deg,#04142f_0%,#071021_54%,#07172c_100%)] text-left shadow-[inset_0_0_22px_rgba(87,145,255,0.12)] sm:aspect-[1.24/1] md:aspect-[1.34/1] sm:rounded-[12px]",
                    screen === "idle" &&
                      "cursor-pointer transition duration-300 hover:border-[#6ca9ff] hover:shadow-[0_0_0_1px_rgba(108,169,255,0.32),inset_0_0_34px_rgba(95,155,255,0.18)]",
                  )}
                >
                  <ScreenGlow />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="h-full w-full origin-center"
                      style={{ transform: `scale(${screenContentScale})` }}
                    >
                      <AnimatePresence mode="wait">
                        {screen === "idle" && (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.45 }}
                            className="absolute inset-0"
                          >
                            <IdleScreen language={language} />
                          </motion.div>
                        )}
                        {screen === "language" && (
                          <motion.div
                            key="language"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.42 }}
                            className="absolute inset-0"
                          >
                            <LanguageScreen onSelectLanguage={onSelectLanguage} />
                          </motion.div>
                        )}
                        {screen === "welcome" && (
                          <motion.div
                            key="welcome"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.42 }}
                            className="absolute inset-0"
                          >
                            <WelcomeScreen
                              language={language}
                              isArabic={isArabic}
                              onPrimaryAction={onPrimaryAction}
                            />
                          </motion.div>
                        )}
                        {screen === "services" && (
                          <motion.div
                            key="services"
                            initial={{ opacity: 0, x: 26 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -26 }}
                            transition={{ duration: 0.38 }}
                            className="absolute inset-0"
                          >
                            <ServicesScreen
                              language={language}
                              isArabic={isArabic}
                              onBalanceAction={onBalanceAction}
                              onPurchaseAction={onPurchaseAction}
                            />
                          </motion.div>
                        )}
                        {screen === "balance-select" && (
                          <motion.div
                            key="balance-select"
                            initial={{ opacity: 0, x: 26 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -26 }}
                            transition={{ duration: 0.38 }}
                            className="absolute inset-0"
                          >
                            <BalanceCustomerSelectScreen
                              language={language}
                              customers={customers}
                              selectedCustomerId={selectedCustomerId}
                              onSelectCustomer={onSelectCustomer}
                              onConfirm={onConfirmCustomerBalance}
                              onBack={onBackToServices}
                            />
                          </motion.div>
                        )}
                        {screen === "balance-result" && selectedCustomer && (
                          <motion.div
                            key="balance-result"
                            initial={{ opacity: 0, x: 26 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -26 }}
                            transition={{ duration: 0.38 }}
                            className="absolute inset-0"
                          >
                            <BalanceResultScreen
                              language={language}
                              customer={selectedCustomer}
                              signatureImage={atmContent.signature.image}
                              onBack={onBackToBalanceSelection}
                            />
                          </motion.div>
                        )}
                        {screen === "purchase" && (
                          <motion.div
                            key="purchase"
                            initial={{ opacity: 0, x: 26 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -26 }}
                            transition={{ duration: 0.38 }}
                            className="absolute inset-0"
                          >
                            <PurchaseScreen
                              language={language}
                              isArabic={isArabic}
                              onBack={onBackToServices}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              <MachineSideButtons side="right" />
            </div>
          </div>

          <motion.div
            animate={{ opacity: isZoomed ? 1 : 0.88, y: isZoomed ? 0 : 14 }}
            transition={{ duration: 0.6, delay: isZoomed ? 0.2 : 0 }}
            className="mt-3 grid grid-cols-[0.92fr_1.18fr_0.92fr] gap-2 sm:mt-5 sm:grid-cols-[1fr_1.25fr_1fr] sm:gap-3 md:grid-cols-[1fr_1.4fr_1fr] md:gap-4"
          >
            <HardwarePanel
              title={atmContent.hardware.contactless}
              icon={<Waves className="h-8 w-8 text-[#d8e7ff]" />}
              label={translate(language, "atm.contactlessLabel")}
            />
            <KeypadPanel onCancel={onCancel} />
            <div className="grid gap-3 sm:gap-4">
              <SlotPanel title={atmContent.hardware.cardSlot} accent="green" />
              <SlotPanel title={atmContent.hardware.receiptSlot} accent="neutral" />
            </div>
          </motion.div>

          <div className="mt-3 rounded-[16px] border border-white/6 bg-[linear-gradient(180deg,#262a31,#0f141b)] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:mt-5 sm:rounded-[18px] sm:px-4 sm:py-4">
            <div className="mx-auto h-2.5 w-24 rounded-full bg-black/45 shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)] sm:h-3 sm:w-28 md:w-36" />
          </div>

          <div className="mx-auto mt-2 h-4 w-[86%] rounded-b-[16px] border border-white/5 bg-[linear-gradient(180deg,#1b1f25,#090d13)] sm:mt-3 sm:h-5 sm:rounded-b-[20px]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ScreenGlow() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,127,255,0.18),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(12,164,255,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[12px] border border-white/5" />
    </>
  );
}

function MachineSideButtons({ side }: { side: "left" | "right" }) {
  return (
    <div className="flex w-[18px] shrink-0 flex-col justify-center gap-3 sm:w-[22px] sm:gap-4 md:w-[28px] md:gap-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`${side}-${index}`}
          className={cn(
            "h-3 rounded-[4px] border border-white/18 bg-[linear-gradient(180deg,#f7f8fb,#b6bcc7_48%,#737c88)] shadow-[0_2px_6px_rgba(0,0,0,0.25)] sm:h-4 md:h-5",
            side === "left" ? "origin-left" : "origin-right",
          )}
        />
      ))}
    </div>
  );
}

function HardwarePanel({
  title,
  icon,
  label,
}: {
  title: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex min-h-[88px] flex-col justify-between rounded-[14px] border border-white/7 bg-[linear-gradient(180deg,#262a31,#11161d)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-h-[105px] sm:rounded-[16px] sm:p-3 md:min-h-[122px] md:p-4">
      <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-[9px] md:text-[10px] md:tracking-[0.2em]">
        {title}
      </span>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-11 w-full items-center justify-center rounded-[12px] border border-white/8 bg-black/22 sm:h-12 sm:rounded-[14px] md:h-14">
          {icon}
        </div>
        <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-white/55 sm:text-[9px] md:text-[10px] md:tracking-[0.16em]">
          {label}
        </span>
      </div>
    </div>
  );
}

function KeypadPanel({ onCancel }: { onCancel: () => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

  return (
    <div className="rounded-[16px] border border-white/7 bg-[linear-gradient(180deg,#252a30,#121821)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-[18px] sm:p-3 md:p-4">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {keys.map((key, index) => (
          <div
            key={`${key}-${index}`}
            className={cn(
              "flex h-7 items-center justify-center rounded-[6px] border text-[10px] font-semibold sm:h-8 sm:rounded-[7px] sm:text-xs md:h-9 md:text-sm",
              key
                ? "border-black/45 bg-[linear-gradient(180deg,#f5f5f7,#9aa1ac)] text-[#222831] shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
                : "border-transparent bg-transparent shadow-none",
            )}
          >
            {key}
          </div>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5 sm:mt-2 sm:gap-2">
        <KeypadActionButton
          color="red"
          mobileLabel="C"
          desktopLabel={atmContent.hardware.cancelLabel}
          onClick={onCancel}
        />
        <KeypadActionButton color="yellow" mobileLabel="R" desktopLabel="Review" />
        <KeypadActionButton color="green" mobileLabel="E" desktopLabel="Enter" />
      </div>
    </div>
  );
}

function KeypadActionButton({
  color,
  mobileLabel,
  desktopLabel,
  onClick,
}: {
  color: "red" | "yellow" | "green";
  mobileLabel?: string;
  desktopLabel?: string;
  onClick?: () => void;
}) {
  const palette = {
    red: "border-[#5b2118] bg-[linear-gradient(180deg,#e36a4f_0%,#c84d37_52%,#973523_100%)] hover:bg-[linear-gradient(180deg,#eb7759_0%,#d35840_52%,#a33c28_100%)] active:bg-[linear-gradient(180deg,#c84d37_0%,#aa3f2b_52%,#822817_100%)]",
    yellow:
      "border-[#70520c] bg-[linear-gradient(180deg,#f0c34b_0%,#d0a52d_52%,#987515_100%)] hover:bg-[linear-gradient(180deg,#f5cd5e_0%,#daaf38_52%,#a3801b_100%)] active:bg-[linear-gradient(180deg,#d0a52d_0%,#b08720_52%,#7e6010_100%)]",
    green:
      "border-[#3a6520] bg-[linear-gradient(180deg,#95d55d_0%,#7dbd48_52%,#5f9634_100%)] hover:bg-[linear-gradient(180deg,#a1de6f_0%,#89c953_52%,#68a53c_100%)] active:bg-[linear-gradient(180deg,#7dbd48_0%,#6aa13d_52%,#4f7e2b_100%)]",
  } as const;
  const sharedClassName = cn(
    "relative flex h-6 w-full items-center justify-center overflow-hidden rounded-[6px] border px-1.5 py-1 text-center text-[10px] font-black uppercase leading-none text-black shadow-[0_2px_4px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.24)] transition duration-150 active:translate-y-[1px] active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.16)] sm:h-7 sm:rounded-[7px] sm:px-2 sm:py-1.5 sm:text-[11px] md:h-8 md:text-[11px]",
    palette[color],
    onClick && "cursor-pointer",
  );

  const content = (
    <>
      <span className="pointer-events-none absolute inset-x-[1px] top-[1px] h-[42%] rounded-[5px] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.02))] sm:rounded-[6px]" />
      {mobileLabel && (
        <span className="relative block font-black leading-none sm:hidden">{mobileLabel}</span>
      )}
      {desktopLabel && (
        <span className="relative hidden truncate px-1 font-black leading-none sm:block">
          {desktopLabel}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={sharedClassName}>
        {content}
      </button>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
}

function SlotPanel({
  title,
  accent,
}: {
  title: string;
  accent: "green" | "neutral";
}) {
  return (
    <div className="rounded-[16px] border border-white/7 bg-[linear-gradient(180deg,#252a30,#10151c)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-4">
      <div className="mb-2 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-white/72 sm:text-[10px]">
        {title}
      </div>
      <div className="rounded-[10px] border border-black/45 bg-black/38 p-2 shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)]">
        <div className="h-5 rounded-full bg-[linear-gradient(180deg,#05070a,#1a1e25)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]" />
        <div
          className={cn(
            "mx-auto mt-1.5 h-1.5 w-10 rounded-full",
            accent === "green"
              ? "bg-[#49cb60] shadow-[0_0_12px_rgba(73,203,96,0.65)]"
              : "bg-white/18",
          )}
        />
      </div>
    </div>
  );
}

function IdleScreen({ language }: { language: SupportedLanguage }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-[linear-gradient(180deg,#f6e28a_0%,#f2cf54_100%)] p-4 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,250,214,0.72),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(182,124,18,0.2),transparent_34%)]" />
      <div className="relative h-full w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={atmContent.logo.image}
            alt={atmContent.logo.alt}
            className="max-h-[60%] w-auto max-w-[70%] object-contain object-center drop-shadow-[0_14px_24px_rgba(94,67,9,0.2)]"
          />
        </div>
        <div className="absolute bottom-2 right-2 max-w-[74%] rounded-[18px] border border-[#a97e1b]/35 bg-[linear-gradient(180deg,rgba(255,247,221,0.82),rgba(244,221,152,0.92))] px-2.5 py-2 text-[#5f490f] shadow-[0_10px_20px_rgba(126,88,12,0.16)] sm:bottom-4 sm:right-4 sm:max-w-[66%] sm:rounded-2xl sm:px-3 md:bottom-5 md:right-5 md:px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#9f7718]/30 bg-white/35 sm:h-7 sm:w-7">
              <MousePointerClick className="h-3 w-3 text-[#6a5011] sm:h-3.5 sm:w-3.5" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-left text-[8px] font-semibold uppercase leading-tight tracking-[0.12em] sm:text-[9px] md:text-[10px] md:tracking-[0.16em]">
                {translate(language, "atm.idleOverlay.title")}
              </span>
              <span className="text-left text-[7px] leading-tight text-[#6f5a22] sm:text-[8px] md:text-[9px]">
                {translate(language, "atm.idleOverlay.subtitle")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LanguageScreen({
  onSelectLanguage,
}: {
  onSelectLanguage: (language: SupportedLanguage) => void;
}) {
  return (
    <div className="flex h-full flex-col justify-center overflow-hidden px-5 py-5 text-center sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-[310px] rounded-[18px] border border-white/10 bg-black/18 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:max-w-[360px] sm:rounded-[20px] sm:px-5 sm:py-6">
        <p className="font-arabic text-base font-semibold text-[#f4f8ff] sm:text-lg md:text-xl">
          {translate("ar", "atm.language.title")}
        </p>
        <p className="mt-2 text-base font-semibold text-[#d7e6ff] sm:text-lg md:text-xl">
          {translate("en", "atm.language.subtitle")}
        </p>
        <div className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3">
          <AtmActionButton type="button" onClick={() => onSelectLanguage("en")}>
            {translate("en", "atm.language.english")}
          </AtmActionButton>
          <AtmActionButton
            type="button"
            className="font-arabic"
            onClick={() => onSelectLanguage("ar")}
          >
            {translate("ar", "atm.language.arabic")}
          </AtmActionButton>
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({
  language,
  isArabic,
  onPrimaryAction,
}: {
  language: SupportedLanguage;
  isArabic: boolean;
  onPrimaryAction: () => void;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5",
        isArabic && "font-arabic",
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="max-w-[300px] text-[0.95rem] font-semibold leading-snug text-[#f4f8ff] sm:max-w-[360px] sm:text-[1.05rem] md:max-w-[420px] md:text-[clamp(0.95rem,2vw,1.5rem)]">
          {translate(language, "atm.welcome.heading")}
        </p>
        <p className="mt-3 max-w-[300px] text-[0.82rem] font-medium leading-snug text-[#d7e6ff] sm:mt-4 sm:max-w-[360px] sm:text-[0.95rem] md:max-w-[430px] md:text-[clamp(0.9rem,1.9vw,1.3rem)]">
          {translate(language, "atm.welcome.subheading")}
        </p>
      </div>
      <div className={cn("flex", isArabic ? "justify-start" : "justify-end")}>
        <AtmActionButton
          type="button"
          tone="screen"
          className="min-w-[145px] max-w-full sm:min-w-[170px] md:min-w-[210px]"
          onClick={onPrimaryAction}
        >
          {translate(language, "atm.welcome.primaryAction")}
        </AtmActionButton>
      </div>
    </div>
  );
}

function ServicesScreen({
  language,
  isArabic,
  onBalanceAction,
  onPurchaseAction,
}: {
  language: SupportedLanguage;
  isArabic: boolean;
  onBalanceAction: () => void;
  onPurchaseAction: () => void;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5",
        isArabic && "font-arabic",
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="text-center text-[0.98rem] font-bold text-[#f2f6ff] sm:text-[1.15rem] md:text-[clamp(1.05rem,2.3vw,1.8rem)]">
          {translate(language, "atm.services.heading")}
        </h2>
        <div className="mx-auto mt-4 flex w-full max-w-[320px] flex-col gap-2.5 sm:mt-6 sm:max-w-[380px] sm:gap-3 md:mt-8 md:max-w-[430px] md:gap-4">
          <AtmActionButton
            type="button"
            icon={<CreditCard className="h-6 w-6" />}
            align={isArabic ? "right" : "left"}
            subtitle={translate(language, "atm.services.balanceSubtitle")}
            className={cn("w-full", isArabic && "font-arabic")}
            onClick={onBalanceAction}
          >
            {translate(language, "atm.services.balanceButton")}
          </AtmActionButton>
          <AtmActionButton
            type="button"
            icon={<ShoppingCart className="h-6 w-6" />}
            align={isArabic ? "right" : "left"}
            subtitle={translate(language, "atm.services.purchaseSubtitle")}
            className={cn("w-full", isArabic && "font-arabic")}
            onClick={onPurchaseAction}
          >
            {translate(language, "atm.services.purchaseButton")}
          </AtmActionButton>
        </div>
      </div>
    </div>
  );
}

function PurchaseScreen({
  language,
  isArabic,
  onBack,
}: {
  language: SupportedLanguage;
  isArabic: boolean;
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden p-3 sm:p-4">
      <img
        src={atmContent.purchase.image}
        alt={atmContent.purchase.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,26,0.58),rgba(4,12,26,0.12),rgba(4,12,26,0.62))]" />
      <div className={cn("relative flex items-start gap-3", isArabic ? "justify-start" : "justify-end")}>
        <AtmActionButton
          type="button"
          tone="screen"
          className={cn("min-w-[104px]", isArabic && "font-arabic")}
          onClick={onBack}
        >
          <span className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {translate(language, "atm.backButton")}
          </span>
        </AtmActionButton>
      </div>
      <div
        className={cn(
          "relative mt-auto rounded-[16px] border border-white/12 bg-black/26 px-4 py-3 backdrop-blur-[3px]",
          isArabic ? "font-arabic text-right" : "text-left",
        )}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fc2ff]">
          {translate(language, "atm.purchase.captionLabel")}
        </p>
        <p className="mt-2 text-base font-semibold text-[#f6f9ff] sm:text-lg">
          {translate(language, "atm.purchase.caption")}
        </p>
      </div>
    </div>
  );
}
