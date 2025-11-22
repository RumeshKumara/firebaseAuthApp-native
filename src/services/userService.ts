// src/services/userService.ts
import { db } from "../config/firebase";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";

export const createUserDocument = async (uid: string, data: any) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, data, { merge: true });
};

export const getUserById = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

/** admin helper: get all users (admin screen) */
export const getAllUsers = async () => {
  const col = collection(db, "users");
  const snapshot = await getDocs(col);
  return snapshot.docs.map(d => ({ uid: d.id, ...(d.data() as any) }));
};
