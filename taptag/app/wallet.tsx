import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { store } from "../src/data/store";

export default function Wallet() {
  const card = store.kort[0];

  if (!card) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Ingen kort</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{card.alias}</Text>

      <QRCode
        value={card.cardId}
        size={220}
        backgroundColor="white"
      />

      <Text style={styles.balance}>Saldo: {card.saldo}</Text>
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
    fontSize: 24,
    marginBottom: 20,
  },
  balance: {
    color: "#7CFF9B",
    marginTop: 20,
  },
  text: {
    color: "#AAA",
  },
});