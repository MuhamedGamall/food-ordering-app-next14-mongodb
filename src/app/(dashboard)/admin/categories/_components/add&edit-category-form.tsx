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

import HandleLoader from "@/components/loader";
import { useState } from "react";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      message: "Categories is required.",
    })
    .max(30, { message: "Categories should be on a lot of 30 characters." }),
});
export default function Add_EditCategoryForm({
  onAdd,
  editData,
}: {
  editData: any;
  onAdd: (value: { title: string }, form: any) => Promise<void>;
}) {
  const isEditMood = Boolean(editData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
    values: {
      title: editData?.title || "",
    },
  });

  async function onSubmit(value: any) {
    onAdd(value, form);
  }

  const { isSubmitting, isValid } = form.formState

  return (
    <>
      {isSubmitting && <HandleLoader />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-500 text-[17px] ">
                  Categories
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder={
                      isEditMood ? "Edit category" : "Add categories"
                    }
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
          <Button
            type="submit"
            variant={"green"}
            disabled={isSubmitting || !isValid}
            className={cn("  text-2xl text-center rounded-full  mt-5 w-fit")}
          >
            {isEditMood ? "Update" : "Add categories"}
          </Button>
        </form>
      </Form>
    </>
  );
}
