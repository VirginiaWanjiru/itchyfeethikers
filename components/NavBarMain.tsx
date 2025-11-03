"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  };

  return (
    <nav className="w-full bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <Link href="/" className="font-bold text-lg">ItchyFeet</Link>
        <Link href="/hikes">Hikes</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/blogs">Blogs</Link>
      </div>
      <div>
        {user ? (
          <button onClick={handleSignOut} className="bg-white text-green-700 px-3 py-1 rounded">
            Sign Out
          </button>
        ) : (
          <>
            <Link href="/auth/signin" className="mr-3">Sign In</Link>
            <Link href="/auth/signup" className="bg-white text-green-700 px-3 py-1 rounded">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
