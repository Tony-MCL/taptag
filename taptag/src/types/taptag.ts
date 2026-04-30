export type Arrangor = {
  arrangorId: string;
  navn: string;
  modus: "drift" | "arrangement";
  aktiv: boolean;
};

export type Produkt = {
  productId: string;
  arrangorId: string;
  navn: string;
  pris: number; // enheter
};

export type Kort = {
  cardId: string;
  arrangorId: string;
  alias: string;
  saldo: number;
};

export type Transaksjon = {
  transactionId: string;
  arrangorId: string;
  cardId: string;
  produkter: { navn: string; pris: number }[];
  total: number;
  createdAt: number;
};