import { useEffect, useRef, useState } from "react";
import { AtmMachine } from "@/components/atm/AtmMachine";
import { customers } from "@/data/customers";
import { type SupportedLanguage } from "@/content/atmContent";
import {
  getCashWithdrawalDurationMs,
  playCashWithdrawalSound,
  stopCashWithdrawalSound,
} from "@/lib/atmClickSound";

type FlowScreen =
  | "idle"
  | "language"
  | "welcome"
  | "services"
  | "balance-select"
  | "pin-entry"
  | "balance-loading"
  | "balance-result"
  | "purchase";

function App() {
  const [screen, setScreen] = useState<FlowScreen>("idle");
  const [language, setLanguage] = useState<SupportedLanguage>("ar");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    customers[0]?.id ?? null,
  );
  const [pinDigits, setPinDigits] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [balanceLoadingDurationMs, setBalanceLoadingDurationMs] = useState(4200);
  const balanceLoadingTimeoutRef = useRef<number | null>(null);
  const balanceLoadingSessionRef = useRef(0);

  const isZoomed = screen !== "idle";
  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) ?? null;

  const resetPinState = () => {
    setPinDigits("");
    setPinError(null);
  };

  const clearBalanceLoading = () => {
    balanceLoadingSessionRef.current += 1;

    if (balanceLoadingTimeoutRef.current !== null) {
      window.clearTimeout(balanceLoadingTimeoutRef.current);
      balanceLoadingTimeoutRef.current = null;
    }

    stopCashWithdrawalSound();
  };

  useEffect(() => {
    void getCashWithdrawalDurationMs().then(setBalanceLoadingDurationMs);

    return () => clearBalanceLoading();
  }, []);

  const handleCancel = () => {
    clearBalanceLoading();
    resetPinState();
    setLanguage("ar");
    setSelectedCustomerId(customers[0]?.id ?? null);
    setScreen("idle");
  };

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden overflow-y-hidden bg-[#020814] text-white">
      <div className="pointer-events-none absolute inset-0 atm-stage-glow" />
      <div className="pointer-events-none absolute inset-0 atm-stage-grid opacity-40" />

      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
        <div className="relative flex w-full max-w-[1500px] items-center justify-center">
          <AtmMachine
            screen={screen}
            language={language}
            isZoomed={isZoomed}
            onScreenClick={() => setScreen("language")}
            onSelectLanguage={(nextLanguage) => {
              setLanguage(nextLanguage);
              setScreen("welcome");
            }}
            onPrimaryAction={() => setScreen("services")}
            onBalanceAction={() => setScreen("balance-select")}
            onPurchaseAction={() => setScreen("purchase")}
            onBackToServices={() => {
              clearBalanceLoading();
              resetPinState();
              setScreen("services");
            }}
            selectedCustomer={selectedCustomer}
            balanceLoadingDurationMs={balanceLoadingDurationMs}
            selectedCustomerId={selectedCustomerId}
            pinDigits={pinDigits}
            pinError={pinError}
            onSelectCustomer={setSelectedCustomerId}
            onConfirmCustomerBalance={() => {
              if (selectedCustomerId !== null) {
                resetPinState();
                setScreen("pin-entry");
              }
            }}
            onBackToBalanceSelection={() => {
              clearBalanceLoading();
              resetPinState();
              setScreen("balance-select");
            }}
            onPinDigit={(digit) => {
              setPinError(null);
              setPinDigits((current) => (current.length < 4 ? `${current}${digit}` : current));
            }}
            onPinClear={() => {
              setPinDigits("");
              setPinError(null);
            }}
            onPinBackspace={() => {
              setPinError(null);
              setPinDigits((current) => current.slice(0, -1));
            }}
            onPinConfirm={async () => {
              if (!selectedCustomer) {
                return;
              }

              if (pinDigits.length !== 4 || pinDigits !== selectedCustomer.password) {
                setPinDigits("");
                setPinError("invalid");
                return;
              }

              clearBalanceLoading();
              resetPinState();
              setScreen("balance-loading");

              const currentSession = balanceLoadingSessionRef.current + 1;
              balanceLoadingSessionRef.current = currentSession;

              const durationPromise = getCashWithdrawalDurationMs();
              void playCashWithdrawalSound();
              const durationMs = await durationPromise;
              setBalanceLoadingDurationMs(durationMs);

              if (balanceLoadingSessionRef.current !== currentSession) {
                return;
              }

              balanceLoadingTimeoutRef.current = window.setTimeout(() => {
                if (balanceLoadingSessionRef.current === currentSession) {
                  setScreen("balance-result");
                }
              }, durationMs);
            }}
            onCancel={handleCancel}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
