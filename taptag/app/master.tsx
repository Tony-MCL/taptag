import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { kjøp } from "../src/services/taptagService";
import { store } from "../src/data/store";

export default function Master() {
  const [status, setStatus] = useState("Klar");

  const fakeScan = () => {
    const scannedCardId = store.kort[0]?.cardId;

    if (!scannedCardId) {
      setStatus("Ingen kort å scanne");
      return;
    }

    const product = store.produkter[0];

    if (!product) {
      setStatus("Ingen produkter");
      return;
    }

    try {
      kjøp(scannedCardId, [product.productId]);
      setStatus("Salg OK");
    } catch (e: any) {
      setStatus(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bartender</Text>
      <Text style={styles.status}>{status}</Text>

      <Pressable style={styles.button} onPress={fakeScan}>
        <Text style={styles.buttonText}>Scan (fake)</Text>
      </Pressable>
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
    color: "#FFF",
    fontSize: 28,
    marginBottom: 10,
  },
  status: {
    color: "#7CFF9B",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1E2A36",
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
  },
});