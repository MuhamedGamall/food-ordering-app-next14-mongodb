"use client";
import HeroAcountSection from "../_components/hero-acount-section";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LogInForm from "../_components/log-in-form";

export default function LoginPage() {
  async function onSubmit(values: { password: string; email: string }) {
    await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/",
    });
  }
  const session = useSession();

  if (session.status === "authenticated") {
    redirect("/");
  }
  return (
    <>
      <HeroAcountSection />
      <LogInForm onSubmit={onSubmit} />
    </>
  );
}
