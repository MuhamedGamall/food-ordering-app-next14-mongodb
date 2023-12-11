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
  // if (performance.navigation.type === 1) {
  //   console.log("Page reloaded");
  // } else {
  //   console.log("Page not reloaded");
  // }
  
  return (
    <section>
      <EditProfileForm />
    </section>
  );
}
 