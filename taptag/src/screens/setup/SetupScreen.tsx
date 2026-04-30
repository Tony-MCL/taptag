import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SetupScreen({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oppsett</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Arrangørnavn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Logo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Kortutseende</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Arrangør-QR</Text>
      </TouchableOpacity>

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
  button: {
    backgroundColor: "#1E2A36",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    width: 240,
    alignItems: "center",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#3A1F24",
    padding: 14,
    borderRadius: 10,
    width: 160,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});