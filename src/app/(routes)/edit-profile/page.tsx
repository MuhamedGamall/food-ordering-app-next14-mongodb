"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import EditProfileForm from "./_components/edit-profile-form";

export default function EditProfilePage() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/");
  }

  return (
    <section>
      <EditProfileForm />
    </section>
  );
}
