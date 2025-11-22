// src/styles/globalStyles.ts
import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  title: { fontSize: 26, fontWeight: "700", color: colors.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  linkText: { color: colors.primary, fontWeight: "600" },
});
