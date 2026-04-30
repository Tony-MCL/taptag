import { store } from "../data/store";
import { Arrangor, Produkt, Kort, Transaksjon } from "../types/taptag";

export function opprettArrangor(navn: string): Arrangor {
  const arrangor: Arrangor = {
    arrangorId: Date.now().toString(),
    navn,
    modus: "arrangement",
    aktiv: true,
  };

  store.arrangor = arrangor;
  store.produkter = [];
  store.kort = [];
  store.transaksjoner = [];

  return arrangor;
}

export function leggTilProdukt(navn: string, pris: number): Produkt {
  if (!store.arrangor) throw new Error("Ingen arrangør");

  const produkt: Produkt = {
    productId: `${Date.now()}-${Math.random()}`,
    arrangorId: store.arrangor.arrangorId,
    navn,
    pris,
  };

  store.produkter.push(produkt);
  return produkt;
}

export function opprettKort(alias: string): Kort {
  if (!store.arrangor) throw new Error("Ingen arrangør");

  const kort: Kort = {
    cardId: `${Date.now()}-${Math.random()}`,
    arrangorId: store.arrangor.arrangorId,
    alias,
    saldo: 100,
  };

  store.kort.push(kort);
  return kort;
}

export function kjøp(cardId: string, productIds: string[]): Transaksjon {
  const kort = store.kort.find((k) => k.cardId === cardId);
  if (!kort) throw new Error("Kort ikke funnet");

  const produkter = store.produkter.filter((p) =>
    productIds.includes(p.productId)
  );

  const total = produkter.reduce((sum, p) => sum + p.pris, 0);

  if (total <= 0) {
    throw new Error("Ingen produkter valgt");
  }

  if (kort.saldo < total) {
    throw new Error("Ikke nok saldo");
  }

  const balanceBefore = kort.saldo;
  kort.saldo -= total;

  const transaksjon: Transaksjon = {
    transactionId: `${Date.now()}-${Math.random()}`,
    arrangorId: kort.arrangorId,
    cardId,
    produkter: produkter.map((p) => ({
      navn: p.navn,
      pris: p.pris,
    })),
    total,
    createdAt: Date.now(),
  };

  store.transaksjoner.push(transaksjon);

  return transaksjon;
}