"use client";

interface Hike {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  level: string;
  duration: number;
}

export default function HikeCard({ hike }: { hike: Hike }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col">
      <img src={hike.image} alt={hike.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{hike.name}</h3>
      <p className="text-gray-600 text-sm">{hike.description}</p>
      <p className="text-sm text-gray-500 mt-1">
        Level: {hike.level} | Duration: {hike.duration} hrs
      </p>
      <span className="text-green-600 font-bold mt-2">Ksh {hike.price}</span>
    </div>
  );
}
