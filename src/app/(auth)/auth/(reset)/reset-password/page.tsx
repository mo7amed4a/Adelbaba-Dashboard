"use client";
import AlertApp from "@/components/auth/AlertApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { useState } from "react";

export default function ForgotPasswordForm() {
  const [isOpen, setIsOpen] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };
  return (
    <form
      onSubmit={submit}
      className="flex flex-col items-center space-y-3 w-full text-center"
    >
      <h2 className="text-xl md:text-3xl font-bold">Reset Password</h2>
      <p className="text-gray-500">Enter your new password</p>
      <div className="grid gap-2 w-full text-start">
        <div className="flex items-center">
          <Label htmlFor="new-password" className="text-primary md:text-base">
            New Password
          </Label>
        </div>
        <Input
          id="new-password"
          type="password"
          className="bg-white py-6 text-black"
          placeholder="*********"
          required
        />
      </div>
      <div className="grid gap-2 w-full text-start">
        <div className="flex items-center">
          <Label
            htmlFor="confirm-new-password"
            className="text-primary md:text-base"
          >
            Confirm New Password
          </Label>
        </div>
        <Input
          id="confirm-new-password"
          type="password"
          className="bg-white py-6 text-black"
          placeholder="*********"
          required
        />
        <Button type="submit" className="w-full py-6 md:text-lg">
          Submit
        </Button>
      </div>
      <AlertApp isOpen={isOpen} setIsOpen={setIsOpen} text={"Success!"} msg={"Your password was changed successfully ."} url={`/auth/sign-in`} btnText={"Login Now"} />
    </form>
  );
}
