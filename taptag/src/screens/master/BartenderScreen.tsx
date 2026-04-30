import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

export default function BartenderScreen({
  onBack,
  syncTick,
}: {
  onBack: () => void;
  syncTick: number;
}) {
  const [, refresh] = useState(0);

  // 🔥 LIVE SYNC TRIGGER
  useEffect(() => {
    refresh((n) => n + 1);
  }, [syncTick]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bartender</Text>

      <Text style={styles.info}>Her kommer salgsskjermen</Text>

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
  },
  title: {
    color: "#FFF",
    fontSize: 28,
    marginBottom: 20,
  },
  info: {
    color: "#AAA",
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: "#3A1F24",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
  },
});