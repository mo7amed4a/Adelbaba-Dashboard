"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Plus, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "@/components/table/table";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import UpdateAdminDialog from "@/components/dialogs/UpdateAdminDialog";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

// Define the type for the admin data
type AdminType = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
};

export default function AdminsPage() {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/admin/management/admins", refresh);

  const columnsAdmins: ColumnDef<AdminType>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="font-bold">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("role")}</div>,
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <div>{row.getValue("is_active") ? "Active" : "Inactive"}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <UpdateAdminDialog
            admin={row.original}
            onAdminUpdated={() => setRefresh((prev) => !prev)}
          />
          <Button onClick={async() => {
            const con = confirm("Are you sure you want to delete this admin?")
            if(!con) return
            const id = row.original.id;
            const api = await axiosClient()
            await api.delete(`/admin/management/admins/${id}`)
            setRefresh((prev) => !prev)
            toast.success("Admin deleted successfully")
          }} variant="ghost" size="icon">
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full flex flex-col gap-4 shadow-none border-none">
      <CardContent className="p-2">
        <DataTable
          title="Empoyees"
          columns={columnsAdmins}
          data={data as AdminType[] || []}
          searchKey={["name", "email"]}
          textKey="Name and email"
          loading={loading}
          error={error}
        >
          <Link href={`/dashboard/management/add`}>
            <Button>
              ADD <Plus />
            </Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}