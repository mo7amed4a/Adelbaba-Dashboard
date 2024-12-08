"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const data = [
    { month: "January", revenue: 186 },
  { month: "February", revenue: 7305 },
  { month: "March", revenue: 74237 },
  { month: "April", revenue: 7873 },
  { month: "May", revenue: 22109 },
  { month: "June", revenue: 97414 },
  { month: "May", revenue: 11000 },
  { month: "June", revenue: 77000 },
  { month: "July", revenue: 31000 },
  { month: "August", revenue: 20000 },
  { month: "September", revenue: 25000 },
  { month: "October", revenue: 33000 },
  
];

export default function RevenueChart() {
  return (
    <Card className="p-6 space-y-8 border-none shadow-none">
      <CardHeader className="grid grid-cols-2">
        <CardTitle>
          <h2 className="text-3xl font-semibold tracking-tight">Revenue</h2>
        </CardTitle>
        <CardDescription className="flex justify-end">
          <Select defaultValue="october">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="october">October</SelectItem>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="august">August</SelectItem>
            </SelectContent>
          </Select>
        </CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%" className="text-primary">
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              // stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              // stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="currentColor"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
