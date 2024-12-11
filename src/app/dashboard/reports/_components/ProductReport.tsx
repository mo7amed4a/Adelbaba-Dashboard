import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export default function ProductReport() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Avatar className="rounded">
          <AvatarImage src="/products/products1.jpeg" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div>
          <h2>V23 Laptop</h2>
          <p className="text-gray-500 text-sm">Hardware Co.</p>
        </div>
      </div>
      <p className="text-primary">1817 Sold</p>
    </div>
  );
}
