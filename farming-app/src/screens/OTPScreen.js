import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API from "../services/api";

export default function OTPScreen({ route, navigation }) {
  const { phone } = route.params;
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = async () => {
    try {
      const response = await API.post("/api/auth/verify-otp", { phone, otp });
      const token = response.data?.token;
      if (token) {
        API.defaults.headers.common["Authorization"] = token;
      }
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.icon}>🔐</Text>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Code sent to {phone}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#a0b89a"
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity style={styles.btn} onPress={handleVerifyOTP}>
          <Text style={styles.btnText}>Verify & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f7ee" },
  container: { flex: 1, justifyContent: "center", padding: 28 },
  icon: { fontSize: 56, textAlign: "center", marginBottom: 12 },
  title: { fontSize: 28, fontWeight: "800", color: "#2d6a4f", textAlign: "center" },
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
