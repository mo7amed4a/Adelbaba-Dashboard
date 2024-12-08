"use client";

import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'next/navigation'; 
import { FaSearch } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from 'next/link';


const products = [
  {
    id: 1,
    BranchName: 'Cairo Branch', 
    Manager: 'Mohamed Ahmed',
    Location: 'Nasr City, Cairo',
    subCategory: 'Laptops',
    price: 690.00,
    quantity: 63,
    availableColors: ['red', 'blue', 'green'],
  },
  {
    id: 2,
    BranchName: 'Cairo Branch', 
    Manager: 'Mohamed Ahmed',
    Location: 'Nasr City, Cairo',
    subCategory: 'Laptops',
    price: 690.00,
    quantity: 63,
    availableColors: ['red', 'blue', 'green'],
  },
  {
    id: 3,
    BranchName: 'Cairo Branch', 
    Manager: 'Mohamed Ahmed',
    Location: 'Nasr City, Cairo',
    subCategory: 'Laptops',
    price: 690.00,
    quantity: 63,
    availableColors: ['red', 'blue', 'green'],
  },
  {
    id: 5,
    BranchName: 'Cairo Branch', 
    Manager: 'Mohamed Ahmed',
    Location: 'Nasr City, Cairo',
    subCategory: 'Laptops',
    price: 690.00,
    quantity: 63,
    availableColors: ['red', 'blue', 'green'],
  },
  {
    id: 1,
    BranchName: 'Cairo Branch', 
    Manager: 'Mohamed Ahmed',
    Location: 'Nasr City, Cairo',
    subCategory: 'Laptops',
    price: 690.00,
    quantity: 63,
    availableColors: ['red', 'blue', 'green'],
  },
  // بقية المنتجات
];

export default function Branches() {
  const router = useRouter();

  const handleEyeClick = (id:number) => {
 router.push(`/dashboard/Subscription/Membershipdetails/${id}`);
  };

  return (
    <div className=" min-h-screen mt-16">
      <div className="container mx-auto">
      
        <div className="flex justify-between items-center mb-8 flex-col sm:flex-row">
  <h1 className="text-2xl font-semibold">Branches</h1>

  <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto">
    <div className="relative w-full sm:w-[140px] lg:w-64">
      <Input
        placeholder="Search product name"
        className="pl-10 border-[#eeeeee] bg-white border-2 rounded-full focus:outline-none py-3"
      />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#888888]" />
    </div>
    <Link href='/dashboard/Management/add'>
              <button className="w-full sm:w-[136px] h-[40px] bg-[#f3b852] rounded-2xl text-white font-bold flex justify-center items-center">
                + New Branches
              </button>
            </Link>

  </div>
</div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="text-center">
              <tr className="border-b">
                <th className="py-2 px-4 text-left text-black font-bold">Branch Name</th>
                <th className="py-2 px-4 text-left text-black font-bold">Manager</th>
                <th className="py-2 px-4 text-left text-black font-bold">Location</th>
                <th className="py-2 px-4 text-left text-black font-bold">Employees No.</th>
                <th className="py-2 px-4 text-left text-black font-bold">Total Products</th>
                <th className="py-2 px-4 text-left text-black font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {products.map((product) => (
                <tr key={product.id} className="border-b cursor-pointer hover:bg-gray-100">
                  <td className="py-2 px-4 text-[#36383a]">{product.BranchName}</td>
                  <td className="py-2 px-4 text-[#36383a]">{product.Manager}</td>
                  <td className="py-2 px-4 text-[#36383a]">{product.Location}</td>
                  <td className="py-2 px-4 text-[#36383a]">{product.subCategory}</td>
                  <td className="py-2 px-4 text-[#36383a]">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4">
                    <div className="w-[94.67px] h-[28px] border-2 border-[#eeeeee] rounded-lg flex items-center justify-center space-x-2">
                      <button onClick={() => handleEyeClick( product.id)}>
                        <i className="fa-solid fa-pencil text-[#a19f9f]"></i>
                      </button>
                      <div className="w-px h-5 bg-[#eeeeee]"></div>
                      <button >
                        <i className="fa-solid fa-eye text-[#292d32]"></i>
                      </button>
                      <div className="w-px h-5 bg-[#eeeeee]"></div>
                      <button>
                        <i className="fa-solid fa-trash text-[#e13e3e]"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
