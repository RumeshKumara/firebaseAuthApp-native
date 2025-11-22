// src/components/Loader.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Loader({ fullScreen = false }: { fullScreen?: boolean }) {
  if (fullScreen) {
    return (
      <View style={styles.full}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1, alignItems: "center", justifyContent: "center" },
  overlay: { position: "absolute", left: 0, top: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
});
