// app/(protected)/home.tsx
import React from "react";
import { Text, View } from "react-native";
import AppButton from "../../src/components/AppButton";
import { useAuth } from "../../src/context/AuthContext";
import gStyles from "../../src/styles/globalStyles";

export default function Home() {
  const { user, role, logout } = useAuth();

  return (
    <View style={gStyles.container}>
      <Text style={gStyles.title}>Home</Text>
      <View style={{ backgroundColor: "#f5f5f5", padding: 20, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: "#e0e0e0" }}>
        <Text style={{ marginBottom: 8, color: "#666666", fontSize: 14, fontWeight: "600" }}>EMAIL</Text>
        <Text style={{ fontWeight: "700", marginBottom: 16, fontSize: 16 }}>{user?.email}</Text>
        <Text style={{ color: "#666666", fontSize: 14, fontWeight: "600" }}>ROLE</Text>
        <Text style={{ fontWeight: "700", fontSize: 16, marginTop: 4 }}>{role}</Text>
      </View>

      <AppButton title="Profile" onPress={() => (global as any).expoRouter?.push("/(protected)/profile")} style={{ marginTop: 8 }} />
      {role === "admin" && <AppButton title="Admin Dashboard" onPress={() => (global as any).expoRouter?.push("/(protected)/admin")} style={{ marginTop: 16, backgroundColor: "#ffffff", borderWidth: 2, borderColor: "#000000" }} textStyle={{ color: "#000000" }} />}

      <AppButton title="Logout" onPress={logout} style={{ marginTop: 32, backgroundColor: "#ffffff", borderWidth: 2, borderColor: "#000000" }} textStyle={{ color: "#000000" }} />
    </View>
  );
}
