"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", name: "", username: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (type === "signup") {
      // Register user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            username: formData.username,
            role: "user",
          },
        },
      });
      if (error) setError(error.message);
      else router.push("/auth/signin");
    } else {
      // Sign in user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setError(error.message);
        return;
      }

      // Fetch role from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user?.id)
        .single();

      if (profileError || !profileData) {
        setError("Unable to fetch profile information.");
        return;
      }

      // Redirect based on role
      if (profileData.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-6 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {type === "signin" ? "Sign In" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
            <input name="username" placeholder="Username" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </>
        )}
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </button>
        <button type="button" onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white py-2 rounded">
          Continue with Google
        </button>
      </form>

      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
    </div>
  );
}
