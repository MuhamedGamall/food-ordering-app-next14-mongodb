import React, { Dispatch, SetStateAction, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PenBox, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-menubar";

import { cn } from "@/lib/utils";
import formatPrice from "@/utils/format/format-price";
import { ExtraPriceState } from "../../../../../../types";

interface ExtraPriceItemsProps {
  accordLabelName: string;
  labelName: { label: string; price: string };
  data: ExtraPriceState[];
  isSubmitting: boolean;
  setData: Dispatch<SetStateAction<any>>;
  setIsEditMood: Dispatch<SetStateAction<boolean>>;
  setValues: Dispatch<SetStateAction<any>>;
  setEditItemIdx: Dispatch<SetStateAction<string>>;
  editItemIdx: string;
  isEditMood: boolean;
}
export default function ExtraPriceItems({
  accordLabelName,
  labelName,
  data,
  isSubmitting,
  setData,
  setIsEditMood,
  setValues,
  setEditItemIdx,
  editItemIdx,
  isEditMood,
}: ExtraPriceItemsProps) {
  const checkItem = (i: number) => isEditMood && i === +editItemIdx;
  const onRemove = (idx: number) => {
    if (isEditMood) {
      setValues({
        name: "",
        extra_price: "",
      });
      setIsEditMood(false);
    }
    setData((curr: ExtraPriceState[]) => curr.filter((_, i) => i !== idx));
  };
  const onEdit = (idx: number) => {
    if (!isEditMood) {
      const fieldChoiced = data?.find((_, i) => i === idx);
      setIsEditMood(true);
      setValues({
        name: fieldChoiced?.name || "",
        extra_price: fieldChoiced?.extra_price || "",
      });
      setEditItemIdx(`${idx}`);
    } else {
      if (idx === +editItemIdx) {
        setIsEditMood(false);
        setValues({
          name: "",
          extra_price: "",
        });
        setEditItemIdx("");
      }
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1 ">
        <AccordionTrigger className="text-slate-900 text-[19px] px-2">
          {accordLabelName} ({data.length})
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col items-center ">
            <Separator className="h-[1px] w-full bg-slate-200" />
            <div className="flex items-center justify-between w-full text-[20px] py-4 px-1">
              <div className="flex items-center w-full">
                <span className="w-[50%] ">{labelName.label}</span>
                <span>Extra price</span>
              </div>
              <span>Actions</span>
            </div>
            <Separator className="h-[1px] w-full bg-slate-200" />
            {data.length > 0 ? (
              data.map((el, i) => (
                <div
                  key={i}
                  className={cn(
                    i! % 2 === 1 && "bg-slate-200",
                    checkItem(i) && "bg-sky-100 shadow-md ",
                    "flex items-center gap-2 mb-1 p-2 w-full hover:bg-sky-100 transition"
                  )}
                >
                  <div className="flex items-center flex-grow text-[18px] gap-2">
                    <span className="w-[50%] min-w-[90px] overflow-x-auto whitespace-nowrap py-1">
                      {el.name}
                    </span>
                    <span className=" min-w-[90px] overflow-x-auto whitespace-nowrap py-1">
                      {formatPrice(el.extra_price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant={"ghost"}
                      disabled={isSubmitting}
                      onClick={() => {
                        onEdit(i);
                      }}
                      className={cn(
                        " text-sky-500 hover:text-sky-600 text-center rounded-md flex-shrink  p-1  hover:bg-slate-200 "
                      )}
                    >
                      {checkItem(i) ? (
                        <Undo2 className="h-5 w-5" />
                      ) : (
                        <PenBox className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant={"ghost"}
                      disabled={isSubmitting}
                      onClick={() => onRemove(i)}
                      className={cn(
                        " text-red-400 hover:text-red-500 text-center rounded-md flex-shrink  p-1  hover:bg-slate-200 "
                      )}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-center p-3">No result.</span>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
