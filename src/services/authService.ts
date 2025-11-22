// src/services/authService.ts
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

/** Email/password */
export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const sendPasswordReset = (email: string) => sendPasswordResetEmail(auth, email);

/** Google ID token sign-in */
export const signInWithGoogleIdToken = async (idToken: string) => {
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  // create user doc if not exists
  const uid = result.user.uid;
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, { email: result.user.email, role: "user", createdAt: new Date().toISOString() }, { merge: true });
  return result;
};
