"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed z-[11111111111111111111] inset-0 bg-sky-700/20 flex justify-center items-center">
      <div className="flex justify-start items-center gap-2 pl-4 p-2 shadow-lg rounded-sm bg-slate-100 text-[25px] md:text-[30px] w-[300px] sm:w-[400px] whitespace-nowrap">
        <Loader2 className="animate-spin transition-all h-5 w-5 md:h-8 md:w-8" />
        Loading...
      </div>
    </div>
  );
}
