"use client";
import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import ReplyTicketDialog from "../_components/ReplyTicketDialog";
import Loading from "@/components/global/Loading";

// Define the type for the ticket details
type ConversationType = {
  id: number;
  from: string;
  comment: string;
  created_at: string;
};

type TicketDetailsType = {
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
  conversation: ConversationType[];
};

export default function TicketDetailsPage() {
  const { id } = useParams(); // جلب الـ ID من الـ URL
  const [refresh, setRefresh] = useState(false);
  const { data, loading, error } = useFetch(`/admin/support/tickets/${id}`, refresh);
  const ticket = data as TicketDetailsType;

  if (loading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!ticket) return <div className="text-center py-10">Ticket not found</div>;

  return (
    <div className="container mx-auto py-6">
      <Link href="/dashboard/support/tickets">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2" /> Back to Tickets
        </Button>
      </Link>
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-gray-">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Ticket #{ticket.ticket_number} - {ticket.subject}
            </CardTitle>
            <ReplyTicketDialog
              ticketId={ticket.id}
              onReplySubmitted={() => setRefresh((prev) => !prev)}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Badge variant={ticket.status as "open" | "closed"}>{ticket.status}</Badge>
            <Badge
              variant={
                ticket.priority === "critical"
                  ? "destructive"
                  : ticket.priority === "high"
                  ? "open"
                  : "outline"
              }
            >
              {ticket.priority}
            </Badge>
            
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Ticket Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ticket Details</h3>
              <p>
                <strong>ID:</strong> {ticket.id}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(ticket.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Description:</strong> {ticket.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">User & Assignment</h3>
              <p>
                <strong>User:</strong> {ticket.user.name} ({ticket.user.email})
              </p>
              <p>
                <strong>Assigned To:</strong> {ticket.assigned_to}
              </p>
            </div>
          </div>

          {/* Conversation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conversation</h3>
            {ticket.conversation.length > 0 ? (
              <div className="space-y-4">
                {ticket.conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg ${
                      msg.from === "support"
                        ? "bg-primary/30 border-l-4 border-primary me-auto md:w-3/4"
                        : "bg-blue-50 border-l-4 border-blue-300 ms-auto md:w-3/4"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">
                        {msg.from === "support" ? "Support" : "Client"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{msg.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No conversation yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}