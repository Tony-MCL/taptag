import { useEffect, useState } from "react";

import { store } from "../data/store";
import { subscribeFullArrangor } from "../services/firestoreService";

export function useTaptagLiveSync() {
  const [syncTick, setSyncTick] = useState(0);
  const [syncStatus, setSyncStatus] = useState("Kobler til live sync...");

  useEffect(() => {
    if (!store.arrangor) {
      setSyncStatus("Ingen arrangør");
      return;
    }

    const unsubscribe = subscribeFullArrangor(
      store.arrangor.arrangorId,
      (data) => {
        store.produkter = data.produkter;
        store.kort = data.kort;
        store.transaksjoner = data.transaksjoner;

        setSyncStatus("Live sync aktiv");
        setSyncTick((n) => n + 1);
      }
    );

    return unsubscribe;
  }, []);

  return { syncStatus, syncTick };
}