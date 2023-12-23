"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

import { productSchema } from "../validation-schema/product-schema";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { InitProductState, InitCategoryState } from "../../../../../../types";
import HandleLoader from "@/components/loader";
import formatPrice from "@/utils/format/format-price";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { useRouter } from "next/navigation";

interface EditProductFormProps {
  onSubmit: (v: any) => Promise<void>;
  product: InitProductState | undefined;
  imageURL64: string;
}

export default function EditProductForm({
  onSubmit,
  product,
  imageURL64,
}: EditProductFormProps) {
  const session = useSession();
  const router = useRouter();
  const { categories } = useAppSelector((state) => state.catygories);

  const [selectLoading, setSelectLoading] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      base_price: "",
    },
    values: {
      title: product?.title || "",
      description: product?.description || "",
      category: product?.category || "",
      base_price: product?.base_price || "",
    },
  });

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        setSelectLoading(true);
        await dispatch(getCategories());
        setSelectLoading(false);
      }
    }
    getData();
  }, [dispatch, session.status]);

  const isValid = !Object.values({ ...form.getValues(), imageURL64 }).some(
    (el) => !!el
  );

  const { isSubmitting } = form.formState;
  return (
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
                Prodct title
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Product title"
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
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col text-slate-500 text-[17px] ">
              <FormLabel className="text-slate-500 text-[17px] ">
                Category
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full overflow-hidden justify-between text-[16px] md:text-[19px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-4 ",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isSubmitting}
                    >
                      {field.value
                        ? categories.find(
                            (category: InitCategoryState) =>
                              category._id === field.value
                          )?.title
                        : "Select category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className=" w-full sm:w-[300px] p-0 overflow-x-auto"
                  align="start"
                >
                  {selectLoading && <HandleLoader />}
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.title}
                          key={category._id}
                          onSelect={() => {
                            console.log(category._id);

                            form.setValue("category", category._id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category.title === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-slate-500 text-[17px] ">
                Description
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Description"
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
          name="base_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-[17px] ">
                Base price
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Price"
                  type="number"
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
        <div className="flex items justify-between">
          <Button
            type="submit"
            variant={"green"}
            disabled={isSubmitting || isValid}
            onClick={() => router.replace("/admin/menu-products")}
            className={cn("  text-2xl text-center rounded-full  mt-5 w-fit")}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
