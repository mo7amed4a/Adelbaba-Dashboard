"use client"

import { Download, TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { name: "Shipped", count: 35, fill: "hsla(129, 92%, 78%, 1)" },
  { name: "Processing", count: 55, fill: "hsla(42, 96%, 89%, 1)" },
  { name: "Cancelled", count: 10, fill: "hsla(359, 100%, 84%, 1)" },
]

const chartConfig = {
  shipped: {
    label: "Shipped",
  },
  processing: {
    label: "Processing",
  },
  cancelled: {
    label: "Cancelled",
  },

} satisfies ChartConfig

export default function PieChartReport() {
  return (
    <Card className="flex flex-col border-none shadow-none">
      <CardHeader className="flex flex-row justify-between items-center pb-0">
        <CardTitle>Total shipments</CardTitle>
        <CardDescription><Download /></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 items-start text-sm -mt-24 md:-mt-28">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="size-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
