// app/(protected)/profile.tsx
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import AppButton from "../../src/components/AppButton";
import { useAuth } from "../../src/context/AuthContext";
import gStyles from "../../src/styles/globalStyles";
// For image uploads you can integrate expo-image-picker later.

export default function Profile() {
  const { user, role } = useAuth();
  const [photoUrl] = useState<string | null>(null);

  return (
    <View style={gStyles.container}>
      <Text style={gStyles.title}>Profile</Text>

      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: "#000000", alignItems: "center", justifyContent: "center", marginBottom: 16, borderWidth: 4, borderColor: "#e0e0e0" }}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={{ width: 120, height: 120, borderRadius: 60 }} />
          ) : ( 
            <Text style={{ color: "#ffffff", fontSize: 48, fontWeight: "700" }}>{user?.email?.charAt(0).toUpperCase()}</Text>
          )}
        </View>
      </View>

      <View style={{ backgroundColor: "#f5f5f5", padding: 20, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: "#e0e0e0" }}>
        <Text style={{ color: "#666666", fontSize: 14, fontWeight: "600" }}>EMAIL</Text>
        <Text style={{ fontWeight: "700", marginBottom: 16, fontSize: 16, marginTop: 4 }}>{user?.email}</Text>

        <Text style={{ color: "#666666", fontSize: 14, fontWeight: "600" }}>ROLE</Text>
        <Text style={{ fontWeight: "700", fontSize: 16, marginTop: 4 }}>{role}</Text>
      </View>

      <AppButton title="Edit Profile" onPress={() => Alert.alert("Feature", "Add edit/upload later")} style={{ backgroundColor: "#ffffff", borderWidth: 2, borderColor: "#000000" }} textStyle={{ color: "#000000" }} />
    </View>
  );
}
