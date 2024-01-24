import { cn } from "@/lib/utils";
import React from "react";

function SectionHeader({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sm:text-[45px] text-[35px] w-full font-bold text-left",
        className
      )}
    >
      {title}
      {children}
    </header>
  );
}

export default SectionHeader;
