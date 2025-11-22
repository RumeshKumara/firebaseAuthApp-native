// app/(auth)/login.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import AppInput from "../../src/components/AppInput";
import AppButton from "../../src/components/AppButton";
import Loader from "../../src/components/Loader";
import gStyles from "../../src/styles/globalStyles";
import { useAuth } from "../../src/context/AuthContext";

// For Google Sign-In
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

export default function Login() {
  const router = useRouter();
  const { login, user, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);

  // Google request (webClientId must be set in .env or replaced below)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "<YOUR_EXPO_CLIENT_ID>",
    iosClientId: "<YOUR_IOS_CLIENT_ID>",
    androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
    webClientId: "<YOUR_WEB_CLIENT_ID>",
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params as any;
      if (id_token) {
        // pass id_token to context to finish login
        loginWithGoogle(id_token).catch((err) => {
          Alert.alert("Google Login error", err.message);
        });
      }
    }
  }, [response]);

  useEffect(() => {
    if (user) router.replace("/(protected)/home");
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter email and password");
      return;
    }
    setLoadingLocal(true);
    try {
      await login(email.trim(), password);
      // on success AuthContext will redirect
    } catch (err: any) {
      Alert.alert("Login failed", err.message || String(err));
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <View style={gStyles.container}>
      {loadingLocal && <Loader />}
      <Image
        source={{ uri: "file:///mnt/data/a25363b1-3b91-43bd-be55-afb0f28aabff.png" }} // your uploaded file
        style={{ width: 96, height: 96, alignSelf: "center", marginBottom: 20 }}
      />
      <Text style={gStyles.title}>Welcome Back</Text>
      <Text style={gStyles.subtitle}>Login to continue</Text>

      <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <AppInput label="Password" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity onPress={() => router.push("/(auth)/reset-password")} >
        <Text style={gStyles.linkText}>Forgot password?</Text>
      </TouchableOpacity>

      <AppButton title="Login" onPress={handleLogin} style={{ marginTop: 16 }} />

      <AppButton title="Sign in with Google" onPress={() => promptAsync()} style={{ marginTop: 12, backgroundColor: "#DB4437" }} />

      <View style={{ flexDirection: "row", marginTop: 24, justifyContent: "center" }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={gStyles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
