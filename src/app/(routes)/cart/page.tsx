"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import {
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getCart,
} from "@/lib/RTK/slices/cart-slice";

import React, { useEffect, useState } from "react";
import ProductsChoiced from "../_comonents/products-choiced";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CartCheckout from "./_components/cart-checkout";
import toast from "react-hot-toast";
import NoData from "../_comonents/no-data";
import PageHeader from "@/components/page-header";
import { DeleteConfirm } from "../../../components/delete-confirm";
import Banner from "@/components/banner";
import { MessageSquare, XCircle } from "lucide-react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart, loading } = useAppSelector((state) => state.productsCart);
  const { products } = useAppSelector((state) => state.menuProducts);
  const [close, setClose] = useState(false);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);

  const removeAllItems = () => {
    dispatch(deleteAllProductsFromCart());
    toast.success("All products is removed");
    return router.replace("/menu/category/_");
  };

  // const filterCart = cart.filter(
  //   (el: any) => !products.some((xl) => el?.product_id === xl?._id)
  // );


  // if (filterCart.length > 0) {
  //   filterCart.forEach((el: any) =>
  //     dispatch(deleteProductFromCart(el?.product_id))
  //   );
  // }
  const removeItem = (id: string) => {
    if (cart?.length) {
      id && dispatch(deleteProductFromCart(id));
    } else return router.replace("/menu/category/_");
  };

  return (
    <section className=" mx-auto px-4 my-5 relative">
      <div className=" md:max-w-[90%] mx-auto">
        {cart?.length == 0 ? (
          <>
            <PageHeader title="YOUR CART" />
            {/* {!close && (
              <div className="my-5 relative">
                {filterCart.length > 0 && (
                  <Banner
                    label=" We regret to inform you that some products have been removed due to unavailability. We apologize for any inconvenience and encourage you to stay tuned for upcoming offers. "
                    icon={MessageSquare}
                    color="black"
                    bgColor="slate"
                    iconSize={"w-10 h-10"}
                  />
                )}
                <XCircle
                  className="w-6 h-6 absolute top-3 right-3 cursor-pointer"
                  color="gray"
                  onClick={() => setClose(true)}
                />
              </div>
            )} */}
            <div className="flex gap-8  sm:flex-row flex-col justify-start ">
              <div className="flex-[4.5] w-full flex sm:block sm:flex-row flex-col-reverse">
                <ProductsChoiced
                  onDelete={removeItem}
                  loading={loading}
                  data={cart}
                />
                <DeleteConfirm
                  title="Are you sure to delete all products"
                  onDelete={removeAllItems}
                >
                  <Button
                    variant={"ghost"}
                    className="hover:text-sky-950 text-[#2d5d2a] underline transition sm:my-5 mb-2 ml-auto"
                    disabled={loading}
                  >
                    Remove all items
                  </Button>
                </DeleteConfirm>
              </div>
              <CartCheckout cart={cart} />
            </div>
          </>
        ) : (
          <NoData pageName="cart" />
        )}
      </div>
    </section>
  );
}
