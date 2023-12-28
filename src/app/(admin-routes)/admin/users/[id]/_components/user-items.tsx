import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { CheckCircle2, XCircle } from "lucide-react";
interface UserItemsProps {
  data: any;
}
export default function UserItems({ data }: UserItemsProps) {
  return (
    <section className="space-y-4 mt-4 w-full">
      <div>
        <h5 className="text-slate-500 text-[17px] ">Admin</h5>
        <div
          className={cn(
            "text-[18px] md:text-[22px]  bg-slate-100  border-[2.5px]  px-[18px]  py-[7.5px] rounded-md "
          )}
        >
          {data?.admin ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 strokeWidth={3} color="green" /> Admin
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <XCircle strokeWidth={3} color="red" />
              Not Admin
            </span>
          )}
        </div>
      </div>
      <div>
        <h5 className="text-slate-500 text-[17px] ">First name & last name</h5>
        <div
          className={cn(
            "text-[18px] md:text-[22px]  bg-slate-100  border-[2.5px]  px-[18px]  py-[7.5px] rounded-md "
          )}
        >
          {data?.name || "No name"}
        </div>
      </div>
      <div>
        <h5 className="text-slate-500 text-[17px] ">Email</h5>
        <div
          className={cn(
            "text-[18px] md:text-[22px]  bg-slate-100 border-[2.5px]  px-[18px]  py-[7.5px] rounded-md "
          )}
        >
          {data?.email}
        </div>
      </div>
      <div>
        <h5 className="text-slate-500 text-[17px] ">Phone</h5>
        <div
          className={cn(
            "text-[18px] md:text-[22px]  bg-slate-100  border-[2.5px]  px-[18px]  py-[7.5px] rounded-md"
          )}
        >
          {data?.phone || "No phone"}
        </div>
      </div>
      <div>
        <h5 className="text-slate-500 text-[17px] ">Street address</h5>
        <div
          className={cn(
            "text-[18px] md:text-[22px]  bg-slate-100 border-[2.5px]  px-[18px]  py-[7.5px] rounded-md "
          )}
        >
          {data?.street_address || "No street address"}
        </div>
      </div>
      <div className="flex items-center gap-4  sm:flex-nowrap flex-wrap">
        <div className="flex-1">
          <h5 className="text-slate-500 text-[17px] ">Postal code</h5>
          <div
            className={cn(
              "text-[18px] md:text-[22px]  bg-slate-100  border-[2.5px]  px-[18px]  py-[7.5px] rounded-md"
            )}
          >
            {data?.postal_code || "No postal code"}
          </div>
        </div>
        <div className="flex-1">
          <h5 className="text-slate-500 text-[17px]">City </h5>
          <div
            className={cn(
              "text-[18px] md:text-[22px]  bg-slate-100  border-[2.5px]  px-[18px]  py-[7.5px] rounded-md "
            )}
          >
            {data?.city || "No city"}
          </div>
        </div>
      </div>
      <div>
        <h5 className="text-slate-500 text-[17px] ">Country </h5>
        <div
          className={cn(
            "text-[18px] md:text-[22px]  bg-slate-100  border-[2.5px]  px-[18px]  py-[7.5px] rounded-md "
          )}
        >
          {data?.country || "No country"}
        </div>
      </div>
    </section>
  );
}
