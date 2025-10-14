"use client";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      <button className="bg-blue-600 text-white px-3 py-1 rounded">Logout</button>
    </header>
  );
}
