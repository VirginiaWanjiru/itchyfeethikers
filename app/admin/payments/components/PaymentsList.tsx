
"use client";
import { Payment } from "../../types/payment";

export default function PaymentsList({ payments }: { payments: Payment[]; }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50"><tr><th className="p-2">Method</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Booking</th></tr></thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.method}</td>
              <td className="p-2">Ksh {p.amount}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">{p.bookingId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
