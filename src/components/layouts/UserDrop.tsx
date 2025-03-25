"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';
import LinkApp from '../global/LinkApp';

export default function UserDrop() {
const session = useSession();
const user = session?.data?.user  as {
  name: string;
  email: string;
  profile_image: string;
};
  return user && (
    <div className="flex items-center gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-12 px-1 md:px-2 flex items-center md:gap-2 hover:bg-transparent hover:text-current border-none focus:border-none focus-visible:border-none" variant={"ghost"}>
          <ChevronDown />
          <span>{user?.name}</span>
          <Avatar>
            <AvatarImage src={user?.profile_image} alt="" />
            <AvatarFallback className='text-gray-700'>{user?.name[0] + user?.name[1]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LinkApp href="/account/settings" >
          <DropdownMenuItem>profile</DropdownMenuItem>
        </LinkApp>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  )
}
