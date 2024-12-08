// App.js
import React from "react";

const page = () => {
  return (
    <div className=" h-screen ">
    
    
      <main className=" p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Member Information</h1>
          <button className="text-orange-500 font-medium hover:underline">Edit Details</button>
        </header>
        <section className="bg-white shadow-md rounded-lg p-6">
  <div className=" flex justify-around  items-center  gap-4 text-sm w-full max-w-4xl">
    <div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Company Name</p>
      <p className="text-gray-600">Tech Company</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Location</p>
      <p className="text-gray-600">Nasr City Cairo</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Membership No.</p>
      <p className="text-gray-600">1234</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Commercial Registration</p>
      <p className="text-gray-600">102030450</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Manager Name</p>
      <p className="text-gray-600">Mohamed Omar</p>
    </div>

    </div>
    
<div>
<div className=" pb-8">
      <p className="font-bold  pb-1">Email</p>
      <p className="text-gray-600">TechCo@gmail.com</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Phone Number</p>
      <p className="text-gray-600">01012345678</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Total Employees</p>
      <p className="text-gray-600">2341</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Total Products</p>
      <p className="text-gray-600">5214</p>
    </div>
    <div className=" pb-8">
      <p className="font-bold pb-1">Subscription Plan</p>
      <p className="text-gray-600">Premium Plan</p>
    </div>
</div>
   
  </div>
</section>

      </main>
    </div>
  );
};

export default page;
