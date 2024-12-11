"use client";

import { ReactNode, useState } from "react";
import SubHeader from "@/components/layouts/SubHeader";
import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SubHeader title="Chat" />

      <div className="flex relative overflow-hidden gap-4">
        <Sidebar />

        {children}
      </div>
    </>
  );
}
