import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

import {
  opprettArrangor,
  leggTilProdukt,
  opprettKort,
  kjøp,
} from "../src/services/taptagService";

import { store } from "../src/data/store";

export default function Home() {
  const [, forceUpdate] = useState(0);
  const [status, setStatus] = useState("Klar");

  const refresh = () => forceUpdate((n) => n + 1);

  const handleSetup = () => {
    try {
      opprettArrangor("Test Event");
      leggTilProdukt("Øl", 1);
      leggTilProdukt("Vin", 2);
      leggTilProdukt("Shot", 1);

      setStatus("Event opprettet");
      refresh();
    } catch (error) {
      setStatus("Feil ved setup");
      console.error(error);
    }
  };

  const handleNewCard = () => {
    try {
      opprettKort("Tony");
      setStatus("Kort opprettet");
      refresh();
    } catch (error) {
      setStatus("Feil ved kort");
      console.error(error);
    }
  };

  const handleBuy = () => {
    try {
      const card = store.kort[0];
      const product = store.produkter[0];

      if (!card || !product) {
        setStatus("Mangler kort eller produkt");
        return;
      }

      kjøp(card.cardId, [product.productId]);
      setStatus("Kjøp gjennomført");
      refresh();
    } catch (error) {
      setStatus("Feil ved kjøp");
      console.error(error);
    }
  };

  const card = store.kort[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TapTag</Text>
      <Text style={styles.status}>{status}</Text>

      <TouchableOpacity style={styles.button} onPress={handleSetup} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Setup Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNewCard} activeOpacity={0.7}>
        <Text style={styles.buttonText}>New Card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleBuy} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Buy Beer</Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.infoText}>Arrangør: {store.arrangor?.navn || "-"}</Text>
        <Text style={styles.infoText}>Produkter: {store.produkter.length}</Text>
        <Text style={styles.infoText}>Kort: {store.kort.length}</Text>
        <Text style={styles.infoText}>Saldo: {card ? card.saldo : "-"}</Text>
        <Text style={styles.infoText}>Transaksjoner: {store.transaksjoner.length}</Text>
      </View>

      <View style={styles.links}>
        <Link href="/wallet" style={styles.link}>
          Gå til Wallet
        </Link>

        <Link href="/master" style={styles.link}>
          Gå til Bartender
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F14",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  status: {
    color: "#7CFF9B",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#1E2A36",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  info: {
    marginTop: 30,
    alignItems: "center",
  },
  infoText: {
    color: "#AAA",
    marginBottom: 4,
  },
  links: {
    marginTop: 28,
    alignItems: "center",
    gap: 10,
  },
  link: {
    color: "#4DA6FF",
    fontWeight: "600",
  },
});