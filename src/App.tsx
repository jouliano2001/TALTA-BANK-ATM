import { useState } from "react";
import { AtmMachine } from "@/components/atm/AtmMachine";
import { customers } from "@/data/customers";
import { type SupportedLanguage } from "@/content/atmContent";

type FlowScreen =
  | "idle"
  | "language"
  | "welcome"
  | "services"
  | "balance-select"
  | "balance-result"
  | "purchase";

function App() {
  const [screen, setScreen] = useState<FlowScreen>("idle");
  const [language, setLanguage] = useState<SupportedLanguage>("ar");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    customers[0]?.id ?? null,
  );

  const isZoomed = screen !== "idle";
  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) ?? null;

  const handleCancel = () => {
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
            onBackToServices={() => setScreen("services")}
            selectedCustomer={selectedCustomer}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
            onConfirmCustomerBalance={() => {
              if (selectedCustomerId !== null) {
                setScreen("balance-result");
              }
            }}
            onBackToBalanceSelection={() => setScreen("balance-select")}
            onCancel={handleCancel}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
