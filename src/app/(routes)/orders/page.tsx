import AdminMenuBar from "@/components/admin/admin-menu-bar";
import AllOrders from "./_components/all-orders-table";

export default function OrdersPage() {
  return (
    <main className="sm:w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
      <AdminMenuBar />
      <AllOrders />
    </main>
  );
}
