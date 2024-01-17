import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarItem({
  href,
  title,
  icon: Icon,
  checkPath,
}: {
  href: string;
  title: string;
  icon?: LucideIcon;
  checkPath: (path: string) => boolean;
}) {
  return (
    <li
      className={cn(
        checkPath(href) && "bg-sky-300/40 border-r-sky-800 border-r-[3px]",
        "hover:bg-sky-300/40 pl-7 py-3 transition hover:text-sky-600"
      )}
    >
      <Link href={href} className="flex items-center gap-2">
        {Icon && (
          <Icon className={cn(checkPath(href) && "text-sky-600", " w-7 h-7")} />
        )}
        <span className={cn(checkPath(href) && "text-sky-800", "text-[20px] ")}>
          {title}
        </span>
      </Link>
    </li>
  );
}
