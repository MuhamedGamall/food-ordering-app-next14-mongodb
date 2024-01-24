"use client";
import { Button } from "@/components/ui/button";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { MdError } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import HandleLoader from "@/components/loader";
import SectionHeader from "@/components/section-header";

interface LogInFormProps {
  onSubmit: ({ values }: any) => Promise<void>;
}

const formSchema = z.object({
  password: z.string().trim().min(5, {
    message: "password is required",
  }),
  email: z.string().trim().email("Please enter valid email address"),
});

export default function LogInForm({ onSubmit }: LogInFormProps) {
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting, isSubmitted } = form.formState;

  const userIsVaild = isSubmitted && session.status === "unauthenticated";

  return (
    <>
      <div className="sm:w-[80%] max-w-[80rem] mx-auto  mt-5 p-5">
        <div className="relative max-w-full md:max-w-[70%]">
          {isSubmitting && <HandleLoader />}
          <SectionHeader title="LOG IN" className="my-5" />
          <div className="flex text-slate-500 ">
            <Button
              variant="outline"
              disabled={isSubmitting}
              className={cn(
                " flex-1 text-[19px] py-6 border-slate-500 border-[2.5px]"
              )}
              onClick={() =>
                signIn("google", {
                  redirect: false,
                  callbackUrl: "/",
                })
              }
            >
              <FaGoogle className="mr-2 h-6 w-6" />
              Google
            </Button>
          </div>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t  border-slate-500 " />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-500 rounded-md px-2 text-muted-foreground text-white text-lg">
                Or continue with
              </span>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 relative"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormItem className="mb-5">
                      <FormLabel className="text-slate-500 text-[20px] ">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          className={cn(
                            "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                          )}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="text-slate-500 text-[20px]">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          className={cn(
                            "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                          )}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  </>
                )}
              />
              <div className="flex flex-col gap-y-3 justify-center items-start">
                <span className="text-[20px] text-red-400">
                  {userIsVaild && (
                    <div className="flex gap-1 items-center">
                      <MdError />
                      Wrong email or password
                    </div>
                  )}
                </span>
                <span className="text-[16px] ">
                  Don`&#39;t have an account?
                  <Link
                    href={"create-acount"}
                    className="underline text-[#2D5D2A]"
                  >
                    Sign Up
                  </Link>
                </span>
                <Button
                  type="submit"
                  variant={"green"}
                  disabled={isSubmitting || !isValid}
                  className={cn(
                    " text-white text-2xl text-center rounded-full"
                  )}
                >
                  Log in
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
