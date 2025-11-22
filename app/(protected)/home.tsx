// app/(protected)/home.tsx
import React from "react";
import { View, Text } from "react-native";
import gStyles from "../../src/styles/globalStyles";
import AppButton from "../../src/components/AppButton";
import { useAuth } from "../../src/context/AuthContext";

export default function Home() {
  const { user, role, logout } = useAuth();

  return (
    <View style={gStyles.container}>
      <Text style={gStyles.title}>Home</Text>
      <Text style={{ marginBottom: 8 }}>Email:</Text>
      <Text style={{ fontWeight: "700", marginBottom: 12 }}>{user?.email}</Text>
      <Text>Role: {role}</Text>

      <AppButton title="Profile" onPress={() => (global as any).expoRouter?.push("/(protected)/profile")} style={{ marginTop: 20 }} />
      {role === "admin" && <AppButton title="Admin Dashboard" onPress={() => (global as any).expoRouter?.push("/(protected)/admin")} style={{ marginTop: 12 }} />}

      <AppButton title="Logout" onPress={logout} style={{ marginTop: 24, backgroundColor: "#DC2626" }} />
    </View>
  );
}
