"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubHeader from "@/components/layouts/SubHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import RolesList from "../../_components/RolesList";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    // )
    .required("Password is required"),
  role: Yup.string()
    .required("Role is required"),
});

export default function AddAdminPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const api = await axiosClient();
        await api.post("/admin/management/admins", values);
        toast.success("Admin added successfully");
      } catch (err: any) {
        if (err.response?.data?.message) {
          setFieldError("email", err.response.data.message);
        } else {
          setFieldError("email", "Failed to add admin");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <SubHeader title="Add New Admin" />
      <div>
        <div className="bg-white p-4 rounded-lg w-full mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-5">
              <div>
                <label htmlFor="name" className="text-black">Admin Name</label>
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
                  <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="role" className="text-black">Admin Role</label>
                <RolesList
                  name="role"
                  onValueChange={(value) => formik.setFieldValue("role", value)}
                  onTouched={() => formik.setFieldTouched("role", true)}
                />
                {formik.touched.role && formik.errors.role && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-black">Admin Email</label>
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
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="text-black">Admin Password</label>
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
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-black font-semibold mb-4">Admin Responsibilities</h3>
              <div className="p-4 rounded-xl border border-gray-200 text-[#a19f9f]">
                <ul className="list-disc list-inside">
                  <li>Can manage users and employees.</li>
                  <li>Can configure system settings.</li>
                  <li>Can manage and monitor reports and activity logs.</li>
                  <li>Can make changes to general system configurations, but security settings require Super Admin approval.</li>
                  <li>Has access to view and manage customer issues, technical support, and system troubleshooting.</li>
                  <li>Can communicate with employees and respond to escalated issues.</li>
                  <li>Can manage and monitor reports and activity logs.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="outline"
                className="bg-primary text-white py-4 px-12 rounded-lg"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}