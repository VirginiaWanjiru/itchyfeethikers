"use client";
import { useState } from "react";
import BookingsList from "./components/BookingsList";
import { Booking } from "../types/booking";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: "bk1", hikeId: "h1", userId: "u1", amount: 2500, paid: true, date: "2025-09-01" },
    { id: "bk2", hikeId: "h1", userId: "u2", amount: 2500, paid: false, date: "2025-09-05" },
  ]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Bookings</h2>
      <BookingsList bookings={bookings} />
    </section>
  );
}
