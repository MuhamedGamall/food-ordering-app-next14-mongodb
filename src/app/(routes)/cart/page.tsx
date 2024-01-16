"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import {
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getCart,
} from "@/lib/RTK/slices/cart-slice";

import React, { useEffect } from "react";
import ProductsChoiced from "../_comonents/products-choiced";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoveRight } from "lucide-react";
import CartCheckout from "./_components/cart-checkout";
import Link from "next/link";
import toast from "react-hot-toast";
import NoData from "../_comonents/no-data";
import PageHeader from "@/components/page-header";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart, loading: load } = useAppSelector((state) => state.productsCart);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);

  const removeAllItems = () => {
    dispatch(deleteAllProductsFromCart());
    toast.success("All products is removed");
    return router.replace("/menu/category/_");
  };

  // const isProductAvailable = cart.map((cartItem: any) =>
  //   products.find((el) => el._id === cartItem.product_id)
  // );

  // const isCartValid = isProductAvailable.every((product: any) => !!product);

  // if (!loading && !load) {
  //   if (!isCartValid) {
  //     dispatch(deleteAllProductsFromCart());
  //   }
  // }

  const removeItem = (id: string) => {
    if (cart?.length) {
      id && dispatch(deleteProductFromCart(id));
    } else return router.replace("/menu/category/_");
  };

  return (
    <main className=" mx-auto px-4 max-w-[80rem] my-5">
      <div className=" md:max-w-[90%] mx-auto">
        {cart?.length > 0 ? (
          <>
            <PageHeader title="YOUR CART" />
            <div className="flex gap-8  sm:flex-row flex-col justify-start ">
              <ProductsChoiced onDelete={removeItem} data={cart} />
              <CartCheckout cart={cart} />
            </div>
            <Button
              onClick={removeAllItems}
              variant={"ghost"}
              className="hover:text-sky-950 text-[#2d5d2a] underline transition my-5"
            >
              Remove all items
            </Button>
          </>
        ) : (
          <NoData pageName="cart" />
        )}
      </div>
    </main>
  );
}
