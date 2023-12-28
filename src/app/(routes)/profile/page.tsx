"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import EditProfileForm from "./_components/edit-profile-form";
import AdminMenuBar from "../../../components/admin/admin-menu-bar";

export default function EditProfilePage() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/");
  }

  return (
    <section className="sm:w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
      <AdminMenuBar path={"profile"} />
      <EditProfileForm />
    </section>
  );
}
