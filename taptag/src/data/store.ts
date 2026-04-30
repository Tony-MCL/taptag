import { Arrangor, Produkt, Kort, Transaksjon } from "../types/taptag";

export const TEST_ARRANGOR_ID = "taptag-test";

export const store = {
  arrangor: {
    arrangorId: TEST_ARRANGOR_ID,
    navn: "Test Event",
    modus: "arrangement" as const,
    aktiv: true,
  } as Arrangor,

  produkter: [] as Produkt[],
  kort: [] as Kort[],
  transaksjoner: [] as Transaksjon[],
};