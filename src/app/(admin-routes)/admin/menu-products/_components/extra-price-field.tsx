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
  const [isEditMood, setIsEditMood] = useState(false);
  const [editItemIdx, setEditItemIdx] = useState("");
  // submit for edit & post
  function onSubmit() {
    const valuesTriming = {
      name: values.name.trim(),
      extra_price: values.extra_price.trim(),
    };

    let isValid = true;

    if (valuesTriming.name.length === 0) {
      setNameError("This field is required");
      isValid = false;
    } else {
      setNameError("");
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(valuesTriming.extra_price)) {
      setPriceError("Please enter a valid price ");
      isValid = false;
    } else {
      setPriceError("");
    }
    // post
    if (!isEditMood && isValid) {
      setData((curr: any) => [...curr, valuesTriming]);
      setValues({ name: "", extra_price: "" });
    }
    // edit
    if (isEditMood && isValid) {
      setData((curr: any) => {
        const newArr = [...curr];
        newArr[+editItemIdx] = { ...newArr[+editItemIdx], ...valuesTriming };
        return newArr;
      });
      setValues({ name: "", extra_price: "" });
      setIsEditMood(false);
    }
  }

  function onChange(val: string, prop: string) {
    setValues((curr: any): any => {
      return { ...curr, [prop]: val };
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
                  onChange={(e) => onChange(e.target.value, "name")}
                  className={cn(
                    "text-[17px] bg-slate-100 focus:border-slate-500 border-[2.5px] p-5 "
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
                  onChange={(e) => onChange(e.target.value, "extra_price")}
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
            " text-white text-2xl text-center rounded-md  mt-1 w-full bg-slate-700 hover:bg-slate-800 hover:text-white "
          )}
          onClick={onSubmit}
        >
          {isEditMood ? btnName.replace("Add", "Update") : btnName}
        </Button>
      </div>
      <ExtraPriceItems
        accordLabelName={accordLabelName}
        data={data}
        isSubmitting={isSubmitting}
        labelName={labelName}
        setData={setData}
        setValues={setValues}
        setIsEditMood={setIsEditMood}
        editItemIdx={editItemIdx}
        setEditItemIdx={setEditItemIdx}
        isEditMood={isEditMood}
      />
    </div>
  );
}
