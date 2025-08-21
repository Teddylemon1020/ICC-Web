"use client";

import { useState } from "react";

export default function AddNewsLetter() {
  const [file, setFile] = useState<File | null>(null);
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !headline || !body) {
      setStatus("⚠️ Please provide a headline, body, and image");
      return;
    }

    const base64 = await toBase64(file);

    const payload = {
      headline,
      body,
      image: {
        data: base64.split(",")[1], // strip metadata from base64
        contentType: file.type,
      },
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");

      setStatus("✅ Post created successfully!");
      setHeadline("");
      setBody("");
      setFile(null);
    } catch (err: any) {
      setStatus(`❌ ${err.message}`);
    }
  }

  function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="flex justify-center items-start min-h-screen pt-10 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-black rounded-lg shadow-md w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <textarea
          placeholder="Write your post body..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 w-full"
          rows={5}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Save
        </button>

        {status && <p className="text-center">{status}</p>}
      </form>
    </div>
  );
}
