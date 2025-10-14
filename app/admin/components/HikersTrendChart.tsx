"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { areaData } from "../data/mockData";
import { fadeInUp } from "./animations";

export default function HikersTrendChart() {
  return (
    <motion.div {...fadeInUp(1.4)}>
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Hikers Growth Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hikers"
                stroke="#15803d"
                fill="#bbf7d0"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
