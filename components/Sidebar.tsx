"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Calendar,
  CreditCard,
  Heart,
  Settings,
  Menu,
  X,
  Mountain,
  LogOut,
  LucideIcon,
} from "lucide-react";

type NavItem = { name: string; path: string; icon: LucideIcon };

const navItems: NavItem[] = [
  { name: "Profile", path: "/", icon: User },
  { name: "Bookings", path: "/bookings", icon: Calendar },
  { name: "Payments", path: "/payments", icon: CreditCard },
  { name: "Favorites", path: "/favorites", icon: Heart },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/");
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border transition-transform duration-300 z-40 overflow-y-auto overflow-x-visible ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-soft">
              <Mountain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Dashboard</h2>
              <p className="text-xs text-muted-foreground">Navigate your journey</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-transform duration-300 ease-out ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft font-semibold"
                    : "text-foreground hover:bg-yellow-400 hover:translate-x-3 hover:scale-[1.02]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                
              </Link>
              
            );
            
          })}
          
        </nav>

        {/* Log Out Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-transform duration-200 w-full text-foreground hover:bg-destructive/10 hover:text-destructive hover:translate-x-1"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};