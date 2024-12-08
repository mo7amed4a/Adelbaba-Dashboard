'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { day: "Sat", subscriptions: 35 },
  { day: "Sun", subscriptions: 65 },
  { day: "Mon", subscriptions: 55 },
  { day: "Tue", subscriptions: 85 },
  { day: "Wed", subscriptions: 45 },
]

export default function ActiveSubscriptions() {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Active Subscriptions</CardTitle>
        <p className="text-3xl mt-2">2,615</p>
      </CardHeader>
      <CardContent className="h-auto">
        <div className="h-[21rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} className="fill-primary text-primary">
              <XAxis
                dataKey="day"
                stroke="currentColor"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Bar
                dataKey="subscriptions"
                radius={[4, 4, 0, 0]}
                background={{ fill: "#FFF5E6" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <p className="flex items-center gap-2">
            <span className="text-2xl">30%</span>
            <span className="text-sm text-muted-foreground">
              Your new subscriptions are 30% more acyive than last month
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

