import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import API from "../services/api";

import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import ResultScreen from "../screens/ResultScreen";
import AIAssistantScreen from "../screens/AIAssistantScreen";

const Stack = createNativeStackNavigator();

function LogoutButton({ navigation }) {
  const handleLogout = () => {
    delete API.defaults.headers.common["Authorization"];
    navigation.replace("Login");
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={styles.logout}>Logout</Text>
    </TouchableOpacity>
  );
}

const authScreenOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: "#2d6a4f" },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "700" },
  gestureEnabled: true,
  headerBackVisible: true,
  headerRight: () => <LogoutButton navigation={navigation} />,
});

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({ ...authScreenOptions({ navigation }), headerBackVisible: false, gestureEnabled: false })} />
      <Stack.Screen name="Upload" component={UploadScreen} options={authScreenOptions} />
      <Stack.Screen name="Result" component={ResultScreen} options={authScreenOptions} />
      <Stack.Screen name="AIAssistant" component={AIAssistantScreen} options={{ ...authScreenOptions, title: "AI Assistant" }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: { color: "#d4edda", fontWeight: "600", marginRight: 4 },
});
