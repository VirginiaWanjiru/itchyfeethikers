"use client";

import { motion } from "framer-motion";
import DashboardStats from "./components/DashboardStats";
import BookingsOverviewChart from "./components/BookingsOverviewChart";
import CategoryPieChart from "./components/CategoryPieChart";
import HikersTrendChart from "./components/HikersTrendChart";
import RecentBlogs from "./components/RecentBlogs";
import { fadeIn } from "./components/animations";

export default function AdminDashboard() {
  return (
    <motion.div {...fadeIn(0.3)} className="p-6 space-y-8">
      <DashboardStats />

      <motion.h2
        {...fadeIn(0.8)}
        className="text-xl font-bold mt-6"
      >
        Overview
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingsOverviewChart />
        <CategoryPieChart />
      </div>

      <HikersTrendChart />
      <RecentBlogs />
    </motion.div>
  );
}
