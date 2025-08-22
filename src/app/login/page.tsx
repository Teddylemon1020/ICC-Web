"use client";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (passwordValue: string) => {
    const newErrors: string[] = [];

    if (passwordValue.length < 8) {
      newErrors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(passwordValue)) {
      newErrors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(passwordValue)) {
      newErrors.push("Password must contain at least one number.");
    }
    if (passwordValue !== password) {
      newErrors.push("Passwords do not match.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setStatus("⚠️ Please fill in all fields");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      setStatus(" Login successful!");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen pt-10 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white rounded-lg shadow-md w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            validatePassword(value); // realtime validation
          }}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

        {status && <p className="text-center">{status}</p>}
      </form>
    </div>
  );
}
