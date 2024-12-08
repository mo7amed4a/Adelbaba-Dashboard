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
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const subscriptionPlans = [
  {
    title: "Basic Plan",
    price: "$20",
    charge: "Monthly Charged",
    features: [
      { feature: "Access to standard listings", available: true },
      { feature: "Access to all product listings", available: true },
      { feature: "Basic analytics reports", available: true },
      { feature: "Priority customer support", available: false },
      { feature: "Advanced analytics report", available: false },
      { feature: "Flexible payment options", available: false },
      { feature: "Featured product listing", available: false },
      { feature: "24/7 dedicated support", available: false },
      { feature: "Customized analytics report", available: false },
    ],
  },
  {
    title: "Pro Plan",
    price: "$50",
    charge: "Monthly Charged",
    features: [
      { feature: "Access to standard listings", available: true },
      { feature: "Access to all product listings", available: true },
      { feature: "Basic analytics reports", available: true },
      { feature: "Priority customer support", available: true },
      { feature: "Advanced analytics report", available: false },
      { feature: "Flexible payment options", available: true },
      { feature: "Featured product listing", available: false },
      { feature: "24/7 dedicated support", available: false },
      { feature: "Customized analytics report", available: false },
    ],
  },
  {
    title: "Premium Plan",
    price: "$100",
    charge: "Monthly Charged",
    features: [
      { feature: "Access to standard listings", available: true },
      { feature: "Access to all product listings", available: true },
      { feature: "Basic analytics reports", available: true },
      { feature: "Priority customer support", available: true },
      { feature: "Advanced analytics report", available: true },
      { feature: "Flexible payment options", available: true },
      { feature: "Featured product listing", available: true },
      { feature: "24/7 dedicated support", available: true },
      { feature: "Customized analytics report", available: true },
    ],
  },
];

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row">
        <SubHeader title="Subscription Plans" />

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
          <div className="relative w-full sm:w-[140px] lg:w-64">
            <Input
              placeholder="Search product name"
              className="pl-10 border-[#eeeeee] bg-white border-2 rounded-full focus:outline-none py-3"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#888888]" />
          </div>
          {/* Dialog Component */}
          <Dialog>
      <DialogTrigger>
        <button className="w-full sm:w-[136px] h-[40px] bg-[#f3b852] rounded-2xl text-white font-bold flex justify-center items-center">
          + New Admin
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
        <div className="flex justify-between space-x-4">

  <div className="flex flex-col w-1/2">
    <label htmlFor="plan-name" className="text-gray-600 font-medium mb-1">
      Plan Name
    </label>
    <input
      id="plan-name"
      type="text"
      placeholder="Standard"
      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
    />
  </div>

  
  <div className="flex flex-col w-1/2">
    <label htmlFor="payment-rate" className="text-gray-600 font-medium mb-1">
      Payment Rate
    </label>
    <select
      id="payment-rate"
      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
    >
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </div>
</div>


        
          <div className="flex flex-col">
            <label htmlFor="features" className="text-gray-600 font-medium mb-1">
              Features
            </label>
            <textarea
              id="features"
              placeholder="Priority customer support, Basic analytics reports"
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>

          <div className="flex justify-between space-x-4">

<div className="flex flex-col w-1/2">
  <label htmlFor="plan-name" className="text-gray-600 font-medium mb-1">
    Plan Name
  </label>
  <input
    id="plan-name"
    type="text"
    placeholder="Standard"
    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
  />
</div>


<div className="flex flex-col w-1/2">
  <label htmlFor="payment-rate" className="text-gray-600 font-medium mb-1">
    Payment Rate
  </label>
  <select
    id="payment-rate"
    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
  >
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
  </select>
</div>
</div>

        
     
<div className="flex justify-around space-x-4">
<DialogClose className="bg-gray-300 text-black w-1/3  rounded-lg ">
                        <button
                          type="button"
                          className="bg-gray-300 text-black w-1/3 py-2 rounded-lg "
                        >
                          Cancel
                        </button>
                      </DialogClose>
  <button
    type="submit"
    className="bg-yellow-500 text-white w-1/3 py-2 rounded-lg hover:bg-yellow-600"
  >
    Save
  </button>
</div>

        </form>
      </DialogContent>
    </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan, index) => (
          <Card
            key={index}
            className="w-80 mx-auto border rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <CardHeader className="text-center py-4 rounded-t-xl ">
              <CardTitle className="font-bold text-gray-800">
                {plan.title}
              </CardTitle>
              <p className="text-sm text-gray-600">{plan.charge}</p>
              <p className="text-yellow-500 my-2 text-lg font-semibold">
                {plan.price}
              </p>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 ${
                      feature.available ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {feature.available ? (
                      <i className="fa-solid fa-check text-green-500"></i>
                    ) : (
                      <i className="fa-solid fa-xmark text-red-500"></i>
                    )}{" "}
                    {feature.feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="text-center flex justify-center items-center py-4 rounded-b-xl bg-gray-50">

            <Dialog>
      <DialogTrigger>
      <button className="px-5 py-2 text-black border border-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition duration-300">
                Edit Plan
              </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
        <div className="flex justify-between space-x-4">

  <div className="flex flex-col w-1/2">
    <label htmlFor="plan-name" className="text-gray-600 font-medium mb-1">
      Plan Name
    </label>
    <input
      id="plan-name"
      type="text"
      placeholder="Standard"
      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
    />
  </div>

  
  <div className="flex flex-col w-1/2">
    <label htmlFor="payment-rate" className="text-gray-600 font-medium mb-1">
      Payment Rate
    </label>
    <select
      id="payment-rate"
      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
    >
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </div>
</div>


        
          <div className="flex flex-col">
            <label htmlFor="features" className="text-gray-600 font-medium mb-1">
              Features
            </label>
            <textarea
              id="features"
              placeholder="Priority customer support, Basic analytics reports"
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>

          <div className="flex justify-between space-x-4">

<div className="flex flex-col w-1/2">
  <label htmlFor="plan-name" className="text-gray-600 font-medium mb-1">
    Plan Name
  </label>
  <input
    id="plan-name"
    type="text"
    placeholder="Standard"
    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
  />
</div>


<div className="flex flex-col w-1/2">
  <label htmlFor="payment-rate" className="text-gray-600 font-medium mb-1">
    Payment Rate
  </label>
  <select
    id="payment-rate"
    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
  >
    <option value="monthly">Monthly</option>
    <option value="yearly">Yearly</option>
  </select>
</div>
</div>

        
     
<div className="flex justify-around space-x-4">
<DialogClose className="bg-gray-300 text-black w-1/3  rounded-lg ">
                        <button
                          type="button"
                          className="bg-gray-300 text-black w-1/3 py-2 rounded-lg "
                        >
                          Cancel
                        </button>
                      </DialogClose>
  <button
    type="submit"
    className="bg-yellow-500 text-white w-1/3 py-2 rounded-lg hover:bg-yellow-600"
  >
    Save
  </button>
</div>

        </form>
      </DialogContent>
    </Dialog>
         
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
