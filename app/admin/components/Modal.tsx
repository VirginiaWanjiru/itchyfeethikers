"use client";
import { useState } from "react";

export default function Modal({ onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    level: "easy",
    duration: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Add New Hike</h3>

        <input
          name="name"
          placeholder="Hike Name"
          className="w-full border p-2 rounded mb-2"
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price (Ksh)"
          type="number"
          className="w-full border p-2 rounded mb-2"
          onChange={handleChange}
        />
        <select
          name="level"
          className="w-full border p-2 rounded mb-2"
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input
          name="duration"
          placeholder="Duration (hours)"
          type="number"
          className="w-full border p-2 rounded mb-2"
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="Image URL"
          className="w-full border p-2 rounded mb-2"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={() => onSave(formData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
