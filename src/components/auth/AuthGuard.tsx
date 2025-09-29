"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import bcrypt from "bcrypt";
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

const SALT_ROUNDS = 12; // 10–12 is typical

// Hash (with auto-generated salt)
export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
}

// Verify password against stored hash
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  return bcrypt.compare(password, storedHash);
}

// Demo
(async () => {
  const password = "mySecret123";

  // Hash
  const hash = await hashPassword(password);
  console.log("Stored hash:", hash);

  // Verify (will be true)
  const ok = await verifyPassword(password, hash);
  console.log("Correct password?", ok);

  // Wrong password
  const fail = await verifyPassword("wrongPassword", hash);
  console.log("Wrong password?", fail);
})();
