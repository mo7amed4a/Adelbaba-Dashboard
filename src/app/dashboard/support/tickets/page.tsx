"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, Plus, Trash, MessageSquare, Edit } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "@/components/table/table";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define the type for the ticket data
type TicketType = {
  id: number;
  ticket_number: string;
  subject: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  assigned_to: string;
  status: string;
  priority: string;
  description: string;
};

// Define types for options from API
type OptionType = {
  id: number;
  name: string;
};

type TicketOptions = {
  priorities: OptionType[];
  categories: OptionType[];
  statuses: OptionType[];
};

// Validation schema for updating ticket
const updateValidationSchema = Yup.object({
  priority_id: Yup.number().required("Priority is required"),
  category_id: Yup.number().required("Category is required"),
  status_id: Yup.number().required("Status is required"),
  assigned_to: Yup.number().required("Assigned admin is required"),
});


export default function SupportTicketsPage() {
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch("/admin/support/tickets", refresh);
  const tickets = data as TicketType[] || [];

  const columnsTickets: ColumnDef<TicketType>[] = [
    {
      accessorKey: "ticket_number",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket Number <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="font-bold">{row.getValue("ticket_number")}</div>,
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("subject")}</div>,
    },
    {
      accessorKey: "user.name",
      header: "User",
      cell: ({ row }) => <div className="line-clamp-1">{row.original.user.name}</div>,
    },
    {
      accessorKey: "assigned_to",
      header: "Assigned To",
      cell: ({ row }) => <div className="line-clamp-1">{row.getValue("assigned_to")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => <div>{row.getValue("priority")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Link href={`/dashboard/support/tickets/${row.original.id}`}>
            <Button variant="ghost" size="icon">
              <Eye />
            </Button>
          </Link>
          <UpdateTicketDialog
            ticket={row.original}
            onTicketUpdated={() => setRefresh((prev) => !prev)}
          />
          <Button
            onClick={async () => {
              const con = confirm("Are you sure you want to delete this ticket?");
              if (!con) return;
              const id = row.original.id;
              const api = await axiosClient();
              await api.delete(`/admin/support/tickets/${id}`);
              setRefresh((prev) => !prev);
              toast.success("Ticket deleted successfully");
            }}
            variant="ghost"
            size="icon"
          >
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
          title="Support Tickets"
          columns={columnsTickets}
          data={tickets}
          searchKey={["ticket_number", "subject"]}
          textKey="Ticket number and subject"
          loading={loading}
          error={error}
        >
          <Link href={`/dashboard/support/tickets/add`}>
            <Button>
              ADD <Plus />
            </Button>
          </Link>
        </DataTable>
      </CardContent>
    </Card>
  );
}

// Update Ticket Dialog Component
function UpdateTicketDialog({
  ticket,
  onTicketUpdated,
}: {
  ticket: TicketType;
  onTicketUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { data: optionsData, loading: optionsLoading } = useFetch("/admin/support/tickets/options");
  const options = optionsData as TicketOptions || { priorities: [], categories: [], statuses: [] };

  const formik = useFormik({
    initialValues: {
      priority_id: options.priorities.find((p) => p.name === ticket.priority)?.id || 1,
      category_id: options.categories.find((c) => c.name === ticket.subject)?.id || 1,
      status_id: options.statuses.find((s) => s.name === ticket.status)?.id || 1,
      assigned_to: 1155, // افتراضي، لو عندك API للـ admins هنجيبها من هناك
    },
    validationSchema: updateValidationSchema,
    enableReinitialize: true, // عشان يتحدث الـ initialValues لما الـ options تتغير
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const api = await axiosClient();
        await api.put(`/admin/support/tickets/${ticket.id}`, values);
        toast.success("Ticket updated successfully");
        onTicketUpdated();
        setOpen(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to update ticket");
      } finally {
        setSubmitting(false);
      }
    },
  });

//   if (optionsLoading) return "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Ticket</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="priority_id" className="text-gray-600 font-medium mb-1">
              Priority
            </label>
            <select
              id="priority_id"
              name="priority_id"
              value={formik.values.priority_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-lg p-2"
            >
              {options.priorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
            {formik.touched.priority_id && formik.errors.priority_id && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.priority_id}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="category_id" className="text-gray-600 font-medium mb-1">
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formik.values.category_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-lg p-2"
            >
              {options.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category_id && formik.errors.category_id && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.category_id}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="status_id" className="text-gray-600 font-medium mb-1">
              Status
            </label>
            <select
              id="status_id"
              name="status_id"
              value={formik.values.status_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-lg p-2"
            >
              {options.statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
            {formik.touched.status_id && formik.errors.status_id && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.status_id}</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="assigned_to" className="text-gray-600 font-medium mb-1">
              Assigned To (Admin ID)
            </label>
            <input
              id="assigned_to"
              name="assigned_to"
              type="number"
              value={formik.values.assigned_to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-lg p-2"
            />
            {formik.touched.assigned_to && formik.errors.assigned_to && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.assigned_to}</div>
            )}
          </div>
          <div className="flex justify-around space-x-4">
            <DialogClose asChild>
              <Button type="button" className="bg-gray-300 text-black w-1/3 py-2 rounded-lg">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-primary text-white w-1/3 py-2 rounded-lg hover:bg-primary"
            >
              {formik.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

