"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthForm({ type }: { type: "signin" | "signup" }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // ✅ Spinner state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ✅ Start loading spinner

    try {
      if (!formData.email || !formData.password) {
        setError("Please enter both email and password.");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      if (type === "signup") {
        // --- SIGNUP FLOW ---
        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
        });

        if (error) throw error;

        const user = data.user;
        if (!user) {
          setError("Check your email for a verification link before signing in.");
          return;
        }

        const { error: profileError } = await supabase.from("profiles").upsert([
          {
            id: user.id,
            full_name: formData.full_name,
            username: formData.username,
            email: formData.email,
            role: "user",
          },
        ]);

        if (profileError) throw profileError;

        alert("Account created! Please verify your email before signing in.");
        router.push("/auth/signin");
      } else {
        // --- SIGNIN FLOW ---
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password,
        });

        if (error) throw error;

        const user = data.user;
        if (!user) {
          setError("Invalid login credentials.");
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profileError || !profileData) {
          setError("Unable to fetch profile information.");
          return;
        }

        if (profileData.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error(`${type} error:`, err);
      setError(err.message || `${type} failed. Please try again.`);
    } finally {
      setLoading(false); // ✅ Stop loading spinner
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "signup" && (
        <>
          <input
            type="text"
            placeholder="Full name"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* ✅ Button with spinner */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 p-2 rounded text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {type === "signin" ? "Signing in..." : "Creating account..."}
          </>
        ) : (
          type === "signin" ? "Sign In" : "Sign Up"
        )}
      </button>
    </form>
  );
}
