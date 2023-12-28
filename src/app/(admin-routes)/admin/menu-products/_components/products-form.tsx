"use client";

import toast from "react-hot-toast";
import { useState } from "react";

import useProfile from "@/hooks/user-profile";

import HandleLoader from "@/components/loader";
import AddProductForm from "./add-product-form";
import { useAppDispatch } from "@/hooks/redux";
import { postProduct } from "@/lib/RTK/slices/menu-products-slice";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import ImageForm from "@/components/image-form";
import AllProducts from "./all-products-table";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Field } from "./extra-price-field";
export interface ExtraPricesValues {
  sizes: Field[];
  extra_increases_price: Field[];
}
export default function ProductForm() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { loading, data } = useProfile();

  const [extraPricesValues, setExtraPricesValues] = useState<ExtraPricesValues>(
    { sizes: [], extra_increases_price: [] }
  );
  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddMood, setIsAddMood] = useState(false);

  const email = data?.email;

  const AddCurrentImage = image64 || "/product-placeholder/th.jpeg";
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  const validateExtraPricesValues = (array: Field[]) =>
    array.every(
      (el) =>
        el.name.trim().length > 0 &&
        el.name.trim().length <= 30 &&
        el.extra_price.trim() >= "0" &&
        priceRegex.test(el.extra_price)
    );

  const sizesExtraPricesValuesCheck =
    extraPricesValues.sizes.length &&
    validateExtraPricesValues(extraPricesValues.sizes);
  const increasesExtraPricesValuesCheck = validateExtraPricesValues(
    extraPricesValues.extra_increases_price
  );
  async function onSubmit(value: any) {
    if (
      Object.values({ value, image64 }).every(Boolean) &&
      sizesExtraPricesValuesCheck &&
      increasesExtraPricesValuesCheck
    ) {
      setIsSubmitting(true);
      const data = await dispatch(
        uploadImage({
          image64,
          publicId: email,
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
      <div className="">
        <div className=" relative mx-auto  max-w-full md:max-w-[80%] ">
          {(loading || isSubmitting) && <HandleLoader />}
          <div className="space-y-2 ">
            <h1 className="text-[50px]">Menu products</h1>
          </div>
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
              <div className="flex justify-center gap-5 sm:flex-nowrap flex-wrap">
                <ImageForm
                  image64={image64}
                  setImage64={setImage64}
                  currentImage={AddCurrentImage}
                  isSubmitting={isSubmitting}
                />
                <AddProductForm
                  onSubmit={onSubmit}
                  setExtraPricesValues={setExtraPricesValues}
                />
              </div>
            )}
            <AllProducts />
          </div>
        </div>
      </div>
    </>
  );
}
