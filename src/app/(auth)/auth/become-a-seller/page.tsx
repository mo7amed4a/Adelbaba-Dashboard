"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlertApp from "@/components/auth/AlertApp";
import { useState } from "react";

const img = "/icons/auth/bg.jpeg";

export default function LoginForm() {
  const [isOpen, setIsOpen] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <div
      className={`relative lg:h-[85vh] bg-center bg-cover px-4`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>
      {/* <Image src="/icons/auth/bg.jpeg" className="w-full" width={800} height={800} alt="bg auth" /> */}
      <div className="relative z-10 flex justify-center items-center w-full h-full py-10">
        <form onSubmit={submit} className="h-full w-full flex flex-col space-y-5 items-center justify-center">
          <h2 className="text-xl md:text-3xl text-white font-bold">
            Become a Seller
          </h2>
          <Card className="w-full md:max-w-xl md:mx-auto bg-transparent text-white pt-6 border-primary">
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-primary md:text-base"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Mohamed Omar"
                    className="bg-white py-6 text-black"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="company-name"
                    className="text-primary md:text-base"
                  >
                    company Name
                  </Label>
                  <Input
                    id="company-name"
                    type="text"
                    placeholder="EGYfood"
                    className="bg-white py-6 text-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="mobile"
                    className="text-primary md:text-base"
                  >
                    Phone number
                  </Label>
                  <Input
                    id="mobile"
                    type="mobile"
                    placeholder="0123456789"
                    className="bg-white py-6 text-black"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                <Label
                    htmlFor="platforms"
                    className="text-primary md:text-base"
                  >
                    Platforms you are selling on
                  </Label>
                  <Select >
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Amazon" className="py-4" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>Platforms</SelectLabel>
                        <SelectItem value="amazon" >
                          Amazon
                        </SelectItem>
                        <SelectItem value="express">Express</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                <Label
                    htmlFor="company-type"
                    className="text-primary md:text-base"
                  >
                    Company Type
                  </Label>
                  <Select >
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Trading Company" className="py-4" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>Company Type</SelectLabel>
                        <SelectItem value="any" >
                          Any
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                <Label
                    htmlFor="category"
                    className="text-primary md:text-base"
                  >
                    Main category
                  </Label>
                  <Select >
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Food and Beverages" className="py-4" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>categories</SelectLabel>
                        <SelectItem value="food">
                          Food
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full py-6 md:text-lg">
                  Send a request
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      <AlertApp isOpen={isOpen} setIsOpen={setIsOpen} text={"Success!"} msg={"Your Request was sent successfully."} />
    </div>
  );
}
