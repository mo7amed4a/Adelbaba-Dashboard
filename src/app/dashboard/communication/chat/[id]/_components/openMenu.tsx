"use client";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React from "react";

export default function OpenMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchParams.get("chatmenu") === "open") {
        params.delete("chatmenu");
        const url = `${pathname}?${params.toString()}`;
        router.push(url);
    }
    else {
        params.set("chatmenu", "open");
        const url = `${pathname}?${params.toString()}`;
        router.push(url);
    }
  };
  return (
    <Button size="icon" className="md:hidden" onClick={() => onPageChange()}>
      <Users />
    </Button>
  );
}
