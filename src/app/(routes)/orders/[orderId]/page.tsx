"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteAllProductsFromCart } from "@/lib/RTK/slices/cart-slice";
import { useEffect } from "react";
import CartList from "../../_comonents/cart-list";
import { redirect } from "next/navigation";
import { getOrder } from "@/lib/RTK/slices/orders-slice";
import formatPrice from "@/utils/format/format-price";
import totalCartPrice from "@/utils/total-cart-price";
import DeliveryDetails from "../../cart/_components/delivery-details";
import { CheckCircle2, XCircle } from "lucide-react";

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
            <span className="flex justify-end gap-10 text-[25px]">
              <p className="flex items-center  gap-2 text-[18px]">
                {order?.paid ? (
                  <CheckCircle2 color="green" width={18} />
                ) : (
                  <XCircle color="red" width={18} />
                )}
                {order?.paid ? "payment was made" : "payment is not paid yet"}
              </p>
              Total: {formatPrice(totalPrice)}
            </span>
          </div>
          <section className="flex  flex-col gap-3 flex-[1] ">
            <DeliveryDetails order={order} />
          </section>
        </div>
      </div>
    </main>
  );
}
