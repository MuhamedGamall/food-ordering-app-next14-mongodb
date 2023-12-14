"use client";

import axios from "axios";
import toast from "react-hot-toast";

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
import { Loader } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      message: "Categories is required.",
    })
    .max(30, { message: "Categories should be on a lot of 30 characters." }),
});
export default function AddCatigoryForm() {
  async function onSubmit(value: any) {
    try {
      if (value?.length !== 0) {
        await axios.post("/api/categories", value);
      }
      toast.success("Category added");
    } catch (error: any) {
      toast.error("Somethig went wrong try again");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  return (
    <div>
      {isSubmitting && (
        <div className="absolute h-full w-full bg-slate-200/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
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
                  Add catigory
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Add categories"
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
            // disabled={isSubmitting || !isValid}
            className={cn("  text-2xl text-center rounded-full  mt-5 w-fit")}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
