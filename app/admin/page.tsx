"use client";

import ChartOverview from "./components/ChartOverview";
//import CSVExportButton from "./components/CSVExportButton";

export default function AdminDashboardPage() {
  const dummyData = [
    { name: "Hike 1", bookings: 40 },
    { name: "Hike 2", bookings: 60 },
    { name: "Hike 3", bookings: 30 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <ChartOverview data={dummyData} />
      {/* <CSVExportButton data={dummyData} filename="hike-analytics.csv" /> */}
    </div>
  );
}
