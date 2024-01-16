"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DataTable } from "./table-orders";
import { getUsers } from "@/lib/RTK/slices/users-slice";
import { getOrders } from "@/lib/RTK/slices/orders-slice";
import useProfile from "@/hooks/user-profile";
import NoData from "../../_comonents/no-data";

export default function AllOrders() {
  const session = useSession();
  const { orders, loading } = useAppSelector((state) => state.ordersData);
  const dispatch = useAppDispatch();
  const { data } = useProfile();
  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        dispatch(getOrders());
      }
    }
    getData();
  }, [dispatch, session.status]);
  const isAdmin = data?.admin;
  return (
    <section>
      {orders?.length &&
        (data?.admin ? (
          <DataTable data={orders} tableLoading={loading} isAdmin={isAdmin} />
        ) : (
          <NoData pageName="orders" />
        ))}
    </section>
  );
}
