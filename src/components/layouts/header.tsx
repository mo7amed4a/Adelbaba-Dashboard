import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchInput from "./SearchInput";
import UserDrop from "./UserDrop";

export default function Header() {
  const search = () => {
    console.log('')
  }
  return (
    <header className="w-full px-4 py-3 flex items-center justify-between gap-4 bg-white border-b">
      <SidebarTrigger />
      <div className="flex-1 flex max-w-xl">
        <SearchInput />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute bottom-3 end-2 h-2 w-2 bg-red-500 rounded-full" />
        </Button>

        <UserDrop />
      
      </div>
    </header>
  );
}
