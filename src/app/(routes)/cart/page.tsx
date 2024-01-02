"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { getCart } from "@/lib/RTK/slices/products-cart";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function CartPage() {
  const { cart } = useAppSelector((state) => state.productsCart);
  const { products } = useAppSelector((state) => state.menuProducts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);
  const cartProducts = products.filter((el) =>
    cart.some((xl: any) => el._id === xl.product_id)
  );

  console.log(cartProducts);

  return (
    <main className="flex gap-8 items-center sm:flex-row flex-col">
      <h2>YOUR CART</h2>
      <section className="flex-[3]">
        <ul className="flex flex-col  gap-2 border-t ">
          {cartProducts.map((el: any) => (
            <li key={el._id} className="flex items-center gap-2 border-b">
              <Image
                src={el?.image}
                alt="cart image"
                width={200}
                height={200}
                className="w-[80px] rounded-md"
              />
              <div className=" flex flex-col gap-2">
                <h5>{el?.title}</h5>
                <ul className=" flex items-center  gap-2">
                  <li>
                    <Link href={'/menu/category/'}>
                    
                    </Link>
                  </li>
                  <li></li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex-1">subtotal</section>
    </main>
  );
}
