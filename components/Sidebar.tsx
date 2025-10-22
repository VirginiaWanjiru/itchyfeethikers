"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, Calendar, CreditCard, Heart, Settings, Menu, X, Mountain, LogOut } from "lucide-react";

const navItems = [
  { name: "Profile", path: "/", icon: User },
  { name: "Bookings", path: "/bookings", icon: Calendar },
  { name: "Payments", path: "/payments", icon: CreditCard },
  { name: "Favorites", path: "/favorites", icon: Heart },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const logout = () => {
    // Add logout logic (e.g. clear session)
    router.push("/dashboard");
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow">
            <Mountain className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Dashboard</h2>
            <p className="text-xs text-muted-foreground">Navigate your journey</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-2">
          {navItems.map(({ name, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                pathname === path
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-secondary/60 text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
