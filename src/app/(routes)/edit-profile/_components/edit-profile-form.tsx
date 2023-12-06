"use client";
import { Button } from "@/components/ui/button";

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
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import UploadImageForm from "./upload-image-form";

interface EditProfileFormProps {
  onSubmit: ({ values }: any) => Promise<void>;
}

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Username must be at least 1 characters.",
    })
    .max(30, { message: "Username should be on a lot of 30 characters." }),
});

export default function EditProfileForm({ onSubmit }: EditProfileFormProps) {
  const session = useSession();

  const email = session.data?.user?.email as string;

  const currentUsername = session.data?.user?.name || email?.split("@")[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    values: {
      name: currentUsername,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  return (
    <>
      <div className="sm:w-[80%] max-w-[80rem] mx-auto  mt-5 p-5">
        <div className="space-y-1 mb-5">
          <h1 className="text-[40px] ">Profile</h1>
        </div>
        <div className=" mx-auto relative max-w-full md:max-w-[80%]  flex gap-5   sm:flex-nowrap flex-wrap">
          {isSubmitting && (
            <div className="absolute h-full w-full bg-slate-200/20 top-0 right-0 rounded-m flex items-center justify-center">
              <Loader className="animate-spin h-6 w-6 text-sky-700" />
            </div>
          )}
          <UploadImageForm />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 relative w-full"
            >
              <div className="flex flex-col w-full">
                <FormField
                  disabled
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <FormItem>
                        <FormLabel className="text-slate-500 text-[20px]">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter first name & last name"
                            className={cn(
                              "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                            )}
                            {...field}
                            type="text"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    </>
                  )}
                />
                <div className="mt-[10px_!important] ">
                  <Label className="text-slate-500 text-[20px] ">Email</Label>
                  <Input
                    value={email}
                    type="email"
                    className={cn(
                      "text-[18px] md:text-[22px]  bg-slate-300 focus:border-slate-500 border-[2.5px] p-6 "
                    )}
                    disabled
                  />

                  <Button
                    type="submit"
                    variant={"green"}
                    disabled={isSubmitting}
                    className={cn("  text-2xl text-center rounded-full  mt-5")}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
