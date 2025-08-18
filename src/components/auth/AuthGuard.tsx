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
