// components/dialogs/UpdateAdminDialog.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import RolesList from "@/app/dashboard/management/_components/RolesList";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

type AdminType = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
};

interface UpdateAdminDialogProps {
  admin: AdminType;
  onAdminUpdated: () => void;
}

export default function UpdateAdminDialog({
  admin,
  onAdminUpdated,
}: UpdateAdminDialogProps) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: admin.name,
      email: admin.email,
      role: admin.role,
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const api = await axiosClient();
        await api.put(`/admin/management/admins/${admin.id}`, values);
        toast.success("Admin updated successfully");
        onAdminUpdated(); // Refresh the table
        setOpen(false);
      } catch (err: any) {
        if (err.response?.data?.message) {
          setFieldError("email", err.response.data.message);
        } else {
          setFieldError("email", "Failed to update admin");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.121 2.121 0 013 3L9.636 16.713 5 18l1.287-4.636L16.862 3.487z"
            />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Admin</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-black">
              Admin Name
            </label>
            <Input
              id="name"
              name="name"
              className="rounded-lg w-full py-4 mt-2"
              placeholder="Mohamed Omar"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-black">
              Admin Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              className="rounded-lg w-full py-4 mt-2"
              placeholder="Mo@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="role" className="text-black">
              Admin Role
            </label>
            <RolesList
              name="role"
              onValueChange={(value) => formik.setFieldValue("role", value)}
              onTouched={() => formik.setFieldTouched("role", true)}
            />
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.role}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-black">
              New Password (optional)
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              className="rounded-lg w-full py-4 mt-2"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-primary text-white"
            >
              {formik.isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
