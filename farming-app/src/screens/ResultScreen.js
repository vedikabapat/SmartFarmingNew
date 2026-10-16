import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image,  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Scan Result</Text>

        {result?.imageUrl && (
          <Image source={{ uri: result.imageUrl }} style={styles.image} />
        )}

        <View style={[styles.card, styles.diseaseCard]}>
          <Text style={styles.label}>🦠 Disease Detected</Text>
          <Text style={styles.diseaseValue}>{result?.disease ?? "N/A"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>🔍 Symptoms</Text>
          <Text style={styles.value}>{result?.symptoms ?? "N/A"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>💊 Treatment</Text>
          <Text style={styles.value}>{result?.treatment ?? "N/A"}</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Upload")}>
          <Text style={styles.btnText}>📷  Scan Another Crop</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f7ee" },
  container: { flexGrow: 1, padding: 24 },
  title: { fontSize: 26, fontWeight: "800", color: "#2d6a4f", marginBottom: 20 },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: "cover",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  diseaseCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#d62828",
  },
  label: { fontSize: 12, color: "#52796f", fontWeight: "600", marginBottom: 6, textTransform: "uppercase" },
  value: { fontSize: 16, color: "#1b4332", lineHeight: 22 },
  diseaseValue: { fontSize: 20, fontWeight: "700", color: "#d62828" },
  btn: {
    backgroundColor: "#2d6a4f",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
