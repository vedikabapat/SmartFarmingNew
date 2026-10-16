import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../services/api";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const handleSendOTP = async () => {
    try {
      await API.post("/api/auth/send-otp", { phone });
      navigation.navigate("OTP", { phone });
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🌱</Text>
        </View>
        <Text style={styles.title}>Smart Farming</Text>
        <Text style={styles.subtitle}>Smart Crop Disease Detection</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#a0b89a"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSendOTP}>
          <Text style={styles.btnText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f7ee" },
  container: { flex: 1, justifyContent: "center", padding: 28 },
  iconWrapper: { alignItems: "center", marginBottom: 12 },
  icon: { fontSize: 64 },
  title: { fontSize: 32, fontWeight: "800", color: "#2d6a4f", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#52796f", textAlign: "center", marginBottom: 40, marginTop: 4 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#95d5b2",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#1b4332",
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#2d6a4f",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
