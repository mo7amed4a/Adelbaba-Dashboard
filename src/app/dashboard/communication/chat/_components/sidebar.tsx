"use client";
import SearchInput from "@/components/layouts/SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const chats: any[] = [
  {
    id: "1",
    name: "Digital Market",
    lastMessage: "You're very welco...",
    avatar: "/placeholder.svg",
    timestamp: "15 Min",
  },
  {
    id: "2",
    name: "Fashion store",
    lastMessage: "white shirt is availa...",
    avatar: "/placeholder.svg",
    timestamp: "12:36 PM",
  },
  {
    id: "3",
    name: "Hardware house",
    lastMessage: "Your order is compl...",
    avatar: "/placeholder.svg",
    timestamp: "12:36 PM",
  },
];

export default function Sidebar() {
  const [searchText, setSearchText] = useState<string>("");
  const searchParams = useSearchParams();
  const isOpenSidebar = searchParams.get("chatmenu") === "open" ? true : false;
  const router = useRouter();
  const pathname = usePathname();

  const onPageChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchParams.get("chatmenu") === "open") {
      params.delete("chatmenu");
      const url = `${pathname}?${params.toString()}`;
      router.push(url);
    } else {
      params.set("chatmenu", "open");
      const url = `${pathname}?${params.toString()}`;
      router.push(url);
    }
  };

  // Filter chats based on search input

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchText?.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchText?.toLowerCase())
  );

  return (
    <div>
      {isOpenSidebar && (
        <div
          onClick={() => onPageChange()}
          className="fixed bg-black/5 size-full"
        ></div>
      )}
      <div
        className={`fixed md:relative top-0 start-0 h-screen md:h-[80vh] bg-white p-4 transition-all duration-300 -translate-x-full md:-translate-x-0 opacity-0 md:opacity-100 -z-10  md:z-10 rounded-2xl ${
          isOpenSidebar ? "translate-x-0 !z-10 opacity-100" : ""
        }`}
      >
        <div className="w-64">
          <div className="p-4">
            <SearchInput setSearchText={setSearchText} />
          </div>
          <ScrollArea>
            {filteredChats.map((chat) => (
              <Link href={`/dashboard/communication/chat/${chat.id}`}
                key={chat.id}
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-accent transition-colors"
              >
                <Avatar>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold">{chat.name}</h2>
                    <span className="text-xs text-muted-foreground">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </Link>
            ))}

            {/* No Results Found */}
            {filteredChats.length === 0 && (
              <div className="p-4 text-sm text-center text-muted-foreground">
                No chats found.
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
