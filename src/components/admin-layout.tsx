"use client";
import Sidebar from "@/app/dashboard/_components/sidebar";
import SidebarSheet from "@/app/dashboard/_components/sidebar-sheet";
import { cn } from "@/lib/utils";
import React from "react";
import Navbar from "./navbar";
import useProfile from "@/hooks/user-profile";

export default function Admin_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useProfile();
  return (
    <div>
      {data?.admin ? (
        <>
          <div className="md:block hidden">
            <Sidebar />
          </div>
          <SidebarSheet />
          <div className={"md:pl-[300px] pl-0"}>
            <Navbar />
            {children}
          </div>
        </>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </div>
  );
}
