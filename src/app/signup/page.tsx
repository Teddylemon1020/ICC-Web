"use client";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = () => {
    const newErrors: string[] = [];

    if (password.length < 8) {
      newErrors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      newErrors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      newErrors.push("Password must contain at least one number.");
    }
    if (password !== confirmPassword) {
      newErrors.push("Passwords do not match.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !number || !username) {
      setStatus("⚠️ Please fill in all fields");
      return;
    }

    if (!validatePassword()) {
      return;
    }

    const payload = {
      email,
      password,
      number,
      username,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      setStatus(" Signup successful!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNumber("");
      setUsername("");
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
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validatePassword();
          }}
          className="border p-2 w-full"
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            validatePassword();
          }}
          className="border p-2 w-full"
          required
        />

        <input
          type="tel"
          placeholder="Enter phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Signup
        </button>

        {status && <p className="text-center">{status}</p>}
      </form>
    </div>
  );
}
