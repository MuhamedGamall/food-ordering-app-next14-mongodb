"use client";

import toast from "react-hot-toast";
import { useState } from "react";

import HandleLoader from "@/components/loader";
import AddProductForm from "./add-product-form";
import { useAppDispatch } from "@/hooks/redux";
import { postProduct } from "@/lib/RTK/slices/menu-products-slice";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import ImageForm from "@/components/image-form";
import AllProducts from "./all-products-table";

import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { ExtraPriceState } from "../../../../../types";
import SectionHeader from "@/components/section-header";

export interface ExtraPricesValues {
  sizes: ExtraPriceState[];
  extra_increases_price: ExtraPriceState[];
}
export default function ProductForm() {
  const dispatch = useAppDispatch();

  const [extraPricesValues, setExtraPricesValues] = useState<ExtraPricesValues>(
    { sizes: [], extra_increases_price: [] }
  );
  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddMood, setIsAddMood] = useState(false);

  const AddCurrentImage = image64 || "/product-placeholder/th.jpeg";


  async function onSubmit(value: any) {
    if (
      Object.values({ value, image64 }).every(Boolean)
    ) {
      setIsSubmitting(true);
      const data = await dispatch(
        uploadImage({
          image64,
          publicId: "product",
          folderName: "food-ordering-products",
        })
      );
      const imageURL = await data?.payload;
      const values = {
        ...extraPricesValues,
        ...value,
        ...(imageURL && { image: imageURL }),
      };
      await dispatch(postProduct(values));
      setIsSubmitting(false);
    } else {
      toast.error("Please fill all fields");
    }
  }
  return (
    <>
      <div className=" relative mx-auto px-10">
        {isSubmitting && <HandleLoader />}
        <SectionHeader title={"MENU PRODUCTS"} className="my-5" />
        <div className="w-full">
          <Button
            onClick={() => {
              setImage64("");
              setIsAddMood((cur) => !cur);
            }}
            className="flex items-center gap-2 ml-auto text-[18px]"
          >
            {!isAddMood ? (
              <>
                <PlusCircle /> Open add product mood
              </>
            ) : (
              <>
                <MinusCircle /> Close add product mood
              </>
            )}
          </Button>
          {isAddMood && (
            <div className="flex justify-center gap-5 sm:flex-nowrap flex-wrap my-5">
              <div className="w-[250px] ">
                <ImageForm
                  image64={image64}
                  setImage64={setImage64}
                  currentImage={AddCurrentImage}
                  isSubmitting={isSubmitting}
                />
              </div>
              <AddProductForm
                onSubmit={onSubmit}
                setExtraPricesValues={setExtraPricesValues}
              />
            </div>
          )}
          <AllProducts />
        </div>
      </div>
    </>
  );
}
