'use client';

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

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          <ItemLink isActive href="/" text="Dashboard" Icon={Gauge} />
          <ItemLink href="/dashboard/Manegment" text="Management" Icon={Gauge} />
          <SubscriptionItemLink
            href="/dashboard/Subscription"
            text="Subscription"
            Icon={Gauge}
          />
          <CommunicationItemLink
            text="Communication"
            Icon={Gauge}
            isOpen={isCommunicationOpen}
            toggleOpen={() => setCommunicationOpen(!isCommunicationOpen)}
          />
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter />
    </Sidebar>
  );
}

const ItemLink = ({
  text,
  href,
  Icon,
  isActive = false,
}: {
  text: string;
  href: string;
  Icon: any;
  isActive?: boolean;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-16 rounded-none" asChild>
        <Link
          href={href}
          className={`flex items-center gap-x-2 ${
            isActive && "bg-yellow-500/10 text-primary"
          } px-4`}
        >
          <Icon />
          <span>{text}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SubscriptionItemLink = ({
  text,
  href,
  Icon,
}: {
  text: string;
  href: string;
  Icon: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-16 rounded-none" asChild>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-x-2 w-full px-4"
        >
          <Icon />
          <span>{text}</span>
        </button>
      </SidebarMenuButton>

      {/* Dropdown Items */}
      {isOpen && (
        <div className="ml-8">
          <SidebarMenuItem>
            <Link
              href="/dashboard/Subscription/plans"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Subscription Plans
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/Subscription/plansfeatures"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Plans Features
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/Subscription/Trackingpayment"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Tracking Payment
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/dashboard/Subscription/Membershipdetails"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Membership Details
            </Link>
          </SidebarMenuItem>
        </div>
      )}
    </SidebarMenuItem>
  );
};

const CommunicationItemLink = ({
  text,
  Icon,
  isOpen,
  toggleOpen,
}: {
  text: string;
  Icon: any;
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-16 rounded-none" asChild>
        <button
          onClick={toggleOpen}
          className="flex items-center gap-x-2 w-full px-4"
        >
          <Icon />
          <span>{text}</span>
        </button>
      </SidebarMenuButton>

     
          
    </SidebarMenuItem>
  );
};
