"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SubHeader from "@/components/layouts/SubHeader";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFetch } from "@/hooks/use-fetch";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axiosClient from "@/lib/axiosClient";
import FeaturesSelect from "./_components/FeaturesSelect";
import Loading from "@/components/global/Loading";

// Validation schema for add/edit subscription plan
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Plan name must be at least 3 characters")
    .required("Plan name is required"),
  price: Yup.number()
    .min(0, "Price must be a positive number")
    .required("Price is required"),
  payment_rate: Yup.string()
    .oneOf(["monthly", "yearly", "weekly"], "Invalid payment rate")
    .required("Payment rate is required"),
  support_level: Yup.string()
    .oneOf(["basic", "standard", "premium"], "Invalid support level")
    .required("Support level is required"),
  features: Yup.array()
    .of(Yup.number()) // هنا بنتوقع IDs كـ numbers من الـ FeaturesSelect
    .min(1, "At least one feature is required")
    .required("Features are required"),
});

type SubscriptionPlan = {
  id: number;
  name: string;
  payment_rate: string;
  price: string;
  support_level: string;
  features: string[]; // الداتا من الـ API بترجع strings
};

type FeatureType = {
  id: number;
  name: string;
};

export default function SubscriptionPlansPage() {
  const [refresh, setRefresh] = React.useState(false);
  const { data: plansData, loading: plansLoading, error: plansError } = useFetch("/admin/subscriptions/plans", refresh);
  const { data: featuresData, loading: featuresLoading } = useFetch("/admin/subscriptions/features");
  
  const subscriptionPlans = plansData as SubscriptionPlan[] || [];
  const allFeatures = featuresData as FeatureType[] || [];

  const deletePlan = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    const api = await axiosClient();
    api.delete(`/admin/subscriptions/plans/${id}`).then(() => {
      toast.success("Subscription plan deleted successfully");
      setRefresh(!refresh);
    }).catch((err) => {
      toast.error(err.response?.data?.message || "Failed to delete subscription plan");
    });
  };

  if (plansLoading || featuresLoading) return <Loading />;
  if (plansError) return <div>Error: {plansError}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row">
        <SubHeader title="Subscription Plans" />
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
          <Dialog>
            <DialogTrigger>
              <Button>+ New Plan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Subscription Plan</DialogTitle>
              </DialogHeader>
              <AddPlanDialog onPlanAdded={() => setRefresh((prev) => !prev)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.id}
            className="border rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <CardHeader className="text-center py-4 rounded-t-xl">
              <CardTitle className="font-bold text-gray-800">{plan.name}</CardTitle>
              <p className="text-sm text-gray-600">{plan.payment_rate} Charged</p>
              <p className="text-primary my-2 text-lg font-semibold">${plan.price}</p>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <ul className="space-y-2">
                {allFeatures.map((feature) => (
                  <li
                    key={feature.id}
                    className={`flex items-center gap-2 ${plan.features.includes(feature.name) ? "text-black" : "text-gray-400"}`}
                  >
                    {plan.features.includes(feature.name) ? (
                      <i className="fa-solid fa-check text-green-500"></i>
                    ) : (
                      <i className="fa-solid fa-xmark text-red-500"></i>
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="text-center flex justify-center gap-3 items-center py-4 rounded-b-xl bg-gray-50">
              <EditPlanDialog plan={plan} onPlanUpdated={() => setRefresh((prev) => !prev)} />
              <Button variant="destructive" onClick={() => deletePlan(plan.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Add Plan Dialog Component
function AddPlanDialog({ onPlanAdded }: { onPlanAdded: () => void }) {
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      payment_rate: "",
      support_level: "",
      features: [],
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const api = await axiosClient();
        await api.post("/admin/subscriptions/plans", {
          name: values.name,
          payment_rate: values.payment_rate,
          price: parseFloat(values.price),
          support_level: values.support_level,
          features: values.features, // هنا بنبعت الـ IDs
        });
        toast.success("Subscription plan added successfully");
        onPlanAdded();
        resetForm();
        setOpen(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to add subscription plan");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="name" className="text-gray-600 font-medium mb-1">
            Plan Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Basic Plan"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          )}
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="price" className="text-gray-600 font-medium mb-1">
            Price
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="400"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="payment_rate" className="text-gray-600 font-medium mb-1">
            Payment Rate
          </label>
          <select
            id="payment_rate"
            name="payment_rate"
            value={formik.values.payment_rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
          >
            <option value="">Select payment rate</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
          {formik.touched.payment_rate && formik.errors.payment_rate && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.payment_rate}</div>
          )}
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="support_level" className="text-gray-600 font-medium mb-1">
            Support Level
          </label>
          <select
            id="support_level"
            name="support_level"
            value={formik.values.support_level}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
          >
            <option value="">Select support level</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          {formik.touched.support_level && formik.errors.support_level && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.support_level}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="features" className="text-gray-600 font-medium mb-1">
          Features
        </label>
        <FeaturesSelect
          name="features"
          value={formik.values.features}
          onChange={(value) => formik.setFieldValue("features", value)}
          onBlur={() => formik.setFieldTouched("features", true)}
        />
        {formik.touched.features && formik.errors.features && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.features}</div>
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
  );
}

// Edit Plan Dialog Component
function EditPlanDialog({ plan, onPlanUpdated }: { plan: SubscriptionPlan; onPlanUpdated: () => void }) {
  const [open, setOpen] = React.useState(false);
  const { data: featuresData } = useFetch("/admin/subscriptions/features");
  const allFeatures = featuresData as FeatureType[] || [];

  // نحدد الـ feature IDs بناءً على الأسماء اللي جت من الـ API
  const initialFeatureIds = allFeatures
    .filter((feature) => plan.features.includes(feature.name))
    .map((feature) => feature.id);

  const formik = useFormik({
    initialValues: {
      name: plan.name,
      price: parseFloat(plan.price),
      payment_rate: plan.payment_rate.toLowerCase(),
      support_level: plan.support_level.toLowerCase(),
      features: initialFeatureIds, // نستخدم الـ IDs هنا
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const api = await axiosClient();
        await api.put(`/admin/subscriptions/plans/${plan.id}`, {
          name: values.name,
          payment_rate: values.payment_rate,
          price: values.price,
          support_level: values.support_level,
          features: values.features, // بنبعت الـ IDs
        });
        toast.success("Subscription plan updated successfully");
        onPlanUpdated();
        setOpen(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to update subscription plan");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline">Edit Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="name" className="text-gray-600 font-medium mb-1">
                Plan Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Basic Plan"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="price" className="text-gray-600 font-medium mb-1">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="400"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
              )}
            </div>
          </div>
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="payment_rate" className="text-gray-600 font-medium mb-1">
                Payment Rate
              </label>
              <select
                id="payment_rate"
                name="payment_rate"
                value={formik.values.payment_rate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
              >
                <option value="">Select payment rate</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="weekly">Weekly</option>
              </select>
              {formik.touched.payment_rate && formik.errors.payment_rate && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.payment_rate}</div>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="support_level" className="text-gray-600 font-medium mb-1">
                Support Level
              </label>
              <select
                id="support_level"
                name="support_level"
                value={formik.values.support_level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary"
              >
                <option value="">Select support level</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
              {formik.touched.support_level && formik.errors.support_level && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.support_level}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="features" className="text-gray-600 font-medium mb-1">
              Features
            </label>
            <FeaturesSelect
              name="features"
              value={formik.values.features}
              onChange={(value) => formik.setFieldValue("features", value)}
              onBlur={() => formik.setFieldTouched("features", true)}
            />
            {formik.touched.features && formik.errors.features && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.features}</div>
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