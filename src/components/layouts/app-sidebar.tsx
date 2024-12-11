"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Gauge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GroupLinks, { ItemLink } from "./GroupLinks";
import { FaHome } from "react-icons/fa";

const subscriptionLinks = [
  { text: "Subscription Plans", href: "/dashboard/Subscription/plans" },
  { text: "Plans Features", href: "/dashboard/Subscription/plansfeatures" },
  { text: "Tracking Payment", href: "/dashboard/Subscription/Trackingpayment" },
  {
    text: "Membership Details",
    href: "/dashboard/Subscription/Membershipdetails",
  },
  { text: "Advertisements", href: "/dashboard/Advertisements" },
];

const communicationLinks = [
  { text: "Email", href: "/dashboard/communication/email" },
  { text: "Chat", href: "/dashboard/communication/chat" },
];

export function AppSidebar() {
  const [isCommunicationOpen, setCommunicationOpen] = useState(false); // Added state for communication dropdown

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <Link href="/" className="flex items-center justify-center gap-x-2">
          <Image
            src={"/logo.png"}
            width={35}
            height={70}
            className="py-4"
            alt={"logo"}
          />
          <h1 className="text-xl font-bold">AdelBaba.net</h1>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          <ItemLink href="/dashboard" text="Dashboard" Icon={Gauge} />
          <ItemLink
            href="/dashboard/Manegment"
            text="Management"
            Icon={Gauge}
          />
          <GroupLinks
            text="Subscriptions"
            Icon={FaHome}
            links={subscriptionLinks}
          />

          <GroupLinks
            text="Communication"
            Icon={FaHome}
            links={communicationLinks}
          />
          <ItemLink href="/dashboard/reports" text="Reports" Icon={Gauge} />
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
