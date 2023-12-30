"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProductForm from "./_components/products-form";
import useProfile from "@/hooks/user-profile";

export default function EditProfilePage() {
  const { data } = useProfile();
  const session = useSession();
  if (session.status === "unauthenticated" && !data && !data?.admin) {
    redirect("/");
  }
  return (
    <section className="">
      <ProductForm />
    </section>
  );
}
