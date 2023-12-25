import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PenBox, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-menubar";

import { cn } from "@/lib/utils";
import formatPrice from "@/utils/format/format-price";
import { Field } from "./add-product-form";

interface ExtraPriceItemsProps {
  accordLabelName: string;
  labelName: { label: string; price: string };
  data: Field[];
  isSubmitting: boolean;
  onRemove: (i: number) => void;
  onEdit: () => void;
}
export default function ExtraPriceItems({
  accordLabelName,
  labelName,
  data,
  isSubmitting,
  onRemove,
  onEdit,
}: ExtraPriceItemsProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1 ">
        <AccordionTrigger className="text-slate-900 text-[19px] px-2">
          {accordLabelName} / {data.length}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col items-center ">
            <Separator className="h-[1px] w-full bg-slate-200" />
            <div className="flex items-center justify-between w-full text-[20px] py-4 px-1">
              <div className="flex items-center w-full">
                <span className="w-[50%]">{labelName.label}</span>
                <span>Extra price</span>
              </div>
              <span>Actions</span>
            </div>
            <Separator className="h-[1px] w-full bg-slate-200" />
            {data.length > 0 ? (
              data.map((el, i) => (
                <>
                  <div
                    key={i}
                    className={cn(
                      i! % 2 === 1 && "bg-slate-200",
                      "flex items-center gap-2 p-2 w-full"
                    )}
                  >
                    <div className="flex items-center flex-grow text-[18px]">
                      <span className="w-[50%]"> {el.name}</span>
                      <span>{formatPrice(el.extra_price)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant={"ghost"}
                        disabled={isSubmitting}
                        className={cn(
                          " text-sky-400 hover:text-sky-500 text-center rounded-md flex-shrink  p-1  hover:bg-slate-200 "
                        )}
                      >
                        <PenBox className="h-5 w-5" />
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
                </>
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
