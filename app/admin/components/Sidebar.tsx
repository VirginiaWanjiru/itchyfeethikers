"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/hikes", label: "Hikes" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/shops", label: "Shops" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/payments", label: "Payments" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-green-900 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-green-700">ItchyFeet Admin</h2>
      <nav className="flex-1 p-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block p-2 rounded-md mb-1 ${
              pathname === link.href ? "bg-green-900" : "hover:bg-green-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
