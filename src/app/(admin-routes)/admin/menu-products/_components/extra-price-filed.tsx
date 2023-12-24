"use client";

import {
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExtraPriceFiledProps {
  form: any;
  isSubmitting: boolean;
  inputName: { name: string; price: string };
  labelName: { label: string; price: string };
  btnName: string;
}

export default function ExtraPriceFiled({
  isSubmitting,
  form,
  inputName,
  labelName,
  btnName,
}: ExtraPriceFiledProps) {
  const [filedsArr, setFiledsArr] = useState([{ name: "", extra_price: "" }]);
  // const [nameFiled, setNameFiled] = useState(  "" );
  // const [extra_priceFiled, setExtra_priceFiled] = useState( "");
  // const [filedsData, setFiledsData] = useState({ name: nameFiled, extra_price: extra_priceFiled});

  const addFiledFnc = () => {
    setFiledsArr((curr) => [...curr, { name: "", extra_price: "" }]);
    
  };
  const removeFiledFnc = (idx: number) => {
    if (filedsArr.length > 1) {
      setFiledsArr((curr) => curr.filter((_, i) => i !== idx));
    }
  };
  
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className=" bg-slate-100 rounded-md  border-slate-200 border-[2.5px]"
      >
        <AccordionItem value="item-1 ">
          <AccordionTrigger className="text-slate-900 text-[19px] px-2">
            {btnName}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-center ">
              {filedsArr.length > 0 &&
                filedsArr.map((el, i) => (
                  <>
                    <Separator className="h-[1px] w-full bg-slate-200" />
                    <div
                      key={i}
                      className={cn(
                        i! % 2 === 1 && "bg-slate-200",
                        "flex items-center gap-1 p-2 w-full"
                      )}
                    >
                      <div className="sm:flex flex-wrap flex-grow items-center gap-4 ">
                        <FormField
                          control={form.control}
                          name={inputName.name}
                          render={({ field }) => (
                            <FormItem className="flex-1 h-[106px]">
                              <FormLabel className="text-slate-500 text-[17px] ">
                                {labelName.label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  placeholder={labelName.label}
                                  type="text"
                                  {...field}
                                  // onChange={(e)=>setNameFiled(e.target.value)}
                                  className={cn(
                                    "text-[17px]    bg-slate-100 focus:border-slate-500 border-[2.5px] p-5 "
                                  )}
                                />
                              </FormControl>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={inputName.price}
                          render={({ field }) => (
                            <FormItem className="flex-1 h-[106px]">
                              <FormLabel className="text-slate-500 text-[17px] ">
                                {labelName.price}
                              </FormLabel>
                              <FormControl>
                                <Input
                                
                                  disabled={isSubmitting}
                                  placeholder="Add extra price"
                                  type="number"
                                  {...field}
                                  // onChange={(e)=>setExtra_priceFiled(e.target.value)}

                                  className={cn(
                                    "text-[17px]   bg-slate-100 focus:border-slate-500 border-[2.5px] p-5 "
                                  )}
                                />
                              </FormControl>
                              <FormMessage className="text-red-700" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant={"ghost"}
                        disabled={isSubmitting}
                        onClick={() => removeFiledFnc(i)}
                        className={cn(
                          " text-red-400 hover:text-red-500 text-center rounded-md flex-shrink  p-1  hover:bg-slate-200 ",
                          filedsArr.length === 1 && "hidden"
                        )}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </>
                ))}
            </div>
            <Button
              type="button"
              variant={"ghost"}
              disabled={isSubmitting}
              className={cn(
                " text-white text-2xl text-center rounded-md  mt-1 w-full bg-slate-400 hover:bg-slate-500 "
              )}
              onClick={addFiledFnc}
            >
              {btnName}
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
