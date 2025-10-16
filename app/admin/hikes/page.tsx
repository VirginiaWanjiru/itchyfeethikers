"use client";
import { useState } from "react";
import HikeCard from "../components/HikeCard";
import Modal from "../components/Modal";

export default function HikesPage() {
  const [hikes, setHikes] = useState([
    { id: "1", name: "Mt. Longonot", description: "Crater hike", price: 6500, level: "medium", duration: 4, image: "/image.png" },
    { id: "2", name: "Mt. Kenya", description: "Mountain hike", price: 7000, level: "medium", duration: 4, image: "/image.png" },
    
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleAddHike = (newHike: any) => {
    setHikes([...hikes, newHike]);
    setShowModal(false);
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hikes.map((hike) => (
          <HikeCard key={hike.id} hike={hike} />
          
        ))}
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} onSave={handleAddHike} />}
    </div>
  );
}
