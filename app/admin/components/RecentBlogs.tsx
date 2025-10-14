"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp } from "./animations";

export default function RecentBlogs() {
  return (
    <motion.div {...fadeInUp(1.6)}>
      <h2 className="text-xl font-bold mt-8 mb-4">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src={`https://source.unsplash.com/random/400x300?sig=${i}&hiking`}
                alt="Blog"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">Blog Title {i}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Short description of the blog content goes here for preview...
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 transition">
                  View
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
