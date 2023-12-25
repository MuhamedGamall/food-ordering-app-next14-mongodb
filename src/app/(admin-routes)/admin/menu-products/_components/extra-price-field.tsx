"use client";

import {
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useState } from "react";
import ExtraPriceItems from "./extra-price-items";


export interface Field {
  name: string;
  extra_price: string;
}
interface ExtraPriceFieldProps {
  fieldName: { name: string; price: string };
  labelName: { label: string; price: string };
  btnName: string;
  accordLabelName: string;
  data: Field[];
  setData: any;
  isSubmitting: boolean;
  form: any;
}

export default function ExtraPriceField({
  fieldName,
  labelName,
  btnName,
  accordLabelName,
  data,
  setData,
  isSubmitting,
  form,
}: ExtraPriceFieldProps) {
  const [values, setValues] = useState({ name: "", extra_price: "" });

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  function onSubmit() {
    let isValid = true;

    if (!values.name) {
      setNameError("This field is required");
      isValid = false;
    } else {
      setNameError("");
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(values.extra_price)) {
      setPriceError("Please enter a valid price ");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (isValid) {
      setData((curr: any) => [...curr, values]);
      console.log(data);
    }
    setValues({ name: "", extra_price: "" });
  }

  const onRemove = (idx: number) => {
    setData((curr: Field[]) => curr.filter((_, i) => i !== idx));
  };

  function onChange(val: string, prop: string) {
    setValues((curr: any): any => {
      return { ...curr, [prop]: val };
      // curr[prop] = val;
      // return curr;
    });
  }

  return (
    <div className=" bg-slate-100 rounded-md  border-slate-200 border-[2.5px] p-2 x">
      <div className="sm:flex flex-wrap  items-center gap-4 ">
        <FormField
          control={form.control}
          name={fieldName.name}
          render={({ field }) => (
            <FormItem className="flex-1 ">
              <FormLabel className="text-slate-500 text-[17px] ">
                {labelName.label}
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={labelName.label}
                  type="text"
                  value={values.name}
                  onChange={(e) => onChange(e.target.value.trim(), "name")}
                  className={cn(
                    "text-[17px]    bg-slate-100 focus:border-slate-500 border-[2.5px] p-5 "
                  )}
                />
              </FormControl>
              <span className="text-red-700 text-sm font-medium text-destructive">
                {nameError}
              </span>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={fieldName.price}
          render={({ field }) => (
            <FormItem className="flex-1 space-y-2">
              <FormLabel className="text-slate-500 text-[17px] ">
                {labelName.price}
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Add extra price"
                  type="text"
                  onChange={(e) =>
                    onChange(e.target.value.trim(), "extra_price")
                  }
                  value={values.extra_price}
                  className={cn(
                    "text-[17px]   bg-slate-100 focus:border-slate-500 border-[2.5px] p-5 "
                  )}
                />
              </FormControl>
              <span className="text-red-700 text-sm font-medium text-destructive">
                {priceError}
              </span>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant={"ghost"}
          disabled={isSubmitting}
          className={cn(
            " text-white text-2xl text-center rounded-md  mt-1 w-full bg-slate-400 hover:bg-slate-500 "
          )}
          onClick={onSubmit}
        >
          {btnName}
        </Button>
      </div>
      <ExtraPriceItems
        accordLabelName={accordLabelName}
        data={data}
        isSubmitting={isSubmitting}
        labelName={labelName}
        onEdit={() => ""}
        onRemove={onRemove}
      />
    </div>
  );
}
