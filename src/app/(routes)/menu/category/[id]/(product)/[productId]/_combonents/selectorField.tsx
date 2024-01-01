import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ExtraPriceState,
  InitProductState,
} from "../../../../../../../../../types";
import { ExtraPricesFields } from "../page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
interface SelectFieldProps {
  extraPricesFields: ExtraPricesFields;
  setExtraPricesFields: Dispatch<SetStateAction<ExtraPricesFields>>;
  data: InitProductState | undefined;
  loading: boolean;
}
export default function SelectorField({
  extraPricesFields,
  setExtraPricesFields,
  data,
  loading,
}: SelectFieldProps) {
  const [sizeValue, setSizeValue] = useState<ExtraPriceState | null>(null);
  const [quantityValue, setQuantityValue] = useState("");
  const [increasesValue, setIncreasesValue] = useState<ExtraPriceState[]>([]);
  const [open, setOpen] = useState(false);
  const sizes = data?.sizes || [];
  const inceases = data?.extra_increases_price || [];

  useEffect(() => {
    console.log({ increasesValue, quantityValue, sizeValue });
    setExtraPricesFields({
      size: sizeValue,
      extra_increases_price: increasesValue,
      quantity: quantityValue,
    });
  }, [increasesValue, quantityValue, setExtraPricesFields, sizeValue]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-[3] ">
          <Select open={open} onOpenChange={setOpen}>
            <SelectTrigger aria-expanded={open}>
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent className="max-w-[300px]">
              <SelectGroup>
                <SelectLabel>SIZES</SelectLabel>
                {sizes.map((el: ExtraPriceState, i) => (
                  <div
                    key={el.name}
                    className="flex items-center  hover:bg-slate-100 overflow-x-auto transition-all  rounded-md cursor-default"
                  >
                    <Check
                      className={cn(
                        " h-4 w-4 ml-2",
                        el.name === sizeValue?.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <option
                      value={el.name}
                      onClick={() => {
                        setSizeValue(el);
                        setOpen(false);
                      }}
                      className="  pl-1 pr-3 py-2 flex items-center gap-2 w-fit whitespace-nowrap "
                    >
                      {el.name}
                    </option>
                  </div>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-[1]">
          <Select onValueChange={(v) => setQuantityValue(v)}>
            <SelectTrigger>
              <SelectValue placeholder="quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>QUANTITY</SelectLabel>
                {Array.from({ length: 25 }).map((_, i) => (
                  <SelectItem
                    value={i + 1 + ""}
                    key={i + 1}
                    onSelect={() => setQuantityValue(i + 1 + "")}
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a increases" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>INCREASES</SelectLabel>
              <div></div>
              {inceases.map((el: ExtraPriceState, i) => (
                <div
                  key={el.name}
                  className="hover:bg-slate-100  transition-all  rounded-md "
                >
                  <Label className=" px-3 flex items-center gap-2 w-fit whitespace-nowrap">
                    <Input
                      type="checkbox"
                      disabled={loading}
                      className=""
                      checked={increasesValue.includes(el)}
                      onChange={() =>
                        setIncreasesValue((curr) => {
                          return curr.includes(el)
                            ? curr.filter((item) => item !== el)
                            : [...curr, el];
                        })
                      }
                    />
                    {el.name}
                  </Label>
                </div>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
