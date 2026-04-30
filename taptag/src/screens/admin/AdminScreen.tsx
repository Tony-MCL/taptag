import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";

import { store } from "../../data/store";
import { leggTilProdukt } from "../../services/taptagService";
import { useTaptagLiveSync } from "../../hooks/useTaptagLiveSync";

export default function AdminScreen({ onBack }: { onBack: () => void }) {
  const { syncStatus, syncTick } = useTaptagLiveSync();

  const [, refresh] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [status, setStatus] = useState("Admin klar");

  const forceRefresh = () => refresh((n) => n + 1);

  useEffect(() => {
    forceRefresh();
  }, [syncTick]);

  const handleAddProduct = () => {
    const name = productName.trim();
    const price = Number(productPrice);

    if (!name) {
      setStatus("Skriv inn varenavn");
      return;
    }

    if (!price || price <= 0) {
      setStatus("Skriv inn gyldig pris");
      return;
    }

    try {
      leggTilProdukt(name, price);
      setProductName("");
      setProductPrice("");
      setStatus("Vare lagt til");
      forceRefresh();
    } catch (error) {
      setStatus("Kunne ikke legge til vare");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin</Text>
      <Text style={styles.status}>{syncStatus}</Text>
      <Text style={styles.localStatus}>{status}</Text>

      <Text style={styles.sectionTitle}>Varer & priser</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Varenavn"
          placeholderTextColor="#777"
          value={productName}
          onChangeText={setProductName}
        />

        <TextInput
          style={styles.input}
          placeholder="Pris i enheter"
          placeholderTextColor="#777"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Legg til vare</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {store.produkter.length === 0 ? (
          <Text style={styles.emptyText}>Ingen varer lagt inn</Text>
        ) : (
          store.produkter.map((product) => (
            <View key={product.productId} style={styles.productRow}>
              <Text style={styles.productName}>{product.navn}</Text>
              <Text style={styles.productPrice}>{product.pris} enhet</Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Tilbake</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F14",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  status: {
    color: "#7CFF9B",
    marginBottom: 6,
  },
  localStatus: {
    color: "#AAA",
    marginBottom: 18,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  form: {
    width: "100%",
    maxWidth: 360,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#121A24",
    color: "#FFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    width: "100%",
  },
  addButton: {
    backgroundColor: "#1E7A3E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    marginTop: 6,
  },
  productRow: {
    backgroundColor: "#1E2A36",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productName: {
    color: "#FFF",
    fontWeight: "700",
  },
  productPrice: {
    color: "#AAA",
  },
  emptyText: {
    color: "#777",
    textAlign: "center",
  },
  backButton: {
    marginTop: 24,
    backgroundColor: "#3A1F24",
    padding: 14,
    borderRadius: 10,
    width: 160,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
  },
});