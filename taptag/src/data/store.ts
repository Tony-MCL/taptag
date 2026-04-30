import { Arrangor, Produkt, Kort, Transaksjon } from "../types/taptag";

export const store = {
  arrangor: null as Arrangor | null,
  produkter: [] as Produkt[],
  kort: [] as Kort[],
  transaksjoner: [] as Transaksjon[],
};