// app/(auth)/register.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Loader from "../../src/components/Loader";
import { useAuth } from "../../src/context/AuthContext";
import gStyles from "../../src/styles/globalStyles";

export default function Register() {
  const router = useRouter();
  const { register, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.replace("/(protected)/home");
  }, [user]);

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert("Error", "Please fill fields");
    try {
      setSubmitting(true);
      await register(email.trim(), password);
      Alert.alert("Success", "Account created");
    } catch (err: any) {
      Alert.alert("Registration failed", err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={gStyles.container}>
      {submitting && <Loader />}
      <Text style={gStyles.title}>Create account</Text>
      <Text style={gStyles.subtitle}>Join now</Text>

      <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppInput label="Password" placeholder="6+ characters" value={password} onChangeText={setPassword} secureTextEntry />

      <AppButton title="Register" onPress={handleRegister} style={{ marginTop: 24 }} />
      
      <View style={{ flexDirection: "row", marginTop: 32, justifyContent: "center" }}>
        <Text style={{ color: "#666666", fontSize: 15 }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Text style={[gStyles.linkText, { fontSize: 15 }]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
