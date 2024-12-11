"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const GroupLinks = ({
  text,
  Icon,
  links,
}: {
  text: string;
  Icon: any;
  links: { text: string; href: string; Icon?: any }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <SidebarMenuItem>
      {/* Main Button */}
      <SidebarMenuButton className="h-16 rounded-none text-gray-600" asChild>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-x-2 w-full px-4"
        >
          <Icon />
          <span>{text}</span>
        </button>
      </SidebarMenuButton>

      {/* Dropdown Links */}
      {isOpen && (
        <div className="ml-8">
          {links.map((link, index) => (
            <SidebarMenuItem key={index}>
                <ItemLink
                text={link.text}
                href={link.href}
                circle
                />
              
            </SidebarMenuItem>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );
};


export const ItemLink = ({
    text,
    href,
    Icon,
    circle= false,
    group = false,
  }: {
    text: string;
    href: string;
    Icon?: any;
    circle?: boolean
    group?: boolean;
  }) => {
    const pathname = usePathname()
    const isActiveBtn:boolean = pathname.endsWith(href)
    return (
      <SidebarMenuItem>
        <SidebarMenuButton className={`rounded-none ${circle ? "h-10" : "h-16 "}`} asChild>
          <Link
            href={href}
            className={`flex items-center gap-x-2 hover:text-gray-500 ${
              isActiveBtn ? "bg-primary/10 text-primary" : circle ? "text-gray-400" : "text-gray-700"
            } px-4`}
          >
            {circle && <span className="bg-current size-2 rounded-full"></span>}
            {Icon && <Icon />}
            <span>{text}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };
  

export default GroupLinks;