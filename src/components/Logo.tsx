import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Logo({
  color,
  size,
}: {
  color: string;
  size?: string;
}) {
  const src = color === "red" ? "/red-logo.svg" : "/white-logo.svg";
  return (
    <Image     loading="lazy" src={src} alt="logo" height={20} width={110} className={cn(size)} />
  );
}
