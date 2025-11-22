// app/(protected)/admin.tsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import gStyles from "../../src/styles/globalStyles";
import { getAllUsers } from "../../src/services/userService";

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // example: fetch user list (implement getAllUsers later)
    (async () => {
      try {
        const list = await getAllUsers();
        setUsers(list || []);
      } catch (err) {
        console.warn("Failed to fetch users", err);
      }
    })();
  }, []);

  return (
    <View style={gStyles.container}>
      <Text style={gStyles.title}>Admin Dashboard</Text>
      <Text>Users ({users.length})</Text>
      {users.map((u) => (
        <Text key={u.uid} style={{ marginTop: 8 }}>{u.email} — {u.role}</Text>
      ))}
    </View>
  );
}
