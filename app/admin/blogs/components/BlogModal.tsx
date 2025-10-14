"use client";
import { useState, ChangeEvent } from "react";
import { Blog } from "../../types/blog";

export default function BlogModal({ initial, onClose, onSave }: { initial?: Blog; onClose: () => void; onSave: (b: Blog) => void; }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [image, setImage] = useState(initial?.image ?? "");

  // file input optional: for now we accept a URL; later swap for upload flow.
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[680px] max-w-full">
        <h3 className="text-lg font-semibold mb-3">{initial ? "Edit Blog" : "Add Blog"}</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Title" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded h-40 mb-2" />
        <input value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Image URL (or later upload)" />
        <div className="flex justify-end gap-2 mt-3">
          <button className="px-3 py-1 border" onClick={onClose}>Cancel</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={() => onSave({ id: initial?.id ?? '', title, content, image, createdAt: initial?.createdAt })}>Save</button>
        </div>
      </div>
    </div>
  );
}
