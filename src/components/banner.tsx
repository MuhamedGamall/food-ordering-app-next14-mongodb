import { LucideIcon } from "lucide-react";
import React from "react";

export default function Banner({
  icon: Icon,
  label,
  color,
  bgColor,
  iconSize,
}: {
  icon: LucideIcon;
  label: string;
  color: string;
  bgColor: string;
  iconSize?: string;
}) {
  return (
    <div
      className={`flex gap-2 
    items-center w-full bg-${bgColor+''}-100  rounded-md border py-3 px-2 text-[18px] mt-3`}
    >
      <Icon color={color} className={iconSize} />

      {label}
    </div>
  );
}
