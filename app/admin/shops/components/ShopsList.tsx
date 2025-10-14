"use client";
import { Shop } from "../../types/shop";

export default function ShopsList({ shops, onEdit, onRemove }: { shops: Shop[]; onEdit: (s: Shop) => void; onRemove: (id: string) => void; }) {
  if (!shops.length) return <div className="text-gray-500">No shops yet</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {shops.map(s => (
        <div key={s.id} className="bg-white rounded shadow p-4">
          <h3 className="font-semibold">{s.name} <span className="text-sm text-gray-500">• {s.location}</span></h3>
          <p className="text-sm text-gray-600 mt-2">{s.description}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => onEdit(s)} className="px-2 py-1 border">Edit</button>
            <button onClick={() => onRemove(s.id)} className="px-2 py-1 border text-red-600">Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
