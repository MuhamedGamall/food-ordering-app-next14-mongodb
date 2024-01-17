"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteAllProductsFromCart } from "@/lib/RTK/slices/cart-slice";
import { useEffect } from "react";
import ProductsChoiced from "../../_comonents/products-choiced";
import { getOrder } from "@/lib/RTK/slices/orders-slice";
import formatPrice from "@/utils/format/format-price";
import totalCartPrice from "@/utils/total-cart-price";
import DeliveryDetails from "../../cart/_components/delivery-details";
import { CheckCircle2, MoveLeft, XCircle } from "lucide-react";
import PageHeader from "@/components/page-header";
import Link from "next/link";
import HandleLoader from "@/components/loader";

export default function OrderPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  const dispatch = useAppDispatch();
  const { order, loading } = useAppSelector((state) => state.ordersData);

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

  const { totalPrice } = totalCartPrice(order?.cart);
  return (
    <section className=" mx-auto px-4 max-w-[80rem] my-5 relative">
      {loading && <HandleLoader />}
      <div className=" md:max-w-[90%] mx-auto">
        <Link
          href={"/orders"}
          className="cursor-pointer flex items-center gap-3 text-slate-800 text-[19px]"
        >
          <MoveLeft /> Back to oredrs table
        </Link>
        <PageHeader title="ORDER" />
        <div className="flex gap-8  md:flex-row flex-col justify-start ">
          <div className="flex-[2.5]  w-full">
            <ProductsChoiced data={order?.cart} />
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
    </section>
  );
}
