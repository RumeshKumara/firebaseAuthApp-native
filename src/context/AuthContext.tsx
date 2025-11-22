// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";
import * as authService from "../services/authService";
import * as userService from "../services/userService";
import { useRouter } from "expo-router";

type AuthContextType = {
  user: User | null;
  role: string | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const un = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        const data = await userService.getUserById(firebaseUser.uid);
        setRole(data?.role ?? "user");
        // redirect to protected home
        router.replace("/(protected)/home");
      } else {
        setUser(null);
        setRole(null);
        router.replace("/(auth)/login");
      }
      setLoading(false);
    });

    return () => un();
  }, []);

  const register = async (email: string, password: string) => {
    const cred = await authService.registerUser(email, password);
    // create user doc with default role
    await userService.createUserDocument(cred.user.uid, { email, role: "user", createdAt: new Date().toISOString() });
    return cred;
  };

  const login = async (email: string, password: string) => {
    return authService.loginUser(email, password);
  };

  const logout = async () => {
    await authService.logoutUser();
  };

  const resetPassword = async (email: string) => {
    return authService.sendPasswordReset(email);
  };

  const loginWithGoogle = async (idToken: string) => {
    // authService should implement signInWithGoogle using idToken
    return authService.signInWithGoogleIdToken(idToken);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, register, login, logout, resetPassword, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
