// src/components/AppInput.tsx
import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
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
  container: { width: "100%", marginBottom: 20 },
  label: { 
    marginBottom: 8, 
    color: colors.text, 
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  input: { 
    borderWidth: 2, 
    borderColor: colors.border, 
    borderRadius: 12, 
    padding: 16, 
    backgroundColor: colors.background,
    fontSize: 16,
    color: colors.text,
    fontWeight: "500",
  },
});
