"use client";
import AlertApp from "@/components/auth/AlertApp";
import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { use, useState } from "react";

export default function LoginForm({
  params,
}:{
  params: Promise<{ lng: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { lng } =  use(params);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
    
  };
  return (
    <form onSubmit={submit} className="flex flex-col items-center space-y-2 md:space-y-7 w-full text-center">
      <h2 className="text-xl md:text-3xl font-bold">Reset Password</h2>
      <p className="text-gray-500 text-xs md:text-base">
        Please Enter The OTP Code Sent To{" "}
        <span className="underline">Mariam@gmail.com</span>
      </p>
      <div dir="ltr">
        <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={0} />
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={2} />
            <InputOTPSlot className="size-12 md:size-16 text-lg" index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button type="submit" className="w-full py-4 md:py-6 md:text-lg">
        Send a request
      </Button>
      <AlertApp isOpen={isOpen} setIsOpen={setIsOpen} text={"Success!"} msg={"Your OTP has been sent to your email. Please check your inbox to verify and proceed with resetting your password."} url={`/auth/reset-password`} btnText={"Reset Password"} />
    </form>
  );
}
