"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { profileSchema } from "../validation-schema/profile-schema";
import useProfile from "@/hooks/user-profile";

interface ProfileFormInputsProps {
  onSubmit: (v: any) => Promise<void>;
  data: any;
}

export default function ProfileFormInputs({
  onSubmit,
}: ProfileFormInputsProps) {
  const { data } = useProfile();
  const currentName = data?.name || data?.email?.split("@")[0];
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street_address: "",
      city: "",
      postal_code: "",
      country: "",
    },
    values: {
      name: currentName,
      email: data?.email,
      phone: data?.phone,
      street_address: data?.street_address,
      city: data?.city,
      postal_code: data?.postal_code,
      country: data?.postal_code,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 mt-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-[17px] ">
                First name & last name
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="First name & last name"
                  type="name"
                  required
                  {...field}
                  className={cn(
                    "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-[17px] ">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="example@gmail.com"
                  type="email"
                  {...field}
                  className={cn(
                    "text-[18px] md:text-[22px]  bg-slate-300 focus:border-slate-500 border-[2.5px] p-6 "
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-[17px] ">
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="inter phone"
                  type="tel"
                  {...field}
                  className={cn(
                    "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-[17px] ">
                Street address
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Inter street"
                  type="text"
                  {...field}
                  className={cn(
                    "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4  sm:flex-nowrap flex-wrap">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-slate-500 text-[17px] ">
                  Postal code
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Inter pastol code"
                    type="text"
                    {...field}
                    className={cn(
                      "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-slate-500 text-[17px] ">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Enter city"
                    type="text"
                    {...field}
                    className={cn(
                      "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 "
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-[17px] ">
                Country
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Enter country"
                  type="text"
                  {...field}
                  className={cn(
                    "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-5 "
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"green"}
          disabled={isSubmitting || !isValid}
          className={cn("  text-2xl text-center rounded-full  mt-5 w-fit")}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
