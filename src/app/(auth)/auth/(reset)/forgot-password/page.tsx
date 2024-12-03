"use client";
import AlertApp from "@/components/auth/AlertApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";



export default function ForgotPasswordForm() {
  const [isOpen, setIsOpen] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };
  
  return (
    <div className="flex flex-col items-center space-y-7 w-full text-center">
      <h2 className="text-xl md:text-3xl font-bold">Forgot Password</h2>
      <p className="text-gray-500">
        Please Enter Your Email Address or Phone No. To Receive a Verification
        Code
      </p>
      <form onSubmit={submit} className="grid gap-2 w-full text-start">
        <Label htmlFor="email" className="text-primary md:text-base">
          Email / Phone no.
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="mariam@gmail.com"
          className="bg-white py-6 text-black"
          required
        />
        <Link
          href="/auth/sign-in"
          className="ml-auto inline-block text-sm underline text-primary"
        >
          Sign in?
        </Link>
        <Button type="submit" className="w-full py-6 md:text-lg">
          Reset Password
        </Button>
      </form>
      <AlertApp isOpen={isOpen} setIsOpen={setIsOpen} text={"Success!"} msg={" An OTP has been sent to your email. Please check your inbox to proceed."} url={`/auth/otp`} btnText={"OTP Page"} />
    </div>
  );
}
