"use client";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import SubHeader from "@/components/layouts/SubHeader";
import { useFetch } from "@/hooks/use-fetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Loading from "@/components/global/Loading";

// Validation schema for add/edit feature
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Feature name must be at least 3 characters")
    .required("Feature name is required"),
});

type FeatureType = {
  id: number;
  name: string;
};

export default function PlansFeatures() {
  const [refresh, setRefresh] = React.useState(false);
  const { data, loading, error } = useFetch("/admin/subscriptions/features", refresh);
  const features = data as FeatureType[] || [];

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <SubHeader title="Plans Features">
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ New Feature</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Feature</DialogTitle>
            </DialogHeader>
            <AddFeatureDialog onFeatureAdded={() => setRefresh((prev) => !prev)} />
          </DialogContent>
        </Dialog>
      </SubHeader>
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-6 text-black font-semibold">Feature</th>
              <th className="py-4 px-6 text-black font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 text-[#36383a]">{feature.name}</td>
                <td className="py-4 px-6">
                  <div className="w-[100px] h-[30px] rounded-lg flex items-center justify-between px-2">
                    <EditFeatureDialog
                      feature={feature}
                      onFeatureUpdated={() => setRefresh((prev) => !prev)}
                    />
                    <div className="w-px h-5 bg-[#eeeeee]" />
                    <DeleteFeatureDialog
                      featureId={feature.id}
                      onFeatureDeleted={() => setRefresh((prev) => !prev)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Add Feature Dialog
function AddFeatureDialog({ onFeatureAdded }: { onFeatureAdded: () => void }) {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const api = await axiosClient();
        await api.post("/admin/subscriptions/features", values);
        toast.success("Feature added successfully");
        onFeatureAdded();
        resetForm();
        setOpen(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to add feature");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-600 font-medium mb-1">
          Feature Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Feature 16"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>
      <div className="flex justify-between space-x-4">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-yellow-500 text-white w-1/2 py-2 rounded-lg hover:bg-yellow-600"
        >
          {formik.isSubmitting ? "Adding..." : "Add Feature"}
        </Button>
        <DialogClose asChild>
          <Button type="button" className="border border-yellow-500 text-black w-1/2 py-2 rounded-lg">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}

// Edit Feature Dialog
function EditFeatureDialog({ feature, onFeatureUpdated }: { feature: FeatureType; onFeatureUpdated: () => void }) {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: feature.name,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const api = await axiosClient();
        await api.patch(`/admin/subscriptions/features/${feature.id}`, values);
        toast.success("Feature updated successfully");
        onFeatureUpdated();
        setOpen(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to update feature");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[#a19f9f] hover:text-[#2b2d42] transition">
          <FaEdit />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-600 font-medium mb-1">
              Feature Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Feature 16"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>
          <div className="flex justify-between space-x-4">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-yellow-500 text-white w-1/2 py-2 rounded-lg hover:bg-yellow-600"
            >
              {formik.isSubmitting ? "Updating..." : "Update Feature"}
            </Button>
            <DialogClose asChild>
              <Button type="button" className="border border-yellow-500 text-black w-1/2 py-2 rounded-lg">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Delete Feature Dialog
function DeleteFeatureDialog({ featureId, onFeatureDeleted }: { featureId: number; onFeatureDeleted: () => void }) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      const api = await axiosClient();
      await api.delete(`/admin/subscriptions/features/${featureId}`);
      toast.success("Feature deleted successfully");
      onFeatureDeleted();
      setOpen(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete feature");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-[#e13e3e] hover:text-[#c12a2a] transition">
          <FaTrash />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Feature</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">Are you sure you want to delete this feature?</p>
          <div className="flex justify-between space-x-4">
            <Button
              onClick={handleDelete}
              className="bg-red-500 text-white w-1/2 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button type="button" className="border border-red-500 text-black w-1/2 py-2 rounded-lg">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}