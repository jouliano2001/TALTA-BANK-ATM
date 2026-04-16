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
        "flex h-full min-h-0 flex-col overflow-hidden px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-4",
        isArabic && "font-arabic",
      )}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className={cn("flex items-start", isArabic ? "justify-start" : "justify-end")}>
        <AtmActionButton type="button" tone="ghost" className="min-w-[92px] sm:min-w-[104px]" onClick={onBack}>
          <span className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {translate(language, "atm.backButton")}
          </span>
        </AtmActionButton>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[310px] flex-1 overflow-hidden rounded-[20px] border border-[#6ea7ff]/18 bg-[linear-gradient(180deg,rgba(7,21,44,0.94),rgba(4,11,24,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_38px_rgba(0,0,0,0.28)] sm:max-w-[390px] sm:rounded-[22px] md:max-w-[500px] md:rounded-[24px]">
          <div className="atm-scrollbar scrollbar-hide w-full flex-1 overflow-y-auto p-3 pr-1.5 sm:p-4 sm:pr-2 md:p-6 md:pr-3">
            <div className="mb-4 flex items-center justify-center gap-2 text-center md:mb-5">
              <Landmark className="h-4 w-4 text-[#9fc2ff] sm:h-5 sm:w-5" />
              <h2 className="text-[0.96rem] font-bold text-[#f4f8ff] sm:text-[1.05rem] md:text-[clamp(1rem,2.1vw,1.55rem)]">
                {balanceScreenContent.title}
              </h2>
            </div>

            <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-4 md:rounded-[20px]">
              <p className="text-xs font-medium text-[#c8daf9] sm:text-sm">
                {translate(language, "atm.balanceResult.customerLabel")}
              </p>
              <p className="mt-2 text-base font-semibold text-[#f4f8ff] sm:text-lg md:text-xl">
                {customer.name}
              </p>

              <div className="mt-4 rounded-[16px] border border-[#7caefc]/25 bg-[linear-gradient(180deg,rgba(17,50,101,0.72),rgba(8,25,50,0.74))] p-3 sm:mt-5 sm:p-4 md:rounded-[18px]">
                <div className="flex items-center gap-2 text-[#d7e6ff]">
                  <Wallet className="h-4 w-4 text-[#8fb9ff] sm:h-5 sm:w-5" />
                  <span className="text-xs font-semibold sm:text-sm">
                    {balanceScreenContent.balanceLabel}
                  </span>
                </div>
                <div className="mt-3 text-[1.55rem] font-bold text-[#f7fbff] sm:text-[1.95rem] md:mt-4 md:text-[clamp(1.5rem,3vw,2.5rem)]">
                  {customer.balance.toFixed(2)}
                </div>
                <div className="mt-1 text-xs font-medium text-[#9fc2ff] sm:text-sm">
                  {balanceScreenContent.currency}
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">
                <p className="text-xs font-semibold text-[#d7e6ff] sm:text-sm">
                  {balanceScreenContent.managerSignatureLabel}
                </p>
                <div className="mt-2.5 flex min-h-[58px] items-center sm:mt-3 sm:min-h-[74px]">
                  <img
                    src={signatureImage}
                    alt={balanceScreenContent.managerSignatureLabel}
                    className="max-h-[62px] w-auto max-w-[170px] object-contain sm:max-h-[72px] sm:max-w-[200px] md:max-h-[82px] md:max-w-[220px]"
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
