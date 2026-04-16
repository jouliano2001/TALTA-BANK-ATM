import atmLogo from "@/assets/SDCY1.png";
import purchasePlaceholder from "@/assets/purchase-placeholder.svg";
import branchSignature from "@/assets/Signature white.png";
import taltaBankLogo from "@/assets/Taltabanklogo.png";
import purchaseVideo from "@/assets/video.mp4";
import { arTranslations } from "@/translations/ar";
import { enTranslations } from "@/translations/en";

export const translationMap = {
  en: enTranslations,
  ar: arTranslations,
} as const;

export type SupportedLanguage = keyof typeof translationMap;
export type TranslationKey = keyof typeof enTranslations;

export function translate(language: SupportedLanguage, key: TranslationKey) {
  return translationMap[language][key];
}

export const atmContent = {
  logo: {
    image: atmLogo,
    alt: "Talta ATM logo",
  },
  bankLogo: {
    image: taltaBankLogo,
    alt: "Talta Bank logo",
  },
  signature: {
    image: branchSignature,
    alt: "Branch manager signature",
  },
  hardware: {
    contactless: "CONTACTLESS",
    cardSlot: "CARD",
    receiptSlot: "RECEIPT",
    cancelLabel: "CANCEL",
  },
  purchase: {
    image: purchasePlaceholder,
    video: purchaseVideo,
    alt: "Placeholder purchase and bidding image",
  },
} as const;
