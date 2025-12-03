// src/styles/globalStyles.ts
import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  title: { 
    fontSize: 32, 
    fontWeight: "800", 
    color: colors.text, 
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: { 
    fontSize: 16, 
    color: colors.textLight, 
    marginBottom: 32,
    fontWeight: "400",
  },
  linkText: { 
    color: colors.text, 
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
