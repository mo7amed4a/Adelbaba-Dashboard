"use client";

import React, { useState } from "react"; 
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Input } from "@/components/ui/input";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
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

import Pie from "@/components/Pie Chart - Donut with-Text";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

const options:any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const products = [
  { id: 1, BranchName: "Branch A", Manager: "Mohamed Omar", Location: "Cairo", EmployeesNo: 20, TotalProducts: 200, price: 150.0 },
  { id: 2, BranchName: "Branch B", Manager: "Ali Ahmed", Location: "Alexandria", EmployeesNo: 15, TotalProducts: 150, price: 200.0 },
  { id: 3, BranchName: "Branch C", Manager: "Sara Ali", Location: "Giza", EmployeesNo: 10, TotalProducts: 100, price: 0.0 }, // Add default price
];

function Advertisements() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const router = useRouter();

  // Handle eye icon click and navigate to the details page
  const handleEyeClick = (id: number) => {
    router.push(`/dashboard/Advertisments/${id}`);
  };

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
          <Link href="/dashboard/Advertisments/add">
            <button className="w-full sm:w-[136px] h-[40px] bg-[#f3b852] rounded-2xl text-white font-bold flex justify-center items-center">
              + New Ad
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4 min-h-screen">
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
            <Pie />
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
                  <td className="py-2 px-4 text-[#36383a]">{product.EmployeesNo}</td>
                  <td className="py-2 px-4 text-[#36383a]">
                    ${product.price ? product.price.toFixed(2) : "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    <div className="w-[94.67px] h-[28px] border-2 border-[#eeeeee] rounded-lg flex items-center justify-center space-x-2">
                      <button >
                        <i className="fa-solid fa-pencil text-[#a19f9f]"></i>
                      </button>
                      <div className="w-px h-5 bg-[#eeeeee]"></div>
                      <button onClick={() => handleEyeClick(product.id)}>
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

export default Advertisements;
