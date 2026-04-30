import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import Bartender from "../src/screens/master/BartenderScreen";
import Admin from "../src/screens/admin/AdminScreen";
import Setup from "../src/screens/setup/SetupScreen";
import { useTaptagLiveSync } from "../src/hooks/useTaptagLiveSync";

export default function Master() {
  const [mode, setMode] = useState<"menu" | "admin" | "bartender" | "setup">(
    "menu"
  );

  const { syncStatus, syncTick } = useTaptagLiveSync();

  if (mode === "admin") {
    return <Admin onBack={() => setMode("menu")} syncTick={syncTick} />;
  }

  if (mode === "bartender") {
    return <Bartender onBack={() => setMode("menu")} syncTick={syncTick} />;
  }

  if (mode === "setup") {
    return <Setup onBack={() => setMode("menu")} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TapTag Master</Text>
      <Text style={styles.status}>{syncStatus}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setMode("bartender")}>
        <Text style={styles.buttonText}>Bartender</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setMode("admin")}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setMode("setup")}>
        <Text style={styles.buttonText}>Oppsett</Text>
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
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  status: {
    color: "#7CFF9B",
    marginBottom: 26,
  },
  button: {
    backgroundColor: "#1E2A36",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 14,
    marginBottom: 16,
    minWidth: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});