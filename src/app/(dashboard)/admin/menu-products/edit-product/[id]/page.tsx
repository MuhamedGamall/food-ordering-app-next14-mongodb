"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import useProfile from "@/hooks/user-profile";

import HandleLoader from "@/components/loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { editProduct, getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import ImageForm from "@/components/image-form";
import { useSession } from "next-auth/react";
import EditProductForm from "../_components/edit-product-form";
import { redirect, useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { ExtraPricesValues } from "../../_components/products-form";
import Link from "next/link";
import { ExtraPriceState } from "../../../../../../../types";

export default function ProductForm({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data } = useProfile();
  const { products, loading } = useAppSelector((state) => state.menuProducts);

  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extraPricesValues, setExtraPricesValues] = useState<ExtraPricesValues>(
    { sizes: [], extra_increases_price: [] }
  );
  const email = data?.email;

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        await dispatch(getProducts());
      }
    }
    getData();
  }, [dispatch, session.status]);

  const product = products.filter((el) => el._id === id)[0]
  // if (products.length === 0 || !product) {
  //   return redirect("/admin/menu-products");
  // }

  // if (session.status === "unauthenticated" || !data?.admin) {
  //   redirect("/");
  // }

  const EditCurrentImage =
    image64 || product?.image || "/product-placeholder/th.jpeg";
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  const validateExtraPricesValues = (array: ExtraPriceState[]) =>
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
      Object.values({ value, image64 }).some(Boolean) &&
      sizesExtraPricesValuesCheck &&
      increasesExtraPricesValuesCheck
    ) {
      setIsSubmitting(true);
      const filteredData = Object.fromEntries(
        Object.entries(value).filter(([key, value]) => value !== "")
      );
      const data =
        image64 &&
        (await dispatch(
          uploadImage({
            image64: image64,
            publicId: email,
            folderName: "food-ordering-products",
          })
        ));

      const imageURL = (await data?.payload) || product?.image;
      const values = {
        ...extraPricesValues,
        ...filteredData,
        ...(imageURL && { image: imageURL }),
        _id: id,
      };
      await dispatch(editProduct(values));
      setIsSubmitting(false);
    } else {
      toast.error("Please fill all fields");
    }
  }

  return (
    <>
      <div className="">
        <div className="relative z-50 mx-auto   max-w-full md:max-w-[80%]">
          {(loading || isSubmitting) && <HandleLoader />}
          <Link
            href={"/admin/menu-products"}
            className="cursor-pointer flex items-center gap-3 text-slate-800 ext-[19px]"
          >
            <MoveLeft /> Back to menu products
          </Link>
          <div className="space-y-2 ">
            <h1 className="text-[50px]">Edit product</h1>
          </div>
          <div>
            <div className="flex gap-5 sm:flex-nowrap flex-wrap">
              <ImageForm
                image64={image64}
                setImage64={setImage64}
                currentImage={EditCurrentImage}
                isSubmitting={isSubmitting}
              />
              <EditProductForm
                onSubmit={onSubmit}
                product={product || undefined}
                imageURL64={image64}
                setExtraPricesValues={setExtraPricesValues}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
