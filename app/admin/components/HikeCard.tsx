// ✅ Corrected HikeCard.tsx
import { Hike } from '../../admin/types/hikes';

interface HikeCardProps {
  hike: Hike;
}

export default function HikeCard({ hike }: HikeCardProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img
        src={hike.image_url}
        alt={hike.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
       
        <p className="text-gray-600 mb-2">{hike.description}</p>
        <p className="text-sm text-gray-500">⏱ {hike.duration_hours} hours</p>
        <p className="text-sm text-gray-700 font-semibold">Level: {hike.level}</p>
        <p className="text-green-700 font-bold mt-2">KES {hike.price}</p>
        <h3 className="text-lg font-bold">{hike.name}</h3>
      </div>
    </div>
  );
}
