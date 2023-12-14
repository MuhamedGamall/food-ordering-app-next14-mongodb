"use client";

import useProfile from "@/hooks/user-profile";
import { redirect } from "next/navigation";
import React from "react";
import CategoriesForm from "./_components/categories-form";
import { useSession } from "next-auth/react";

export default function CategoriesPage() {
  const { data } = useProfile();
  const session = useSession();
  if (session.status === "unauthenticated" && !data && !data?.admin) {
    redirect("/");
  }

  console.log(session);

  return (
    <section>
      <CategoriesForm />
    </section>
  );
}
