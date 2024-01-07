// 'use client'

import AllOrders from "./_components/all-orders-table";
import useProfile from "@/hooks/user-profile";

export default function OrdersPage() {
  // const {data} = useProfile()
  return (
    <main className="sm:w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
      <AllOrders />
    </main>
  );
}
