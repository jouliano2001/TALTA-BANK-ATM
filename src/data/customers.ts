export type Customer = {
  id: number;
  name: string;
  total: number;
  used: number;
  balance: number;
  password: string;
};

export const customers: Customer[] = [
  { id: 1, name: "ابرام سمير", total: 25.0, used: 0.0, balance: 25.0, password: "4827" },
  { id: 2, name: "اماني يسري", total: 25.0, used: 0.0, balance: 25.0, password: "1306" },
  { id: 3, name: "انجي اسامه", total: 25.0, used: 0.0, balance: 25.0, password: "9754" },
  { id: 4, name: "ارساني رزق", total: 25.0, used: 0.0, balance: 25.0, password: "2468" },
  { id: 5, name: "بيشوي سمير", total: 25.0, used: 0.0, balance: 25.0, password: "5913" },
  { id: 6, name: "جورج اكرم", total: 25.0, used: 0.0, balance: 25.0, password: "8042" },
  { id: 7, name: "جويس محروس", total: 25.0, used: 0.0, balance: 25.0, password: "3175" },
  { id: 8, name: "ساره فرج", total: 25.0, used: 0.0, balance: 25.0, password: "6621" },
  { id: 9, name: "سيمون القس دميانوس", total: 25.0, used: 0.0, balance: 25.0, password: "1489" },
  { id: 10, name: "صوفيا مجدي", total: 25.0, used: 0.0, balance: 25.0, password: "5230" },
  { id: 11, name: "عزيز جورج", total: 25.0, used: 0.0, balance: 25.0, password: "7094" },
  { id: 12, name: "فيلوباتير جندي", total: 25.0, used: 0.0, balance: 25.0, password: "2864" },
  { id: 13, name: "كيرمينا الامير", total: 25.0, used: 0.0, balance: 25.0, password: "9347" },
  { id: 14, name: "كرمينا فوزي", total: 25.0, used: 0.0, balance: 25.0, password: "4152" },
  { id: 15, name: "كارين كمال", total: 25.0, used: 0.0, balance: 25.0, password: "8701" },
  { id: 16, name: "كاترين يوسف", total: 25.0, used: 0.0, balance: 25.0, password: "3649" },
  { id: 17, name: "ملاك", total: 25.0, used: 0.0, balance: 25.0, password: "1183" },
  { id: 18, name: "مارينا مدحت", total: 25.0, used: 0.0, balance: 25.0, password: "6528" },
  { id: 19, name: "مارينا نبيل", total: 25.0, used: 0.0, balance: 25.0, password: "9036" },
  { id: 20, name: "مريم عزيز", total: 25.0, used: 0.0, balance: 25.0, password: "2714" },
  { id: 21, name: "مارفين", total: 25.0, used: 0.0, balance: 25.0, password: "5407" },
  { id: 22, name: "ميرنا ملاك", total: 25.0, used: 0.0, balance: 25.0, password: "8862" },
  { id: 23, name: "مهرائيل وجدي", total: 25.0, used: 0.0, balance: 25.0, password: "1935" },
  { id: 24, name: "ماريا عماد", total: 25.0, used: 0.0, balance: 25.0, password: "7240" },
  { id: 25, name: "مينا وائل", total: 25.0, used: 0.0, balance: 25.0, password: "4386" },
  { id: 26, name: "ماريو جرجس", total: 25.0, used: 0.0, balance: 25.0, password: "9671" },
  { id: 27, name: "ماريو نور", total: 25.0, used: 0.0, balance: 25.0, password: "2509" },
  { id: 28, name: "مايكل جورج", total: 25.0, used: 0.0, balance: 25.0, password: "6815" },
  { id: 29, name: "مجدي عزت", total: 25.0, used: 0.0, balance: 25.0, password: "3027" },
  { id: 30, name: "نادر هاني", total: 25.0, used: 0.0, balance: 25.0, password: "8146" },
  { id: 31, name: "ناجي اشرف", total: 25.0, used: 0.0, balance: 25.0, password: "5590" },
  { id: 32, name: "هيلانه اسامه", total: 25.0, used: 0.0, balance: 25.0, password: "1278" },
  { id: 33, name: "يوسف اكرم", total: 25.0, used: 0.0, balance: 25.0, password: "7463" },
  { id: 34, name: "Test", total: 25.0, used: 0.0, balance: 25.0, password: "1234" },
];

export const tableHeaders = {
  total: "اجمالي الرصيد ( ج.م )",
  name: "اسم العميل",
} as const;

export const balanceScreenContent = {
  title: "كشف حساب لعام 2026",
  managerSignatureLabel: "توقيع مدير الفرع",
  currency: "ج.م",
} as const;
