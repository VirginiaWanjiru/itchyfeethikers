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
    <aside className="w-64 bg-gray-800 text-white flex flex-col shadow-lg">
      <div className="text-center p-6 border-b border-gray-700">
        <img
          src="/logo.png"
          alt="ItchyFeet Logo"
          className="mx-auto w-24 h-24 object-contain  mb-4"
        />
        <h2 className="text-xl font-semibold">ItchyFeet Admin</h2>
        <p className="text-gray-400 text-sm">Welcome Back!</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              pathname === link.href
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* You can replace these with appropriate icons based on the link */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full transition-colors duration-200">
          Logout
        </button>
      </div>
    </aside>
  );
}
