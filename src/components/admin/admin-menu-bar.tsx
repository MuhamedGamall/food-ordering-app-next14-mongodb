"use client";
import useProfile from "@/hooks/user-profile";
import AdminMenuBarItems from "./admin-menu-bar-items";

const AdminMenuBarRoutes: { title: string; href: string }[] = [
  {
    title: "Categories",
    href: "/admin/categories",
  },
  {
    title: "Menu products",
    href: "/admin/menu-products",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
];
export default function AdminMenuBar() {
  const { data } = useProfile();

  return (
    data &&
    data?.admin && <AdminMenuBarItems routes={AdminMenuBarRoutes}  />
  );
}
