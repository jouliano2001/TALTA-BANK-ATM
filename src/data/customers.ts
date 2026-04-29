export type Customer = {
  id: number;
  name: string;
  total: number;
  used: number;
  balance: number;
  password: string;
};

export const customers: Customer[] = [
  { id: 1, name: "ابرام سمير", total: 75, used: 0, balance: 75, password: "4827" },
  { id: 2, name: "اماني يسري", total: 75, used: 0, balance: 75, password: "1306" },
  { id: 3, name: "انجي اسامه", total: 50, used: 0, balance: 50, password: "9754" },
  { id: 4, name: "ارساني رزق", total: 50, used: 0, balance: 50, password: "2468" },
  { id: 5, name: "اندرو كمال", total: 50, used: 0, balance: 50, password: "5913" },
  { id: 6, name: "بيشوي سمير", total: 75, used: 0, balance: 75, password: "8042" },
  { id: 7, name: "بيشوي صليب", total: 50, used: 0, balance: 50, password: "3175" },
  { id: 8, name: "جورج اكرم", total: 75, used: 0, balance: 75, password: "6621" },
  { id: 9, name: "جورج شريف", total: 50, used: 0, balance: 50, password: "1489" },
  { id: 10, name: "جومانا عادل", total: 50, used: 0, balance: 50, password: "5230" },
  { id: 11, name: "جويس محروس", total: 75, used: 0, balance: 75, password: "7094" },
  { id: 12, name: "دميانه رضاني", total: 50, used: 0, balance: 50, password: "2864" },
  { id: 13, name: "ساره فرج", total: 50, used: 0, balance: 50, password: "9347" },
  { id: 14, name: "سيمون القس دميانوس", total: 50, used: 0, balance: 50, password: "4152" },
  { id: 15, name: "صوفيا مجدي", total: 25, used: 0, balance: 25, password: "8701" },
  { id: 16, name: "عزيز جورج", total: 50, used: 0, balance: 50, password: "3649" },
  { id: 17, name: "فادي سامح", total: 50, used: 0, balance: 50, password: "1183" },
  { id: 18, name: "فيلوباتير جندي", total: 25, used: 0, balance: 25, password: "6528" },
  { id: 19, name: "كيرمينا الامير", total: 50, used: 0, balance: 50, password: "9036" },
  { id: 20, name: "كيرمينا فوزي", total: 25, used: 0, balance: 25, password: "2714" },
  { id: 21, name: "كارين كمال", total: 50, used: 0, balance: 50, password: "5407" },
  { id: 22, name: "كاترين يوسف", total: 75, used: 0, balance: 75, password: "8862" },
  { id: 23, name: "كيرلس وجيه", total: 50, used: 0, balance: 50, password: "1935" },
  { id: 24, name: "ليديا عماد", total: 50, used: 0, balance: 50, password: "7240" },
  { id: 25, name: "ماجد طارق", total: 25, used: 0, balance: 25, password: "4386" },
  { id: 26, name: "ملاك", total: 25, used: 0, balance: 25, password: "9671" },
  { id: 27, name: "مارسيل شحاته", total: 25, used: 0, balance: 25, password: "4527" },
  { id: 28, name: "مارينا مدحت", total: 50, used: 0, balance: 50, password: "2509" },
  { id: 29, name: "مارينا نبيل", total: 50, used: 0, balance: 50, password: "6815" },
  { id: 30, name: "مريم عزيز", total: 75, used: 0, balance: 75, password: "3027" },
  { id: 31, name: "مريم وحيد", total: 50, used: 0, balance: 50, password: "8146" },
  { id: 32, name: "مارفين", total: 75, used: 0, balance: 75, password: "5590" },
  { id: 33, name: "ميرنا ملاك", total: 25, used: 0, balance: 25, password: "1278" },
  { id: 34, name: "مهرائيل وجدي", total: 25, used: 0, balance: 25, password: "7463" },
  { id: 35, name: "مهرائيل عادل", total: 50, used: 0, balance: 50, password: "3905" },
  { id: 36, name: "مهرائيل ايهاب", total: 25, used: 0, balance: 25, password: "6184" },
  { id: 37, name: "ماريا عماد", total: 25, used: 0, balance: 25, password: "2579" },
  { id: 38, name: "مونيكا انور", total: 25, used: 0, balance: 25, password: "9163" },
  { id: 39, name: "مينا وائل", total: 25, used: 0, balance: 25, password: "7018" },
  { id: 40, name: "ماريو جرجس", total: 50, used: 0, balance: 50, password: "4361" },
  { id: 41, name: "ماريو نور", total: 75, used: 0, balance: 75, password: "9582" },
  { id: 42, name: "مايكل جورج", total: 75, used: 0, balance: 75, password: "1846" },
  { id: 43, name: "مجدي عزت", total: 75, used: 0, balance: 75, password: "6739" },
  { id: 44, name: "نادر هاني", total: 75, used: 0, balance: 75, password: "3208" },
  { id: 45, name: "ناجي اشرف", total: 75, used: 0, balance: 75, password: "8451" },
  { id: 46, name: "هيلانه اسامه", total: 75, used: 0, balance: 75, password: "2967" },
  { id: 47, name: "يوسف اكرم", total: 75, used: 0, balance: 75, password: "5314" },
  { id: 48, name: "يوسف سامي", total: 50, used: 0, balance: 50, password: "7680" },
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
