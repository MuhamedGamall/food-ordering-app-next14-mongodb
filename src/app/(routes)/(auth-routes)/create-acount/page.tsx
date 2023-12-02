"use client";
import HeroAcountSection from "../_components/hero-acount-section";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CreateAcountForm from "../_components/create-acount-form";

export default function CreateAcountPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  if (session.status === "authenticated") {
    redirect("/");
  }
  async function onSubmit(values: { password: string; email: string }) {
    try {
      setIsError(false);
      await axios.post("/api/create-acount", values);
      toast.success("Acount created");
      router.replace("/log-in");
    } catch (error: any) {
      error.response.status === 401 ? setIsError(true) : setIsError(false);
    }
  }
  return (
    <>
      <HeroAcountSection />
      <CreateAcountForm onSubmit={onSubmit} isError={isError} />
    </>
  );
}
