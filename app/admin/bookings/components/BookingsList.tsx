"use client";
import { Booking } from "../../types/booking";

export default function BookingsList({ bookings }: { bookings: Booking[]; }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50"><tr><th className="p-2">Hike</th><th className="p-2">User</th><th className="p-2">Amount</th><th className="p-2">Status</th></tr></thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{b.hikeId}</td>
              <td className="p-2">{b.userId}</td>
              <td className="p-2">Ksh {b.amount}</td>
              <td className="p-2">{b.paid ? <span className="text-green-600">Paid</span> : <span className="text-yellow-600">Not paid</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
