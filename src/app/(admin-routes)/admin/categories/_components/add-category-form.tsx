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
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { postCategory } from "@/lib/RTK/slices/categories-slice";
import HandleLoader from "@/components/loader";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, {
      message: "Categories is required.",
    })
    .max(30, { message: "Categories should be on a lot of 30 characters." }),
});
export default function AddCategoryForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  async function onSubmit(value: any) {
    if (value?.length !== 0) {
      dispatch(postCategory(value));
      form.setValue("title", "");
      // router.refresh();
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
            disabled={isSubmitting || !isValid}
            className={cn("  text-2xl text-center rounded-full  mt-5 w-fit")}
          >
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
