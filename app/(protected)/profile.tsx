// app/(protected)/profile.tsx
import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import gStyles from "../../src/styles/globalStyles";
import AppButton from "../../src/components/AppButton";
import { useAuth } from "../../src/context/AuthContext";
// For image uploads you can integrate expo-image-picker later.

export default function Profile() {
  const { user, role } = useAuth();
  const [photoUrl] = useState<string | null>(null);

  return (
    <View style={gStyles.container}>
      <Text style={gStyles.title}>Profile</Text>

      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12 }} />
      ) : ( 
        <Image source={{ uri: "file:///mnt/data/a25363b1-3b91-43bd-be55-afb0f28aabff.png" }} style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12 }} />
      )}

      <Text>Email:</Text>
      <Text style={{ fontWeight: "700", marginBottom: 8 }}>{user?.email}</Text>

      <Text>Role:</Text>
      <Text style={{ fontWeight: "700", marginBottom: 16 }}>{role}</Text>

      <AppButton title="Edit profile (coming)" onPress={() => Alert.alert("Feature", "Add edit/upload later")} />
    </View>
  );
}
