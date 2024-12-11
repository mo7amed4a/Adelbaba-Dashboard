"use client";
import { Input } from "../ui/input";

export default function SearchInput({
  setSearchText,
  className
}: {
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  className?:string
}) {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search"
        className={`pl-8 w-full border-primary ${className}`}
        onChange={(e) => setSearchText ? setSearchText(e.target.value) : ""}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </div>
  );
}
