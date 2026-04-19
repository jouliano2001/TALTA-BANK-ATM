import { ArrowLeft, Landmark, Wallet } from "lucide-react";
import { AtmActionButton } from "@/components/atm/AtmActionButton";
import { balanceScreenContent, tableHeaders, type Customer } from "@/data/customers";
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
  const summaryRows = [
    { label: tableHeaders.total, value: customer.total },
  ];

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

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center">
        <div className="mx-auto flex w-full max-w-[320px] rounded-[20px] border border-[#6ea7ff]/18 bg-[linear-gradient(180deg,rgba(7,21,44,0.94),rgba(4,11,24,0.98))] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_38px_rgba(0,0,0,0.28)] sm:max-w-[405px] sm:rounded-[22px] sm:p-3.5 md:max-w-[500px] md:rounded-[24px] md:p-4">
          <div className="w-full">
            <div className="mb-3 flex items-center justify-center gap-2 text-center md:mb-4">
              <Landmark className="h-4 w-4 text-[#9fc2ff] sm:h-5 sm:w-5" />
              <h2 className="text-[0.96rem] font-bold text-[#f4f8ff] sm:text-[1.05rem] md:text-[clamp(1rem,2.1vw,1.55rem)]">
                {balanceScreenContent.title}
              </h2>
            </div>

            <div className="rounded-[18px] border border-white/10 bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-3.5 md:rounded-[20px] md:p-4">
              <p className="text-xs font-medium text-[#c8daf9] sm:text-sm">
                {tableHeaders.name}
              </p>
              <p className="mt-2 text-base font-semibold text-[#f4f8ff] sm:text-lg md:text-xl">
                {customer.name}
              </p>

              <div className="mt-3.5 rounded-[16px] border border-[#7caefc]/25 bg-[linear-gradient(180deg,rgba(17,50,101,0.72),rgba(8,25,50,0.74))] p-3 sm:mt-4 sm:p-3.5 md:rounded-[18px] md:p-4">
                <div className="flex items-center gap-2 text-[#d7e6ff]">
                  <Wallet className="h-4 w-4 text-[#8fb9ff] sm:h-5 sm:w-5" />
                  <span className="text-xs font-semibold sm:text-sm">Account Summary</span>
                </div>
                <div className="mt-3 space-y-2 sm:mt-3.5 sm:space-y-2.5">
                  {summaryRows.map((row, index) => (
                    <div
                      key={row.label}
                      className={cn(
                        "rounded-[14px] border border-white/10 bg-white/[0.045] px-3 py-2.5 sm:px-3.5 sm:py-2.5",
                        index === summaryRows.length - 1 &&
                          "border-[#a7c6ff]/20 bg-[linear-gradient(180deg,rgba(29,74,145,0.34),rgba(13,37,76,0.42))]",
                      )}
                    >
                      <p className="text-[11px] font-medium text-[#bcd4fb] sm:text-xs">
                        {row.label}
                      </p>
                      <div className="mt-1.5 flex items-end justify-between gap-3">
                        <p className="text-[1.12rem] font-bold text-[#f7fbff] sm:text-[1.24rem] md:text-[1.45rem]">
                          {row.value.toFixed(2)}
                        </p>
                        <span className="text-[11px] font-medium text-[#9fc2ff] sm:text-xs">
                          {balanceScreenContent.currency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-3.5 sm:mt-4.5 sm:pt-4">
                <p className="text-xs font-semibold text-[#d7e6ff] sm:text-sm">
                  {balanceScreenContent.managerSignatureLabel}
                </p>
                <div className="mt-2 flex min-h-[48px] items-center sm:mt-2.5 sm:min-h-[60px]">
                  <img
                    src={signatureImage}
                    alt={balanceScreenContent.managerSignatureLabel}
                    className="max-h-[52px] w-auto max-w-[150px] object-contain sm:max-h-[60px] sm:max-w-[180px] md:max-h-[68px] md:max-w-[200px]"
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
