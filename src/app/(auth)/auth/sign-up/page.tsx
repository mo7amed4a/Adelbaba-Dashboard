import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const img = '/auth/bg.jpeg'

export default function SignupForm() {
  return (
    <div className={`relative lg:h-[85vh] bg-center bg-cover px-4`} style={{backgroundImage: `url(${img})`}}>
      <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>
      {/* <Image src="/auth/bg.jpeg" className="w-full" width={800} height={800} alt="bg auth" /> */}
      <div className="relative z-10 flex justify-center items-center w-full h-full py-10">
       <div className="h-full w-full flex flex-col space-y-5 items-center justify-center">
          <h2 className="text-xl md:text-3xl text-white font-bold">Create account</h2>
          <Card className="w-full md:max-w-xl md:mx-auto bg-transparent text-white pt-6 border-primary">
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Select>
                    <SelectTrigger className="w-full bg-white text-gray-500">
                      <SelectValue placeholder="Select a country" className="py-4" />
                    </SelectTrigger>
                    <SelectContent className="text-gray-500">
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        <SelectItem value="egypt">
                          🇪🇬
                          <span>Egypt</span>
                        </SelectItem>
                        <SelectItem value="morocco">🇲🇦 <span>Morocco</span></SelectItem>
                        <SelectItem value="iraq">🇮🇶 <span>Iraq</span></SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-x-4">
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="email" className="text-primary md:text-base">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="mariam"
                      className="bg-white py-6 text-black"
                      required
                    />
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="company-name" className="text-primary md:text-base flex">
                      Co<span className="md:hidden">.</span> <span className="hidden md:flex">mpany</span> <span className="ps-1">Name &#40;optional&#41;</span>
                    </Label>
                    <Input
                      id="company-name"
                      type="text"
                      placeholder="tech company"
                      className="bg-white py-6 text-black"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-primary md:text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mariam@gmail.com"
                    className="bg-white py-6 text-black"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-primary md:text-base">
                      Password
                    </Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    className="bg-white py-6 text-black"
                    placeholder="*********"
                    required
                  />
                  <Link
                     href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="flex gap-x-2 items-start">
                  <Checkbox  id="terms" className="md:mt-2 size-5"/>
                  <label
                    htmlFor="terms"
                    className="text-xs md:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By creating an account, you agree to our Terms of Service and Privacy Policy. 
                  </label>
                </div>
                <Button type="submit" className="w-full py-6 md:text-lg" >
                  Sign up
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Do you have an account ?{" "}
                <Link href="#" className="underline text-primary">
                  Sign in
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-2 mt-4">
                <p className="text-primary">Or sign up With</p>
                <div className="flex gap-x-4">
                  <Link href="#" className="p-4 bg-white rounded-md">
                    <img
                      src="/social/google.png"
                      alt="google"
                      className="size-5 inline-block"
                    />
                  </Link>
                  <Link href="#" className="p-4 bg-white rounded-md">
                    <img
                      src="/social/facebook.png"
                      alt="facebook"
                      className="size-5 inline-block"
                    />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
