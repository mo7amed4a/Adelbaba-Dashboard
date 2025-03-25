import Revenue from "@/components/charts/Revenue";
import SubHeader from "@/components/layouts/SubHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
const folders = [
  { icon: "📥", label: "Inbox", count: 1253 },
  { icon: "⭐", label: "Starred", count: 245 },
  { icon: "📤", label: "Sent", count: 24532 },
  { icon: "📝", label: "Draft", count: 9 },
  { icon: "⚠️", label: "Spam", count: 14 },
  { icon: "❗", label: "Important", count: 18 },
  { icon: "🗑️", label: "Bin", count: 9 },
];

export default function page() {
  return (
    <div className="py-4 space-y-4">
      <SubHeader title="Email" />
      <section className="flex gap-4">
        <Card className="space-y-6 min-w-60 bg-white shadow-none border-none">
          <CardHeader>
            <Button className="w-full bg-primary text-white">
              <Plus className="mr-2 h-4 w-4" /> Compose
            </Button>
          </CardHeader>

          <CardContent className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.label}
                className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span>{folder.icon}</span>
                  <span>{folder.label}</span>
                </div>
                <span className="text-sm text-gray-500">{folder.count}</span>
              </button>
            ))}
          </CardContent>
        </Card>
        <section className="grid 2xl:grid-cols-8 gap-5">
          <div className="col-span-6">
            <Revenue />
          </div>
          <div className="col-span-2">
            {/* <ActiveSubscriptions data={}/> */}
          </div>
        </section>
      </section>
    </div>
  );
}
