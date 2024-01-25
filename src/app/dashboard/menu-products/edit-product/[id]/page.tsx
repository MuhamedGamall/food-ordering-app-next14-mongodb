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
import { redirect } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { ExtraPricesValues } from "../../_components/products-form";
import Link from "next/link";

import SectionHeader from "@/components/section-header";

export default function ProductForm({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = useSession();

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
      await dispatch(getProducts());
    }
    getData();
  }, [dispatch, session.status]);

  const product = products.filter((el) => el._id === id)[0];

  if (product?._id !== id) {
    redirect("/dashboard/menu-products");
  }

  const EditCurrentImage =
    image64 || product?.image || "/product-placeholder/th.jpeg";

  async function onSubmit(value: any) {
    if (Object.values({ value, image64 }).some(Boolean)) {
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
        ...(extraPricesValues.sizes.length > 0 && extraPricesValues),
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
      <section className="relative  mx-auto  sm:w-[90%] max-w-[80rem] mt-5 p-5">
        {(loading || isSubmitting) && <HandleLoader />}
        <Link
          href={"/dashboard/menu-products"}
          className="cursor-pointer flex items-center gap-3 text-slate-800 ext-[19px]"
        >
          <MoveLeft /> Back to menu products
        </Link>
        <SectionHeader title={"EDIT PRODUCT"} className="my-5" />

        <div className="flex gap-5 my-5 md:justify-start justify-center sm:flex-nowrap flex-wrap">
          <div className="w-[250px] ">
            <ImageForm
              image64={image64}
              setImage64={setImage64}
              currentImage={EditCurrentImage}
              isSubmitting={isSubmitting}
            />
          </div>
          <EditProductForm
            onSubmit={onSubmit}
            product={product || undefined}
            imageURL64={image64}
            setExtraPricesValues={setExtraPricesValues}
          />
        </div>
      </section>
    </>
  );
}
