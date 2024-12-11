"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../DataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import AlertApp from "@/components/auth/AlertApp";
import { MdDelete } from "react-icons/md";
import AlertTwoBtns from "../AlertTwoBtns";

export type Payment = {
  id: string;
  star: boolean;
  name: string;
  message: string;
  time: Date;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "star",
    header: "Star",
    cell: ({ row }) => (
      <>
        <div className="capitalize">{row.getValue("star")}</div>
        {row.getValue("star") ? (
          <svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.51719 1.31697L11.8966 6.03091L16.4761 6.48459C16.6987 6.50309 16.8902 6.6494 16.9666 6.85931C17.043 7.06923 16.9903 7.30441 16.8316 7.46165L13.0628 11.1971L14.4601 16.273C14.5185 16.4929 14.4425 16.7266 14.2659 16.8701C14.0892 17.0136 13.8449 17.0401 13.6416 16.9379L8.99879 14.6389L4.36237 16.935C4.15908 17.0373 3.91474 17.0107 3.73813 16.8673C3.56152 16.7238 3.48549 16.4901 3.54389 16.2701L4.94121 11.1943L1.1695 7.45881C1.01084 7.30156 0.958138 7.06639 1.03453 6.85647C1.11092 6.64655 1.30244 6.50025 1.52505 6.48175L6.10459 6.02806L8.4804 1.31697C8.58002 1.1224 8.7802 1 8.99879 1C9.21739 1 9.41757 1.1224 9.51719 1.31697Z"
              fill="#FFE776"
              stroke="#FFE776"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.51719 1.31697L11.8966 6.03091L16.4761 6.48459C16.6987 6.50309 16.8902 6.6494 16.9666 6.85931C17.043 7.06923 16.9903 7.30441 16.8316 7.46165L13.0628 11.1971L14.4601 16.273C14.5185 16.4929 14.4425 16.7266 14.2659 16.8701C14.0892 17.0136 13.8449 17.0401 13.6416 16.9379L8.99879 14.6389L4.36237 16.935C4.15908 17.0373 3.91474 17.0107 3.73813 16.8673C3.56152 16.7238 3.48549 16.4901 3.54389 16.2701L4.94121 11.1943L1.1695 7.45881C1.01084 7.30156 0.958138 7.06639 1.03453 6.85647C1.11092 6.64655 1.30244 6.50025 1.52505 6.48175L6.10459 6.02806L8.4804 1.31697C8.58002 1.1224 8.7802 1 8.99879 1C9.21739 1 9.41757 1.1224 9.51719 1.31697Z"
              stroke="#FFE776"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <>
      <div className="lowercase line-clamp-1">{row.getValue("message")}</div>
      </>
    ),
  },
  {
    accessorKey: "time",
    header: () => <div className="text-right">Time</div>,
    cell: ({ row }) => {
      const amount = row.getValue("time") as Date;
      // Format the amount as a dollar amount
      const formatted = new Intl.DateTimeFormat("en-US").format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy {payment.id}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
    {
      id: "728ed52f",
      star: false,
      name: "Mohamed Abdelrahman",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date(),
    },
    {
      id: "728ed52f",
      star: true,
      name: "Mohamed Ali",
      message:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis animi reprehenderit deserunt quis. Quia ea harum quibusdam laudantium totam similique facilis odit. Autem nam placeat tempora magnam modi illo suscipit.",
      time: new Date("2022-10-10"),
    },
  ];
}

export default function EmailTable() {
  const data = getData();
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const deleteHandle = () => {};

  return (
    <>
      <DataTable
      // @ts-ignore
        columns={columns}
        data={data}
        searchKey="name"
        >
          <Button size="icon" variant={"ghost"} onClick={() => {
            setOpenDelete(true)
          }}>
            <MdDelete className="text-red-500 !size-7" />
          </Button>
        </DataTable>
      <AlertTwoBtns
        isOpen={openDelete}
        setIsOpen={setOpenDelete}
        msg=""
        text="Are you sure you want to Delete this Email?"
        btnText="No"
        btnText2="Yes"
        action={() => {alert("done")}}
      />
    </>
  );
}
