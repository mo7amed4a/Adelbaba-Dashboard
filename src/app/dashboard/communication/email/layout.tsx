
import SendEmail from "@/components/email/SendEmail";
import SubHeader from "@/components/layouts/SubHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
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


export default function page({
    children
}:{
    children: React.ReactNode
}) {
  return (
    <div className="py-4 space-y-4">
      <SubHeader title="Email" />
      <section className="flex flex-col md:flex-row gap-4">
        <Card className="space-y-6 min-w-60 bg-white shadow-none border-none">
          <CardHeader>
           <SendEmail />
          </CardHeader>
          <CardContent className="space-y-1">
            {folders.map((folder) => (
              <Link href={`/dashboard/communication/email/${folder.label.toLocaleLowerCase() === 'inbox' ? "" : folder.label.toLocaleLowerCase()}`}
                key={folder.label}
                className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span>{folder.icon}</span>
                  <span>{folder.label}</span>
                </div>
                <span className="text-sm text-gray-500">{folder.count}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
        {children}
      </section>
    </div>
  );
}
