"use client";
import HeroAcountSection from "../_components/hero-acount-section";
import { signIn, useSession } from "next-auth/react";
import FormInputs from "../_components/form-inputs";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function onSubmit(values: { password: string; email: string }) {
    await signIn("credentials", {
      ...values,
      redirect: true,
      callbackUrl: "/",
    });
  }
  const session = useSession();
  if (session.status === "authenticated") {
    return redirect("/");
  }
  console.log("session", session);
  return (
    <>
      <HeroAcountSection />
      <FormInputs onSubmit={onSubmit} />
    </>
  );
}
