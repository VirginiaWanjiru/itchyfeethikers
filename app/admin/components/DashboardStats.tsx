"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fadeInUp } from "./animations";

const stats = [
  { title: "Total Bookings", value: "1,200", color: "bg-green-100" },
  { title: "Total Trips", value: "24", color: "bg-yellow-100" },
  { title: "Total Revenue", value: "Ksh. 56,000", color: "bg-blue-100" },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((card, i) => (
        <motion.div key={i} {...fadeInUp(i * 0.2)}>
          <Card
            className={`hover:shadow-lg transition-transform hover:scale-105 ${card.color}`}
          >
            <CardHeader>
              <CardTitle className="text-gray-700">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{card.value}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
