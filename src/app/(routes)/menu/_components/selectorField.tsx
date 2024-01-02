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

import { ExtraPriceState, InitProductState } from "../../../../../types";
import { ExtraPricesFields } from "../category/[id]/(product)/[productId]/page";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import formatPrice from "@/utils/format/format-price";
import { Label } from "@/components/ui/label";
interface SelectFieldProps {
  extraPricesFields: ExtraPricesFields;
  setExtraPricesFields: Dispatch<SetStateAction<ExtraPricesFields>>;
  data: InitProductState | undefined;
}
export default function SelectorField({
  extraPricesFields,
  setExtraPricesFields,
  data,
}: SelectFieldProps) {
  const sizes: ExtraPriceState[] = data?.sizes || [];
  const increases: ExtraPriceState[] = data?.extra_increases_price || [];
  const defaultSize = sizes.find((_, i) => i === 0);

  const [sizeValue, setSizeValue] = useState<ExtraPriceState>({
    name: defaultSize?.name || "",
    extra_price: defaultSize?.extra_price || "",
  });

  const [quantityValue, setQuantityValue] = useState("1");
  const [increasesValue, setIncreasesValue] = useState<ExtraPriceState[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setExtraPricesFields({
      size: sizeValue,
      extra_increases_price: increasesValue,
      quantity: quantityValue,
    });
  }, [increasesValue, quantityValue, setExtraPricesFields, sizeValue]);

  useEffect(() => {
    setSizeValue({
      name: defaultSize?.name || "",
      extra_price: defaultSize?.extra_price || "",
    });
  }, [defaultSize]);

  const increasesPlaceholder = increasesValue.map((el) => el?.name).join(", ");

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-[3] ">
          <Select open={open} onOpenChange={setOpen}>
            <SelectTrigger aria-expanded={open}>
              <SelectValue placeholder={sizeValue?.name || "Select a size"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>SIZES</SelectLabel>
                {sizes.map((el: ExtraPriceState, i) => (
                  <div
                    key={el.name}
                    className="flex items-center w-full  hover:bg-slate-100 transition-all  rounded-md cursor-default"
                  >
                    <Check
                      className={cn(
                        " h-4 w-4 ml-2",
                        el.name === sizeValue?.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div
                      onClick={() => {
                        setSizeValue(el);
                        setOpen(false);
                      }}
                      className="pl-1 pr-3 py-2 w-full flex items-center justify-between gap-2 whitespace-nowrap"
                    >
                      {el.name}
                      <p>{formatPrice(el.extra_price)}</p>
                    </div>
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
            <SelectValue
              placeholder={increasesPlaceholder || "Select a increases"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>INCREASES</SelectLabel>
              {increases.map((el: ExtraPriceState, i) => (
                <div
                  key={el.name}
                  className="hover:bg-slate-100 w-full  transition-all  rounded-md "
                >
                  <Label className=" px-3 flex items-center justify-between gap-2 whitespace-nowrap ">
                    <div className="flex items-center gap-2 ">
                      <Input
                        type="checkbox"
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
                    </div>
                    +{formatPrice(el.extra_price)}
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
