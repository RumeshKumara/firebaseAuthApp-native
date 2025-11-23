// app/index.tsx
import React from "react";
import { Redirect } from "expo-router";

export default function Index() {
  // index just redirects to (auth)/login or (protected)/home will be handled by AuthContext listener
  return <Redirect href="/(auth)/login" />;
}
