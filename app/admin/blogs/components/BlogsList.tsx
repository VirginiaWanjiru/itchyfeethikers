"use client";

import { Blog } from "../../types/blog";

export default function BlogsList({ blogs, onEdit, onRemove }: { blogs: Blog[]; onEdit: (b: Blog) => void; onRemove: (id: string) => void; }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {blogs.map(b => (
        <div key={b.id} className="bg-white p-4 rounded shadow">
          <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3">
            {b.image ? <img src={b.image} alt={b.title} className="w-full h-full object-cover" /> : <div className="p-4 text-gray-400">No image</div>}
          </div>
          <h3 className="font-semibold">{b.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{b.content.slice(0,120)}{b.content.length>120 ? '...' : ''}</p>
          <div className="mt-3 flex gap-2">
            <button className="px-2 py-1 border" onClick={() => onEdit(b)}>Edit</button>
            <button className="px-2 py-1 border text-red-600" onClick={() => onRemove(b.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
