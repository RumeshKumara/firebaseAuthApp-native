// app/index.tsx
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  // Redirect to get-started page first
  return <Redirect href="/get-started" />;
}
