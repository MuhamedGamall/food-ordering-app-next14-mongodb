"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteAllProductsFromCart } from "@/lib/RTK/slices/cart-slice";
import { useEffect } from "react";
import CartList from "../../_comonents/cart-list";
import { redirect } from "next/navigation";
import { getOrder } from "@/lib/RTK/slices/orders-slice";
import formatPrice from "@/utils/format/format-price";
import totalCartPrice from "@/utils/total-cart-price";

export default function OrderPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.ordersData);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (location.href.includes("success=1")) {
        dispatch(deleteAllProductsFromCart());
      }
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);
  if (!order) {
    redirect("/menu/category/_");
  }
  const { totalPrice } = totalCartPrice(order?.cart);
  return (
    <main className=" mx-auto px-4 max-w-[80rem] my-5">
      <div className=" md:max-w-[90%] mx-auto">
        <h2 className="text-[45px] ">YOUR ORDER</h2>
        <div className="flex gap-8  md:flex-row flex-col justify-start ">
          <div className="flex-[2.5]  w-full">
            <CartList data={order?.cart} />
            <span className="text-right block text-[25px]">
              Total: {formatPrice(totalPrice)}
            </span>
          </div>
          <section className="flex  flex-col gap-3 flex-[1] ">
            <ul className="bg-slate-100 py-4 px-2  rounded-md text-[20px]">
              <h4 className="mb-3 text-[30px] w-full  bg-white text-slate-900 shadow-sm rounded-md text-center">
                Delivery details
              </h4>
              <li className="  border-b text-slate-600 border-slate-200  py-2">
                Email
                <p className="ml-3  text-slate-950  text-[25px]">{order?.email}</p>
              </li>
              <li className="  border-b text-slate-600  border-slate-200 py-2 ">
                Phone
                <p className=" ml-3 text-slate-950  text-[25px]">{order?.phone}</p>
              </li>
              <div className="flex items-center gap-2 flex-row md:flex-col w-full">
                <li className=" w-full  border-b text-slate-600  border-slate-200 py-2">
                  Street Address
                  <p className="ml-3 text-slate-950  text-[25px]">
                    {order?.street_address}
                  </p>
                </li>
                <li className="w-full  border-b text-slate-600  border-slate-200 py-2">
                  City
                  <p className= "ml-3 text-slate-950  text-[25px]">{order?.city}</p>
                </li>
              </div>
              <li className="border-b  text-slate-600 border-slate-200 py-2">
                Country
                <p className=" ml-3 text-slate-950 text-[25px]">{order?.country}</p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
