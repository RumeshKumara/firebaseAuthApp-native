// src/components/AppButton.tsx
import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import colors from "../styles/colors";

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
};

export default function AppButton({ title, onPress, style, textStyle }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style as any]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: colors.textWhite,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
