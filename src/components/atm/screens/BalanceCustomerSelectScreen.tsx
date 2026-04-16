import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, ChevronDown, UserRound } from "lucide-react";
import { AtmActionButton } from "@/components/atm/AtmActionButton";
import type { Customer } from "@/data/customers";
import { translate, type SupportedLanguage } from "@/content/atmContent";
import { cn } from "@/lib/utils";

type BalanceCustomerSelectScreenProps = {
  language: SupportedLanguage;
  customers: Customer[];
  selectedCustomerId: number | null;
  onSelectCustomer: (customerId: number) => void;
  onConfirm: () => void;
  onBack: () => void;
};

export function BalanceCustomerSelectScreen({
  language,
  customers,
  selectedCustomerId,
  onSelectCustomer,
  onConfirm,
  onBack,
}: BalanceCustomerSelectScreenProps) {
  const isArabic = language === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedCustomer = useMemo(
    () => customers.find((customer) => customer.id === selectedCustomerId) ?? null,
    [customers, selectedCustomerId],
  );

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4",
        isArabic && "font-arabic",
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={cn("flex items-start", isArabic ? "justify-start" : "justify-end")}>
        <AtmActionButton type="button" tone="ghost" className="min-w-[104px]" onClick={onBack}>
          <span className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {translate(language, "atm.backButton")}
          </span>
        </AtmActionButton>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <h2 className="text-center text-[clamp(1rem,2.1vw,1.55rem)] font-bold text-[#f2f6ff]">
          {translate(language, "atm.balanceSelect.heading")}
        </h2>

        <div className="mx-auto mt-4 w-full max-w-[470px] rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,21,44,0.74),rgba(4,11,24,0.9))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:mt-5 sm:p-5">
          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-[#cfe0ff]">
            <UserRound className="h-4 w-4 text-[#8fb9ff]" />
            {translate(language, "atm.balanceSelect.fieldLabel")}
          </label>

          <div ref={rootRef} className="relative">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className={cn(
                "flex h-14 w-full items-center rounded-[18px] border border-[#6ea7ff]/35 bg-[linear-gradient(180deg,rgba(12,33,67,0.98),rgba(6,18,38,0.98))] text-base text-[#f4f8ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none transition hover:border-[#87b7ff]/55 focus-visible:border-[#8db9ff] focus-visible:shadow-[0_0_0_1px_rgba(141,185,255,0.4)]",
                isArabic
                  ? "justify-between pr-4 pl-3 text-right"
                  : "justify-between pl-4 pr-3 text-left",
              )}
            >
              <span className="truncate">
                {selectedCustomer?.name ??
                  translate(language, "atm.balanceSelect.placeholder")}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-[#8fb9ff] transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            {isOpen && (
              <div className="absolute inset-x-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-[18px] border border-[#6ea7ff]/30 bg-[linear-gradient(180deg,rgba(8,24,48,0.98),rgba(4,12,26,0.99))] shadow-[0_18px_32px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="atm-scrollbar max-h-[168px] overflow-y-auto p-2">
                  {customers.map((customer) => {
                    const isSelected = customer.id === selectedCustomerId;

                    return (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => {
                          onSelectCustomer(customer.id);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-[14px] px-3 py-3 text-sm transition",
                          isArabic ? "text-right" : "text-left",
                          isSelected
                            ? "bg-[linear-gradient(180deg,rgba(37,92,180,0.9),rgba(17,50,110,0.94))] text-white"
                            : "text-[#d8e6ff] hover:bg-white/[0.06]",
                        )}
                      >
                        <span className="truncate">{customer.name}</span>
                        {isSelected && <Check className="h-4 w-4 shrink-0 text-[#e7f0ff]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className={cn("mt-5 flex", isArabic ? "justify-start" : "justify-end")}>
            <AtmActionButton
              type="button"
              tone="screen"
              className="min-w-[150px]"
              onClick={onConfirm}
              disabled={selectedCustomerId === null}
            >
              {translate(language, "atm.balanceSelect.confirm")}
            </AtmActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
