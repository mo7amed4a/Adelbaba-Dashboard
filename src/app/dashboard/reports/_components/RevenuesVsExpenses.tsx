"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Monday", revenue: 4000, expenses: 2400 },
  { name: "Tuesday", revenue: 3000, expenses: 55398 },
  { name: "Wednesday", revenue: 21000, expenses: 9800 },
  { name: "Thursday", revenue: 21780, expenses: 38908 },
  { name: "Friday", revenue: 18590, expenses: 47800 },
  { name: "Saturday", revenue: 2390, expenses: 34800 },
  { name: "Sunday", revenue: 23960, expenses: 37800 },
];

export default function RevenuesVsExpensesReport() {
  return (
    <Card className="w-full h- border-none shadow-none py-4 ">
      <CardHeader className="flex flex-row justify-between items-center py-3">
        <CardTitle>Revenues vs. Expenses</CardTitle>
        <CardDescription>
          <Download />
        </CardDescription>
      </CardHeader>
      <CardContent className="h-96 px-4">
        <ResponsiveContainer width="100%" height="100%" className="[&>div>div>ul>li>span]:capitalize [&>div>div>ul>li>span]:!text-black [&>div>div>ul>li>svg]:rounded-full [&>div>div>ul>li>svg]:overflow-hidden [&>div>div>ul>li>svg]:size-5">
          <BarChart 
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "10px"}} />
            <Bar dataKey="revenue" fill="hsla(42, 96%, 89%, 1)" className="!bg-red-500" />
            <Bar dataKey="expenses" fill="hsla(0, 0%, 73%, 1)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
