"use client";
import useProfile from "@/hooks/user-profile";
import AdminMenuBarItems from "./admin-menu-bar-items";

const AdminMenuBarRoutes: { title: string; href: string }[] = [
  {
    title: "Categories",
    href: "/dashboard/categories",
  },
  {
    title: "Menu products",
    href: "/dashboard/menu-products",
  },
  {
    title: "Orders",
    href: "/orders",
  },
  {
    title: "Users",
    href: "/dashboard/users",
  },
];
export default function AdminMenuBar() {
  const { data } = useProfile();

  return (
    data &&
    data?.admin && <AdminMenuBarItems routes={AdminMenuBarRoutes}  />
  );
}
