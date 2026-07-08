/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types/auth";
import { useRouter } from "next/navigation";
import { AuthAPI } from "../api";
import { toast } from "sonner";



export interface AuthContextInterface {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  isAuthenticated: boolean;
  saveUserData: (user: User | null) => void;
  logout: ()=> void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function AuthContextProvider({children}: {children: ReactNode}) {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const isAuthenticated = !!userData;

  const saveUserData = (user: User | null) => {
    setUserData(user);

    if (user) {
      localStorage.setItem("profile", JSON.stringify(user));
    } else {
      localStorage.removeItem("profile");
    }
  };

  const logout = async () => {
      try {
        const response = await AuthAPI.Logout()
        localStorage.removeItem("token")
        localStorage.removeItem("profile")
        setUserData(null)
        router.replace("/")
        toast.success(response?.data?.message)
      } catch (error) {
        console.log(error)
      }
    }


  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");

    if (storedProfile) {
      setUserData(JSON.parse(storedProfile));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{userData, setUserData, loading, isAuthenticated, saveUserData, logout}}>
      {children}
    </AuthContext.Provider>
  );
}