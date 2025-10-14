"use client";
import { useState } from "react";
import PaymentsList from "./components/PaymentsList";
import { Payment } from "../types/payment";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([
    { id: "p1", bookingId: "bk1", method: "Mpesa", amount: 2500, status: "confirmed" },
    { id: "p2", bookingId: "bk2", method: "Card", amount: 2000, status: "pending" },
  ]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Payments</h2>
      <PaymentsList payments={payments} />
    </section>
  );
}
