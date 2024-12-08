"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";

const subscriptions = [
  {
    id: 1,
    membershipNo: 25182,
    vendorName: "Mohamed Ahmed",
    subscriptionPlan: "Basic Plan",
    dateIssued: "31 July 2024",
    totalAmount: "$300",
    status: "Paid",
  },
  {
    id: 2,
    membershipNo: 28197,
    vendorName: "Ahmed Yasser",
    subscriptionPlan: "Premium Plan",
    dateIssued: "31 July 2024",
    totalAmount: "$300",
    status: "Suspended",
  },
  {
    id: 3,
    membershipNo: 17922,
    vendorName: "Omar Ehab",
    subscriptionPlan: "Pro Plan",
    dateIssued: "31 July 2024",
    totalAmount: "$300",
    status: "Pending",
  },
];

export default function TrackingPayments() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8 flex-col sm:flex-row">
          <h1 className="text-2xl font-semibold">Tracking Payments</h1>

          <div className="relative w-full sm:w-[140px] lg:w-64">
            <Input
              placeholder="Search vendor name"
              className="pl-10 border-[#eeeeee] bg-white border-2 rounded-full focus:outline-none py-3"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#888888]" />
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200 text-center">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-4 font-bold text-gray-700">Membership No.</th>
                <th className="py-2 px-4 font-bold text-gray-700">Vendor Name</th>
                <th className="py-2 px-4 font-bold text-gray-700">Subscription Plan</th>
                <th className="py-2 px-4 font-bold text-gray-700">Date Issued</th>
                <th className="py-2 px-4 font-bold text-gray-700">Total Amount</th>
                <th className="py-2 px-4 font-bold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">{subscription.membershipNo}</td>
                  <td className="py-4 px-4">{subscription.vendorName}</td>
                  <td className="py-4 px-4">{subscription.subscriptionPlan}</td>
                  <td className="py-4 px-4">{subscription.dateIssued}</td>
                  <td className="py-4 px-4">{subscription.totalAmount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                        subscription.status === "Paid"
                          ? "bg-green-400"
                          : subscription.status === "Suspended"
                          ? "bg-red-400"
                          : "bg-yellow-300"
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center py-4 px-6 bg-gray-50">
            <span className="text-gray-600">Showing 10 from 46 data</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className="px-3 py-1 border rounded-full hover:bg-orange-400 hover:text-white transition"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
