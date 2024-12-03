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

export function AppSidebar() {
  return (
    <Sidebar>
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
          <ItemLink isActive href="/" text="Dashboard" Icon={Gauge} />
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
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
