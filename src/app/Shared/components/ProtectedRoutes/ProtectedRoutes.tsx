"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/src/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "Instructor" | "Student";
}

export default function ProtectedRoutes({children, role}: ProtectedRouteProps) {
  const router = useRouter();
  const { userData, loading, isAuthenticated } = useContext(AuthContext)!;

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/");
      return;
    }

    if (role && userData?.role !== role) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, userData, role, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (role && userData?.role !== role) {
    return null;
  }

  return children;
}