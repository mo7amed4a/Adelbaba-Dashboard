"use client";

import React, { useState } from "react"; 
import { FaSearch } from 'react-icons/fa';
import { Input } from '@/components/ui/input'; // تأكد من أن لديك مكون Input في المشروع
import Image from "next/image";
import date from '../../../../imgs/image (31).png'; // تأكد من مسار الصورة
import { Bar } from "react-chartjs-2";
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Pie  from "@/components/Pie Chart - Donut with-Text"


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


// بيانات البار
const barData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      label: "Revenues",
      data: [15, 10, 25, 20, 18, 22, 17],
      backgroundColor: "#F9DCA8",
    },
    {
      label: "Expenses",
      data: [12, 8, 20, 15, 14, 18, 12],
      backgroundColor: "#D3D3D3",
    },
  ],
};

// الخيارات 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options : any= {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

// بيانات الأدمن
const products = [
  { id: 1, adminName: "Mohamed Omar", Role: "Content Admin", Email: "Mo@gmail.com", status: "Active" },
  { id: 2, adminName: "Ali Ahmed", Role: "Content Admin", Email: "Ali@gmail.com", status: "Inactive" },
];

function Advertisements() {
  const [calendarOpen, setCalendarOpen] = useState(false);

 

  return (
    <div>
     
 


<div className="flex justify-between items-center mb-8 flex-col sm:flex-row">
  <h1 className="text-2xl font-semibold">Advertisements</h1>

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
                + New Admin
              </button>
            </Link>

  </div>
</div>

      <div className="flex flex-col gap-6 p-4 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-lg">Active Ads</p>
              <div className="mt-4 mb-4 flex flex-col sm:flex-row gap-6">
                <p className="text-gray-500 font-bold">
                  Banner Ads <span className="text-black">2.3K</span>
                </p>
                <p className="text-gray-500 font-bold">
                  Slideshow Ads <span className="text-black">1.8K</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row items-start">
                <h2 className="text-green-600 font-bold text-xl">30%</h2>
                <p className="text-gray-500">
                  Your active ads are 30% <br /> more than last month
                </p>
              </div>
            </div>
      
            <Pie></Pie>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <p className="font-bold mt-4">Active Ads</p>
              <div className="mt-4 mb-4 flex flex-col sm:flex-row gap-6">
                <p className="text-[#a19f9f] font-bold">
                  Banner Ads <span className="text-black">2.3K</span>
                </p>
                <p className="text-[#a19f9f] font-bold">
                  Slideshow Ads <span className="text-black">1.8K</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <h2 className="font-bold">30%</h2>
                <p className="text-[#a19f9f] mb-4">
                  Your active ads are 30% <br />
                  more than last month
                </p>
              </div>
            </div>
            <div className="p-4 h-60 sm:w-[300px]">
              <Bar data={barData} options={options} />
        
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
          <table className="min-w-full border border-gray-200 text-center">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-4 px-6 text-black font-bold">Admin Name</th>
                <th className="py-4 px-6 text-black font-bold">Role</th>
                <th className="py-4 px-6 text-black font-bold">Email</th>
                <th className="py-4 px-6 text-black font-bold">Status</th>
                <th className="py-4 px-6 text-black font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-4 px-6 text-gray-700">{product.adminName}</td>
                  <td className="py-4 px-6 text-gray-700">{product.Role}</td>
                  <td className="py-4 px-6 text-gray-700">{product.Email}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-4 py-2 rounded-lg font-semibold text-white ${
                        product.status === "Inactive" ? "bg-red-400" : "bg-green-400"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-800 mx-2">Edit</button>
                    <button className="text-red-600 hover:text-red-800 mx-2">Delete</button>
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

export default Advertisements;







