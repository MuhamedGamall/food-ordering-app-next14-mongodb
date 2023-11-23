"use client";
import HeroAcountSection from "../_components/hero-acount-section";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import FormInputs from "../_components/form-inputs";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateAcountPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  if (session.status === "authenticated") {
    return redirect("/");
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
      <FormInputs onSubmit={onSubmit} isError={isError} />
    </>
  );
}
