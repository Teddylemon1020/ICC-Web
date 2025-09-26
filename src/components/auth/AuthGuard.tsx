"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // 🚀 redirect to login
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // ⏳ while checking session
  }

  // Render children only if authenticated
  return <>{session ? children : null}</>;
}

//return to project

export const verificationPipeLine = [
  // Step 1: Verify email
  async (user: any) => {
    if (!user.emailVerified) {
      throw new Error("Email not verified");
    }
    return user;
  },
  // Step 2: Check if user is active
  async (user: any) => {
    if (!user.isActive) {
      throw new Error("User is not active");
    }
    return user;
  },
  // Step 3: Check if user has required role
  async (user: any, requiredRole: string) => {
    if (user.role !== requiredRole) {
      throw new Error("Insufficient permissions");
    }
    return user;
  },
];
