"use client";
import { Button } from "@/components/ui/button";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
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
import { signIn } from "next-auth/react";

interface CreateAcountFormProps {
  onSubmit: ({ values }: any) => Promise<void>;
  isError?: boolean;
}

const formSchema = z.object({
  password: z
    .string()
    .min(5, {
      message: "password must be at least 5 characters.",
    })
    .max(30, { message: "password should be on a lot of 50 characters." }),
  email: z.string().email("Please enter valid email address"),
});

export default function CreateAcountForm({
  onSubmit,
  isError,
}: CreateAcountFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  return (
    <>
      <div className="sm:w-[80%] max-w-[80rem] mx-auto  mt-5 p-5">
        <div className="relative max-w-full md:max-w-[70%]">
          {isSubmitting && (
            <div className="absolute h-full w-full bg-slate-200/20 top-0 right-0 rounded-m flex items-center justify-center">
              <Loader className="animate-spin h-6 w-6 text-sky-700" />
            </div>
          )}
          <div className="space-y-1 mb-3">
            <h1 className="text-[40px] mb-5">
              CREATE YOUR ACCOUNT
              <div className="text-slate-500 text-[19px]">
                Enter your email below to create your account
              </div>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-500 ">
            <Button
              variant="outline"
              disabled={isSubmitting}
              className={cn("text-[19px] py-6 border-slate-500 border-[2.5px]")}
              onClick={() => signIn("google",  { redirect:false,callbackUrl: "/" })}
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
                          placeholder="m@example.com"
                          className={cn(
                            "text-[22px] border-slate-500 border-[2.5px] p-6 focus:bg-slate-200"
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
                          placeholder="Enter password"
                          className={cn(
                            "text-[22px] border-slate-500 border-[2.5px] p-6 focus:bg-slate-200"
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
                  {isError && "This account already exists."}
                </span>
                <span className="text-[16px] ">
                  You have already account
                  <Link
                    href={"log-in"}
                    className="underline text-[#2D5D2A]"
                  >
                    Log In
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
                  Create Account
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
