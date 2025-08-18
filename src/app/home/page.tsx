"use client";

import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";

function Home() {
  return (
    <AuthGuard>
      <div>Home</div>
    </AuthGuard>
  );
}

export default Home;
