import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert,  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import API from "../services/api";

export default function UploadScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert("No image selected", "Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "crop.jpg",
      type: "image/jpeg",
    });

    try {
      console.log("Token being sent:", API.defaults.headers.common["Authorization"]);
      const response = await API.post("/api/crop/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...API.defaults.headers.common,
        },
      });
      navigation.navigate("Result", { result: response.data });
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || "Unknown error";
      Alert.alert("Error", message);
      console.error("Upload error:", error?.response?.data || error?.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Scan Your Crop</Text>
        <Text style={styles.subtitle}>Upload a clear photo of the affected crop</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <>
              <Text style={styles.uploadIcon}>🌿</Text>
              <Text style={styles.uploadText}>Tap to select image</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={handleUpload}>
          <Text style={styles.btnText}>🔍  Analyze Crop</Text>
        </TouchableOpacity>

        {imageUri && (
          <TouchableOpacity style={styles.btnOutline} onPress={pickImage}>
            <Text style={styles.btnOutlineText}>Change Image</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f7ee" },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "800", color: "#2d6a4f", marginBottom: 6 },
  subtitle: { fontSize: 13, color: "#52796f", marginBottom: 24 },
  imagePicker: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#95d5b2",
    borderStyle: "dashed",
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  uploadIcon: { fontSize: 48, marginBottom: 8 },
  uploadText: { color: "#74c69d", fontSize: 14, fontWeight: "600" },
  btn: {
    backgroundColor: "#2d6a4f",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  btnOutline: {
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#2d6a4f",
  },
  btnOutlineText: { color: "#2d6a4f", fontWeight: "600", fontSize: 15 },
});
