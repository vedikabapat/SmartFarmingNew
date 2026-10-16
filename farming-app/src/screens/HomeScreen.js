import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeather } from "../services/weather";

export default function HomeScreen({ navigation }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    const data = await getWeather("Goa");
    setWeather(data);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Good day, Farmer 👨‍🌾</Text>
        <Text style={styles.title}>Smart Farming</Text>

        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>🌦 Current Weather — Goa</Text>
          {weather ? (
            <View style={styles.weatherRow}>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherValue}>{weather.main.temp}°C</Text>
                <Text style={styles.weatherLabel}>Temp</Text>
              </View>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherValue}>{weather.main.humidity}%</Text>
                <Text style={styles.weatherLabel}>Humidity</Text>
              </View>
              <View style={styles.weatherItem}>
                <Text style={styles.weatherValue}>{weather.weather[0].main}</Text>
                <Text style={styles.weatherLabel}>Condition</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.weatherUnavailable}>Weather data unavailable</Text>
          )}
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Upload")}>
          <Text style={styles.btnIcon}>📷</Text>
          <Text style={styles.btnText}>Scan Crop Disease</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnAI]} onPress={() => navigation.navigate("AIAssistant")}>
          <Text style={styles.btnIcon}>🤖</Text>
          <Text style={styles.btnText}>AI Farming Assistant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f7ee" },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  greeting: { fontSize: 14, color: "#52796f", marginBottom: 4 },
  title: { fontSize: 32, fontWeight: "800", color: "#2d6a4f", marginBottom: 28 },
  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderLeftWidth: 4,
    borderLeftColor: "#52b788",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  weatherTitle: { fontSize: 14, fontWeight: "600", color: "#52796f", marginBottom: 16 },
  weatherRow: { flexDirection: "row", justifyContent: "space-between" },
  weatherItem: { alignItems: "center" },
  weatherValue: { fontSize: 20, fontWeight: "700", color: "#1b4332" },
  weatherLabel: { fontSize: 11, color: "#74c69d", marginTop: 2 },
  weatherUnavailable: { color: "#aaa", fontSize: 13 },
  btn: {
    backgroundColor: "#2d6a4f",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnIcon: { fontSize: 20 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 17 },
  btnAI: { backgroundColor: "#e76f51", marginTop: 12 },
});
