"use client";

import useProfile from "@/hooks/user-profile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function UsersPage() {
  const { data } = useProfile();
  const session = useSession();
  if (session.status === "unauthenticated" && !data && !data?.admin) {
    redirect("/");
  }
  return <section></section>;
}