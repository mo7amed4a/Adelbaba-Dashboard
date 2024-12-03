import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const img = '/auth/bg.jpeg'

export default function LoginPage() {
  return (
    <div className={`relative lg:h-[85vh] bg-center bg-cover px-4`} style={{backgroundImage: `url(${img})`}}>
      <div className="bg-black/70 z-0 w-full h-full absolute inset-0"></div>
      {/* <Image src="/auth/bg.jpeg" className="w-full" width={800} height={800} alt="bg auth" /> */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 w-full h-full py-10">
       <div className="h-full flex items-center justify-center">
        <div className="text-lg md:text-5xl md:w-3/4 space-y-10">
            <p className="text-white">
            Discover Millions of Products. From everyday essentials to hard-to-find treasures
            </p>
            <p className="text-primary font-bold">join us today!</p>
          </div>
       </div>
        <div className="h-full flex items-center justify-center">
          <Card className="w-full md:w-3/5 md:mx-auto bg-transparent text-white pt-6 border-primary">
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
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
                  <Link href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button type="submit" className="w-full py-6 md:text-lg">
                  Sign in
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account ?{" "}
                <Link href="/auth/sign-up" className="underline text-primary">
                  Create account
                </Link>
              </div>
              <div className="flex flex-col items-center space-y-2 mt-4">
                <p className="text-primary">Or sign in With</p>
                <div className="flex gap-x-4">
                  <Link href="/" className="p-4 bg-white rounded-md">
                    <img
                      src="/social/google.png"
                      alt="google"
                      className="size-5 inline-block"
                    />
                  </Link>
                  <Link href="/" className="p-4 bg-white rounded-md">
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
