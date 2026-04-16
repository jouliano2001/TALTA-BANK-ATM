import { ArrowLeft, Landmark, Wallet } from "lucide-react";
import { AtmActionButton } from "@/components/atm/AtmActionButton";
import { balanceScreenContent, type Customer } from "@/data/customers";
import { translate, type SupportedLanguage } from "@/content/atmContent";
import { cn } from "@/lib/utils";

type BalanceResultScreenProps = {
  language: SupportedLanguage;
  customer: Customer;
  signatureImage: string;
  onBack: () => void;
};

export function BalanceResultScreen({
  language,
  customer,
  signatureImage,
  onBack,
}: BalanceResultScreenProps) {
  const isArabic = language === "ar";

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4",
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

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[500px] flex-1 overflow-hidden rounded-[24px] border border-[#6ea7ff]/18 bg-[linear-gradient(180deg,rgba(7,21,44,0.94),rgba(4,11,24,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_38px_rgba(0,0,0,0.28)]">
          <div className="atm-scrollbar scrollbar-hide w-full flex-1 overflow-y-auto p-4 pr-2 sm:p-6 sm:pr-3">
          <div className="mb-5 flex items-center justify-center gap-2 text-center">
            <Landmark className="h-5 w-5 text-[#9fc2ff]" />
            <h2 className="text-[clamp(1rem,2.1vw,1.55rem)] font-bold text-[#f4f8ff]">
              {balanceScreenContent.title}
            </h2>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-sm font-medium text-[#c8daf9]">
              {translate(language, "atm.balanceResult.customerLabel")}
            </p>
            <p className="mt-2 text-lg font-semibold text-[#f4f8ff] sm:text-xl">
              {customer.name}
            </p>

            <div className="mt-5 rounded-[18px] border border-[#7caefc]/25 bg-[linear-gradient(180deg,rgba(17,50,101,0.72),rgba(8,25,50,0.74))] p-4">
              <div className="flex items-center gap-2 text-[#d7e6ff]">
                <Wallet className="h-5 w-5 text-[#8fb9ff]" />
                <span className="text-sm font-semibold">
                  {balanceScreenContent.balanceLabel}
                </span>
              </div>
              <div className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[#f7fbff]">
                {customer.balance.toFixed(2)}
              </div>
              <div className="mt-1 text-sm font-medium text-[#9fc2ff]">
                {balanceScreenContent.currency}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm font-semibold text-[#d7e6ff]">
                {balanceScreenContent.managerSignatureLabel}
              </p>
              <div className="mt-3 flex min-h-[74px] items-center">
                <img
                  src={signatureImage}
                  alt={balanceScreenContent.managerSignatureLabel}
                  className="max-h-[82px] w-auto max-w-[220px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
