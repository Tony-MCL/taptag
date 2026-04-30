import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import type { Produkt, Kort, Transaksjon } from "../types/taptag";

export async function saveArrangor(arrangor: any) {
  await setDoc(doc(db, "arrangorer", arrangor.arrangorId), {
    ...arrangor,
    updatedAt: serverTimestamp(),
  });
}

export async function saveProdukt(produkt: Produkt) {
  await setDoc(
    doc(db, "arrangorer", produkt.arrangorId, "produkter", produkt.productId),
    { ...produkt, updatedAt: serverTimestamp() }
  );
}

export async function saveKort(kort: Kort) {
  await setDoc(doc(db, "arrangorer", kort.arrangorId, "kort", kort.cardId), {
    ...kort,
    updatedAt: serverTimestamp(),
  });
}

export async function saveTransaksjon(transaksjon: Transaksjon) {
  await addDoc(
    collection(db, "arrangorer", transaksjon.arrangorId, "transaksjoner"),
    { ...transaksjon, createdAt: serverTimestamp() }
  );
}

export async function loadFullArrangor(arrangorId: string) {
  const produkterSnap = await getDocs(
    collection(db, "arrangorer", arrangorId, "produkter")
  );

  const kortSnap = await getDocs(
    collection(db, "arrangorer", arrangorId, "kort")
  );

  const transaksjonerSnap = await getDocs(
    collection(db, "arrangorer", arrangorId, "transaksjoner")
  );

  return {
    produkter: produkterSnap.docs.map((d) => d.data() as Produkt),
    kort: kortSnap.docs.map((d) => d.data() as Kort),
    transaksjoner: transaksjonerSnap.docs.map((d) => d.data() as Transaksjon),
  };
}

export function subscribeFullArrangor(
  arrangorId: string,
  onUpdate: (data: {
    produkter: Produkt[];
    kort: Kort[];
    transaksjoner: Transaksjon[];
  }) => void
) {
  let produkter: Produkt[] = [];
  let kort: Kort[] = [];
  let transaksjoner: Transaksjon[] = [];

  const emit = () => {
    onUpdate({ produkter, kort, transaksjoner });
  };

  const unsubProducts = onSnapshot(
    collection(db, "arrangorer", arrangorId, "produkter"),
    (snap) => {
      produkter = snap.docs.map((d) => d.data() as Produkt);
      emit();
    }
  );

  const unsubCards = onSnapshot(
    collection(db, "arrangorer", arrangorId, "kort"),
    (snap) => {
      kort = snap.docs.map((d) => d.data() as Kort);
      emit();
    }
  );

  const unsubTransactions = onSnapshot(
    collection(db, "arrangorer", arrangorId, "transaksjoner"),
    (snap) => {
      transaksjoner = snap.docs.map((d) => d.data() as Transaksjon);
      emit();
    }
  );

  return () => {
    unsubProducts();
    unsubCards();
    unsubTransactions();
  };
}