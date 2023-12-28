import { Loader } from "lucide-react";
import React from "react";

export default function HandleLoader() {
  return (
    <div className="p-3 absolute z-50 h-full w-full bg-slate-200/20 top-0 right-0 rounded-m flex items-center justify-center">
      <Loader className="animate-spin h-6 w-6 text-sky-700" />
    </div>
  );
}
