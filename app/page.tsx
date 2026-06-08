"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      parentName: (form.elements.namedItem("parentName") as HTMLInputElement).value,
      dueDate: (form.elements.namedItem("dueDate") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-indigo-200 flex items-center justify-center p-4">
        <div className="bg-amber-50 rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🐣</div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">You&apos;re signed up!</h1>
          <p className="text-gray-500">
            Check your inbox — your first email is on its way.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-indigo-200 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-amber-50 rounded-2xl shadow-lg p-8 sm:p-14 max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="text-6xl sm:text-7xl mb-4">🌱</div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-800">Baby Tracker</h1>
          <p className="text-gray-500 mt-3 text-lg sm:text-xl max-w-md mx-auto">
            Get weekly emails about a pregnancy you&apos;re following — fetal development info and a fun animal size comparison.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1.5">
              Your email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="parentName" className="block text-lg font-medium text-gray-700 mb-1.5">
              Parent&apos;s first name
            </label>
            <input
              id="parentName"
              name="parentName"
              type="text"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
              placeholder="e.g. Alex"
            />
            <p className="text-sm text-gray-400 mt-1.5">The pregnant parent</p>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-lg font-medium text-gray-700 mb-1.5">
              Their due date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-indigo-400 hover:bg-indigo-500 disabled:opacity-60 text-white font-medium py-3.5 rounded-lg transition-colors text-xl"
          >
            {status === "loading" ? "Signing up…" : "Start tracking"}
          </button>
        </form>
      </div>
    </main>
  );
}
