"use client";

import { useState } from "react";
import BlogsList from "./components/BlogsList";
import BlogModal from "./components/BlogModal";
import { Blog } from "../types/blog";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([
    { id: "b1", title: "Top hikes", content: "Short...", image: "/images/sample1.jpg", createdAt: "2025-06-01" },
  ]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);

  const onSave = (blog: Blog) => {
    if (editing) {
      setBlogs((s) => s.map((b) => (b.id === blog.id ? blog : b)));
    } else {
      setBlogs((s) => [{ ...blog, id: Math.random().toString(36).slice(2, 9), createdAt: new Date().toISOString() }, ...s]);
    }
    setOpen(false);
    setEditing(null);
  };

  const onRemove = (id: string) => {
    if (!confirm("Remove blog?")) return;
    setBlogs((s) => s.filter((b) => b.id !== id));
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Blogs</h2>
        <div>
          <button onClick={() => setOpen(true)} className="bg-blue-600 px-3 py-1 text-white rounded">Add Blog</button>
        </div>
      </div>

      <BlogsList blogs={blogs} onEdit={(b)=>{ setEditing(b); setOpen(true); }} onRemove={onRemove} />

      {open && <BlogModal initial={editing ?? undefined} onClose={() => { setOpen(false); setEditing(null); }} onSave={onSave} />}
    </section>
  );
}
