"use client";
import HeroAcountSection from "../_components/hero-acount-section";
import { useState } from "react";
import { signIn } from "next-auth/react";
import FormInputs from "../_components/form-inputs";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  async function onSubmit({
    values,
  }: {
    values: { password: string; email: string };
  }) {
    try {
      setIsLoading(true);
      setIsError(false);
      await signIn("credentials", { ...values, callbackUrl: "/" });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <HeroAcountSection />
      <FormInputs onSubmit={onSubmit} isLoading={isLoading} isError={isError} />
    </>
  );
}
