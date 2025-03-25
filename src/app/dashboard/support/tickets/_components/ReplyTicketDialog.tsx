import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import axiosClient from "@/lib/axiosClient";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

// Validation schema for replying to ticket
const replyValidationSchema = Yup.object({
    comment: Yup.string()
      .min(10, "Comment must be at least 10 characters")
      .required("Comment is required"),
  });

// Reply Ticket Dialog Component
export default function ReplyTicketDialog({
    ticketId,
    onReplySubmitted,
  }: {
    ticketId: number;
    onReplySubmitted: () => void;
  }) {
    const [open, setOpen] = useState(false);
  
    const formik = useFormik({
      initialValues: {
        comment: "",
      },
      validationSchema: replyValidationSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        try {
          const api = await axiosClient();
          await api.post(`/admin/support/tickets/${ticketId}`, values);
          toast.success("Reply submitted successfully");
          onReplySubmitted();
          resetForm();
          setOpen(false);
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Failed to submit reply");
        } finally {
          setSubmitting(false);
        }
      },
    });
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon">
            <MessageSquare />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Ticket</DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="comment" className="text-gray-600 font-medium mb-1">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-lg p-2 h-32"
                placeholder="Enter your reply here..."
              />
              {formik.touched.comment && formik.errors.comment && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.comment}</div>
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
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }