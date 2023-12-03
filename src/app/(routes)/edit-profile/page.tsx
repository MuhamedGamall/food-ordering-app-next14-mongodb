"use client";
import React from "react";
import EditProfileForm from "./_components/edit-profile-form";

import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";

export default function EditProfilePage() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/");
  }
  async function onSubmit(values: { usernaem: string }) {
    try {
      await axios.put("/api/edit-profile", values);
      toast.success("Username updated");
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <section>
      <EditProfileForm onSubmit={onSubmit} />
    </section>
  );
}
