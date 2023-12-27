"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import useProfile from "@/hooks/user-profile";

import { useRouter } from "next/navigation";
import HandleLoader from "@/components/loader";
import AddProductForm from "./add-product-form";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  editProduct,
  getProducts,
  postProduct,
} from "@/lib/RTK/slices/menu-products-slice";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import ImageForm from "@/components/image-form";
import AllProducts from "./all-products-form";
import formatPrice from "@/utils/format/format-price";
import EditProductForm from "../edit-product/_components/edit-product-form";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Minus,
  MinusCircle,
  Plus,
  PlusCircle,
} from "lucide-react";
import { Field } from "./extra-price-field";

export default function ProductForm() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { loading, data } = useProfile();

  const [extraPricesValues, setExtraPricesValues] = useState<any>({});
  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddMood, setIsAddMood] = useState(false);

  const email = data?.email;

  const AddCurrentImage = image64 || "/product-placeholder/th.jpeg";

  async function onSubmit(value: any) {
    if (Object.values({ value, image64 }).every((el) => !!el)) {
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
              onClick={() => setIsAddMood((cur) => !cur)}
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
