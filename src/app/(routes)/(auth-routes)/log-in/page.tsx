"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import HeroAcountSection from "../_components/hero-acount-section";
import Link from "next/link";
export default function LoginPage() {
  return (
    <div>
      <HeroAcountSection />
      <div className=" max-w-[90rem] mx-auto  mt-5 p-5">
        <div className="max-w-full md:max-w-[70%]">
          <Card className="border-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-[50px] mb-5"> LOG IN NOW</CardTitle>
              <CardDescription className="text-slate-500 text-[19px]">
                Enter your email below toLog In your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-500 ">
                <Button
                  variant="outline"
                  className="text-[19px] py-6 border-slate-500 border-[2.5px]"
                >
                  <FaFacebook className="mr-2 h-6 w-6 " />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="text-[19px] py-6 border-slate-500 border-[2.5px]"
                >
                  <FaGoogle className="mr-2 h-6 w-6" />
                  Google
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t  border-slate-500 " />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-500 rounded-md px-2 text-muted-foreground text-white text-lg">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email " className="text-slate-500 text-[20px] ">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="text-[22px] border-slate-500 border-[2.5px] p-6"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="password"
                  className="text-slate-500 text-[20px] "
                >
                  Password *
                </Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Passward"
                  className="text-[22px] border-slate-500 border-[2.5px] p-6"
                />
              </div>
            </CardContent>
            <CardFooter className=" flex flex-col gap-y-3 justify-center items-start">
              <span className="text-[16px]">
                Don&#39;t have an account?{" "}
                <Link
                  href={"create-acount"}
                  className="underline text-[#2D5D2A]"
                >
                  Sign Up
                </Link>
              </span>
              <Button
                variant={"green"}
                className=" text-white text-2xl text-center rounded-full "
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
