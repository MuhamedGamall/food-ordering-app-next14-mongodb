"use client";
import AdminMenuBar from "@/components/admin/admin-menu-bar";
import useProfile from "@/hooks/user-profile";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="sm:w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
      <AdminMenuBar path={pathname} />
      {children}
    </div>
  );
}
