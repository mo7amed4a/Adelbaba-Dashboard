import SubHeader from "@/components/layouts/SubHeader";
import React from "react";
import PieChartReport from "./_components/PieChart";
import AreaChartReport from "./_components/AreaChart";
import RevenuesVsExpensesReport from "./_components/RevenuesVsExpenses";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductReport from "./_components/ProductReport";
import CalendarReport from "./_components/CalenderReport";
import SearchInput from "@/components/layouts/SearchInput";

export default function page() {
  return (
    <div>
      <SubHeader title="Reports">
       <div className="flex gap-4">
        <SearchInput  className="bg-white rounded-full border-none"/>
        <CalendarReport />
       </div>
      </SubHeader>
      <div className="grid md:grid-cols-8 gap-4">
        <div className="grid md:grid-cols-2 gap-4 md:col-span-6">
          <PieChartReport />
          <AreaChartReport />
          <div className="col-span-full">
            <RevenuesVsExpensesReport />
          </div>
        </div>
        <Card className="border-none shadow-none md:col-span-2">
          <CardHeader>
            <h3 className="font-bold">Top Selling Products</h3>
          </CardHeader>
          <CardContent className="grid space-y-4">
            {[...Array(10)].map((_, index) => (
              <ProductReport key={index} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
