import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import icone from '../../../../../imgs/image (35).png';
import SubHeader from '@/components/layouts/SubHeader';
// import Image from 'next/image'; 

export default function Page() {
  return (
    <div>
      <SubHeader title='Add New Admin' />
      <div>
        <div className="bg-white p-4 rounded-lg w-full mx-auto">
          <form>
            <div className="grid grid-cols-2 gap-6 mb-5">
              <div>
                <label htmlFor="adminName" className="text-black">Admin Name</label>
                <Input id="adminName" className="rounded-lg w-full py-4 mt-2" placeholder="Mohamed Omar" />
              </div>
              <div>
                <label htmlFor="adminRole" className="text-black">Admin Role</label>
                <Input id="adminRole" className="rounded-lg w-full py-4 mt-2" placeholder="System Admin" />
              </div>
              <div>
                <label htmlFor="adminEmail" className="text-black">Admin Email</label>
                <Input id="adminEmail" className="rounded-lg w-full py-4 mt-2" placeholder="Mo@gmail.com" />
              </div>
              <div>
                <label htmlFor="adminPassword" className="text-black">Admin Password</label>
                <Input type="password" id="adminPassword" className="rounded-lg w-full py-4 mt-2" placeholder="********" />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-black font-semibold mb-4">Admin Responsibilities</h3>
              <div className=" p-4 rounded-xl border border-gray-200 text-[#a19f9f]">
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
              <Button variant="outline" className="bg-primary text-white py-4 px-12 rounded-lg">
               Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
