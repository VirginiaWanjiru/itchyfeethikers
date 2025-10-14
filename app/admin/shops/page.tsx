"use client";
import { useState } from "react";
import ShopsList from "./components/ShopsList";
import ShopModal from "./components/ShopModal";
import { Shop } from "../types/shop";

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Shop | null>(null);

  const save = (shop: Shop) => {
    if (editing) setShops(s => s.map(x => x.id === shop.id ? shop : x));
    else setShops(s => [{ ...shop, id: Math.random().toString(36).slice(2, 9) }, ...s]);
    setOpen(false);
  };

  const remove = (id: string) => { if(!confirm('Remove shop?')) return; setShops(s => s.filter(x => x.id !== id)); };

  return (
    <section>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Shops</h2>
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setOpen(true)}>Add Shop</button>
      </div>

      <ShopsList shops={shops} onEdit={(s) => { setEditing(s); setOpen(true); }} onRemove={remove} />

      {open && <ShopModal initial={editing ?? undefined} onClose={() => setOpen(false)} onSave={save} />}
    </section>
  );
}
