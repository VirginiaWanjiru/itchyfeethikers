"use client";

import UsersList from "./components/UsersList";
//import CSVExportButton from "../components/CSVExportButton";
import { User } from "../types/user";

export default function UsersPage() {
  // mock data
  const users: User[] = [
    { id: "u1", name: "Alice", email: "alice@example.com", role: "user", createdAt: "2025-01-01" },
    { id: "u2", name: "Brian", email: "brian@example.com", role: "guide", createdAt: "2025-02-01" },
  ];

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        {/* <CSVExportButton data={users} filename="users.csv" /> */}
      </div>
      <UsersList initialUsers={users} />
    </section>
  );
}
