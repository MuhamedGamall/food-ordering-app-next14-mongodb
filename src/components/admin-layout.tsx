"use client";
import Sidebar from "@/app/dashboard/_components/sidebar";
import SidebarSheet from "@/app/dashboard/_components/sidebar-sheet";
import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import Navbar from "./navbar";
import useProfile from "@/hooks/user-profile";

export default function Admin_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useProfile();
  return (
    <main>
      {data?.admin ? (
        <>
          <div className="lg:flex block">
            <div className="lg:block hidden">
              <Sidebar />
            </div>

            <SidebarSheet />
            <div className="pl-0  lg:w-[calc(100%_-_300px)]">
              <Navbar />
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </main>
  );
}
