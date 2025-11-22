// src/components/AppInput.tsx
import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import colors from "../styles/colors";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  secureTextEntry?: boolean;
} & TextInputProps;

export default function AppInput({ label, placeholder, value, onChangeText, secureTextEntry, ...rest }: Props) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 16 },
  label: { marginBottom: 6, color: colors.text, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 12, backgroundColor: "#fff" },
});
