/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { AuthAPI } from "../api";
import { loginFormValues, RegisterFormValues } from "../types/auth";

// ── Types ──────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role?: "student" | "admin";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (loginData: loginFormValues) => Promise<void>;
  register: (registerData: RegisterFormValues) => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const raw = localStorage.getItem("user");

    if (token && raw) {
      try {
        const user: User = JSON.parse(raw);
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setState((s) => ({ ...s, isLoading: false }));
      }
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const persist = (user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const login = useCallback(async (loginData: loginFormValues) => {
    const { data } = await AuthAPI.Login(loginData);
    persist(data?.data?.profile, data?.data?.accessToken);
  }, []);

  const register = useCallback(async (registerData: RegisterFormValues) => {
    const { data } = await AuthAPI.Register(registerData);
    persist(data?.data?.profile, data?.data?.accessToken);
  }, []);

  const logout = useCallback(async() => {
    await AuthAPI.Logout()
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setState({ user: null, isAuthenticated: false, isLoading: false });
    window.location.href = "/auth/login";
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}