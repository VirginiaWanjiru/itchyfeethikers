"use client";
import { useState } from "react";
import { Shop } from "../../types/shop";

export default function ShopModal({ initial, onClose, onSave }: { initial?: Shop; onClose: () => void; onSave: (s: Shop) => void; }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [desc, setDesc] = useState(initial?.description ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [image, setImage] = useState(initial?.image ?? "");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[600px] max-w-full">
        <h3 className="text-lg font-semibold mb-3">{initial ? "Edit Shop" : "Add Shop"}</h3>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Shop name" />
        <input value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Location" />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Description" />
        <input value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded mb-2" placeholder="Image URL (or upload later)" />
        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose} className="px-3 py-1 border">Cancel</button>
          <button onClick={() => onSave({ id: initial?.id ?? '', name, description: desc, location, image })} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
