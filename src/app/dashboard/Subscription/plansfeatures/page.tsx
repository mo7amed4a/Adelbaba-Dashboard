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

const features = [
  { id: 1, feature: "Access to standard listings" },
  { id: 2, feature: "Priority customer support" },
  { id: 3, feature: "Access to standard listings" },
  { id: 4, feature: "Priority customer support" },
  { id: 5, feature: "Access to standard listings" },
  { id: 6, feature: "Priority customer support" },
];

export default function PlansFeatures() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SubHeader title="Plans Features">
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ New Admin</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Features</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="plan-name"
                  className="text-gray-600 font-medium mb-1"
                >
                  Plan Name
                </label>
                <input
                  id="plan-name"
                  type="text"
                  placeholder="Standard"
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="flex justify-between space-x-4">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white   w-1/2 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Add Features
                </button>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="border border-yellow-500 text-black w-1/2 py-2 rounded-lg "
                  >
                    Cancel
                  </button>
                </DialogClose>
              </div>
            </form>
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
                <td className="py-4 px-6 text-[#36383a]">{feature.feature}</td>
                <td className="py-4 px-6">
                  <div className="w-[100px] h-[30px] rounded-lg flex items-center justify-between px-2">
                    <button className="text-[#a19f9f] hover:text-[#2b2d42] transition">
                      <FaEdit />
                    </button>
                    <div className="w-px h-5 bg-[#eeeeee]" />
                    <button className="text-[#e13e3e] hover:text-[#c12a2a] transition">
                      <FaTrash />
                    </button>
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
