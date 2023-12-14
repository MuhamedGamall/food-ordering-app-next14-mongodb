"use client";
import useProfile from "@/hooks/user-profile";
import AdminMenuBarItems from "./admin-menu-bar-items";

const AdminMenuBarRoutes: { title: string; href: string }[] = [
  {
    title: "Categories",
    href: "/admin/categories",
  },
  {
    title: "Menu items",
    href: "/admin/menu-items",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
];
export default function AdminMenuBar({ path }: { path: string }) {
  const { data } = useProfile();

  return (
    data &&
    data?.admin && <AdminMenuBarItems routes={AdminMenuBarRoutes} path={path} />
  );
}
