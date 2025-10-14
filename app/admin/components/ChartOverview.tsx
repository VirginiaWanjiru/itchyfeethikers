"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  bookings: number;
}

export default function ChartOverview({ data }: { data: DataItem[] }) {
  return (
    <div className="bg-white p-4 shadow rounded-lg h-80">
      <h3 className="text-lg font-semibold mb-4">Bookings per Hike</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bookings" fill="#2E5E4E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
