"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ActiveSubscriptions({
  data,
}: {
  data: {
    increaseThisMonth: number;
    trendThisWeek: {
      day: string;
      percentage: number;
    }[];
    total: number;
  };
}) {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Active Subscriptions
        </CardTitle>
        <p className="text-3xl mt-2">{data?.total}</p>
      </CardHeader>
      <CardContent className="h-auto">
        <div className="h-[21rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.trendThisWeek} className="fill-primary text-primary">
              <XAxis
                dataKey="day"
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Bar
                dataKey="percentage"
                radius={[4, 4, 0, 0]}
                background={{ fill: "#FFF5E6" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <p className="flex items-center gap-2">
            <span className="text-2xl">{data?.increaseThisMonth}%</span>
            <span className="text-sm text-muted-foreground">
              Your new percentage are 30% more acyive than last month
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
