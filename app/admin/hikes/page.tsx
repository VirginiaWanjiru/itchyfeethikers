"use client";
import { useEffect, useState } from "react";
import HikeCard from "../components/HikeCard";
import Modal from "../components/Modal";
import { Hike } from '../../admin/types/hikes';

export default function page() {
  const [hikes, setHikes] = useState< Hike[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all hikes from backend API
  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const res = await fetch("/api/hikes");
        if (!res.ok) throw new Error("Failed to fetch hikes");
        const data = await res.json();
        setHikes(data);
      } catch (err) {
        console.error("Error loading hikes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHikes();
  }, []);

 const handleAddHike = async (newHike: Hike) => {
  try {
    // Convert strings to numbers before sending
    const formattedHike = {
      ...newHike,
      price: Number(newHike.price),
      duration_hours: Number(newHike.duration_hours),
    };

    const res = await fetch("/api/hikes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedHike),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Supabase error:", errData);
      throw new Error("Failed to add hike");
    }

    const created = await res.json();
    setHikes((prev) => [...prev, created]);
    setShowModal(false);
  } catch (err) {
    console.error("Error creating hike:", err);
    alert("Failed to add hike");
  }
};


  if (loading) return <p>Loading hikes...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Hikes</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Hike
        </button>
      </div>

      {hikes.length === 0 ? (
        <p>No hikes available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hikes.map((hike) => (
            <HikeCard key={hike.id} hike={hike} />
          ))}
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)} onSave={handleAddHike} />
      )}
    </div>
  );
}
