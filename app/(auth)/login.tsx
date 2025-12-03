// app/(auth)/login.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Loader from "../../src/components/Loader";
import { useAuth } from "../../src/context/AuthContext";
import gStyles from "../../src/styles/globalStyles";

// For Google Sign-In
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

export default function Login() {
  const router = useRouter();
  const { login, user, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);

  // Google request (webClientId must be set in .env or replaced below)
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "<YOUR_IOS_CLIENT_ID>",
    androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
    webClientId: "<YOUR_WEB_CLIENT_ID>",
    redirectUri: makeRedirectUri(),
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

      <TouchableOpacity onPress={() => router.push("/(auth)/reset-password")} style={{ marginTop: 8, marginBottom: 24 }}>
        <Text style={gStyles.linkText}>Forgot password?</Text>
      </TouchableOpacity>

      <AppButton title="Login" onPress={handleLogin} style={{ marginTop: 8 }} />

      <AppButton 
        title="Sign in with Google" 
        onPress={() => promptAsync()} 
        style={{ marginTop: 16, backgroundColor: "#ffffff", borderWidth: 2, borderColor: "#000000" }} 
        textStyle={{ color: "#000000" }}
      />

      <View style={{ flexDirection: "row", marginTop: 32, justifyContent: "center" }}>
        <Text style={{ color: "#666666", fontSize: 15 }}>Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={[gStyles.linkText, { fontSize: 15 }]}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
