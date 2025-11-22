// app/(auth)/reset-password.tsx
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import AppInput from "../../src/components/AppInput";
import AppButton from "../../src/components/AppButton";
import gStyles from "../../src/styles/globalStyles";
import { useAuth } from "../../src/context/AuthContext";

export default function ResetPassword() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) return Alert.alert("Enter email");
    try {
      await resetPassword(email.trim());
      Alert.alert("Success", "Password reset email sent");
      router.push("/(auth)/login");
    } catch (err: any) {
      Alert.alert("Error", err.message || String(err));
    }
  };

  return (
    <View style={gStyles.container}>
      <Text style={gStyles.title}>Reset Password</Text>
      <Text style={gStyles.subtitle}>Enter your account email</Text>

      <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />

      <AppButton title="Send Reset Email" onPress={handleReset} />
    </View>
  );
}
