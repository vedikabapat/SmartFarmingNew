import axios from "axios";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GEMINI_API_KEY = "AIzaSyChYFsXAmghNWZjU5YJmcSkO7XbHK05U-U";

export default function AIAssistantScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I'm your farming expert. Ask me anything about crops, diseases, or farming tips." },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: `You are a helpful farming expert.\n\nUser: ${trimmed}` },
              ],
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const reply = response.data.candidates[0].content.parts[0].text;
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      console.error("AI error:", error?.response?.status, error?.response?.data || error?.message);
      const errMsg = error?.response?.data?.error?.message || error?.message || "Unknown error";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Error: ${errMsg}` },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[styles.bubble, msg.role === "user" ? styles.userBubble : styles.aiBubble]}
            >
              {msg.role === "assistant" && <Text style={styles.bubbleLabel}>🌱 AgroAI</Text>}
              <Text style={[styles.bubbleText, msg.role === "user" && styles.userText]}>
                {msg.text}
              </Text>
            </View>
          ))}
          {loading && (
            <View style={styles.aiBubble}>
              <ActivityIndicator size="small" color="#2d6a4f" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask about your crops..."
            placeholderTextColor="#a0b89a"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={loading}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f0f7ee" },
  flex: { flex: 1 },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  bubble: {
    maxWidth: "80%",
    borderRadius: 14,
    padding: 12,
    marginBottom: 4,
  },
  aiBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#d8f3dc",
  },
  userBubble: {
    backgroundColor: "#2d6a4f",
    alignSelf: "flex-end",
  },
  bubbleLabel: { fontSize: 11, color: "#52796f", fontWeight: "700", marginBottom: 4 },
  bubbleText: { fontSize: 15, color: "#1b4332", lineHeight: 21 },
  userText: { color: "#fff" },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#d8f3dc",
    backgroundColor: "#fff",
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f7ee",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: "#1b4332",
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#95d5b2",
  },
  sendBtn: {
    backgroundColor: "#2d6a4f",
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: { color: "#fff", fontSize: 16 },
});
