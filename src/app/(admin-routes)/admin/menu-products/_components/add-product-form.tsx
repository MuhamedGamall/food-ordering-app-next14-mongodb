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
import { InitCategoryState } from "../../../../../../types";
import HandleLoader from "@/components/loader";
import { Textarea } from "@/components/ui/textarea";
import ExtraPriceField from "./extra-price-field";
interface AddProductFormProps {
  onSubmit: (v: any) => Promise<void>;
}
export interface Field {
  name: string;
  extra_price: string;
}
export default function AddProductForm({ onSubmit }: AddProductFormProps) {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.catygories);
  const [selectLoading, setSelectLoading] = useState(false);

  const [sizes, setSizes] = useState<Field[]>([]);
  const [extraIncreasesPrice, setExtraIncreasesPrice] = useState<Field[]>([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      base_price: "",
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

  const { isSubmitting } = form.formState;

  return (
    <div className="space-y-4 mt-4 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="my-2">
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
              <FormItem className="flex flex-col text-slate-500 text-[17px] my-2">
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
              <FormItem className="w-full my-2">
                <FormLabel className="text-slate-500 text-[17px] ">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Description"
                    {...field}
                    className={cn(
                      "text-[18px] md:text-[22px]  bg-slate-100 focus:border-slate-500 border-[2.5px] p-6 h-[120px] min-h-[120px] max-h-[200px]"
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
              <FormItem className="my-2">
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
          <div className="my-4">
            <FormLabel className="text-slate-500 text-[17px] ">Sizes</FormLabel>
            <ExtraPriceField
              fieldName={{ name: "sizes.name", price: "sizes.extra_price" }}
              labelName={{ label: "Size", price: "Extra price" }}
              btnName={"Add item size"}
              accordLabelName={"Sizes list"}
              setData={setSizes}
              data={sizes}
              form={form}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="my-4">
            <FormLabel className="text-slate-500 text-[17px] ">
              Increases
            </FormLabel>
            <ExtraPriceField
              fieldName={{
                name: "extra_increases_price.name",
                price: "extra_increases_price.extra_price",
              }}
              labelName={{ label: "Increase", price: "Extra price" }}
              btnName={"Add item increase"}
              accordLabelName={"Increases list"}
              setData={setExtraIncreasesPrice}
              data={extraIncreasesPrice}
              form={form}
              isSubmitting={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            variant={"green"}
            disabled={isSubmitting}
            className={cn("  text-2xl text-center rounded-full  mt-1 w-fit")}
          >
            Add product
          </Button>
        </form>
      </Form>
    </div>
  );
}
