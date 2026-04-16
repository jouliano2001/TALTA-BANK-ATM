export type Customer = {
  id: number;
  name: string;
  balance: number;
};

export const customers: Customer[] = [
  { id: 1, name: "ابرام سمير", balance: 25.0 },
  { id: 2, name: "اماني يسري", balance: 25.0 },
  { id: 3, name: "انجي اسامه", balance: 25.0 },
  { id: 4, name: "ارساني رزق", balance: 25.0 },
  { id: 5, name: "بيشوي سمير", balance: 25.0 },
  { id: 6, name: "جورج اكرم", balance: 25.0 },
  { id: 7, name: "جويس محروس", balance: 25.0 },
  { id: 8, name: "ساره فرج", balance: 25.0 },
  { id: 9, name: "سيمون القس دميانوس", balance: 25.0 },
  { id: 10, name: "صوفيا مجدي", balance: 25.0 },
  { id: 11, name: "عزيز جورج", balance: 25.0 },
  { id: 12, name: "فيلوباتير جندي", balance: 25.0 },
  { id: 13, name: "كيرمينا االمير", balance: 25.0 },
  { id: 14, name: "كرمينا فوزي", balance: 25.0 },
  { id: 15, name: "كارين كمال", balance: 25.0 },
  { id: 16, name: "كاترين يوسف", balance: 25.0 },
  { id: 17, name: "مالك", balance: 25.0 },
  { id: 18, name: "مارينا مدحت", balance: 25.0 },
  { id: 19, name: "مارينا نبيل", balance: 25.0 },
  { id: 20, name: "مريم عزيز", balance: 25.0 },
  { id: 21, name: "مارفين", balance: 25.0 },
  { id: 22, name: "ميرنا مالك", balance: 25.0 },
  { id: 23, name: "مهرائيل وجدي", balance: 25.0 },
  { id: 24, name: "ماريا عماد", balance: 25.0 },
  { id: 25, name: "مينا وائل", balance: 25.0 },
  { id: 26, name: "ماريو جرجس", balance: 25.0 },
  { id: 27, name: "ماريو نور", balance: 25.0 },
  { id: 28, name: "مايكل جورج", balance: 25.0 },
  { id: 29, name: "مجدي عزت", balance: 25.0 },
  { id: 30, name: "نادر هاني", balance: 25.0 },
  { id: 31, name: "ناجي اشرف", balance: 25.0 },
  { id: 32, name: "هيالنه اسامه", balance: 25.0 },
  { id: 33, name: "يوسف اكرم", balance: 25.0 },
];

export const balanceScreenContent = {
  title: "كشف حساب لعام 2026",
  balanceLabel: "رصيد الحساب ( ج.م )",
  managerSignatureLabel: "توقيع مدير الفرع",
  currency: "ج.م",
} as const;
