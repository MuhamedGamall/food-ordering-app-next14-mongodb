"use client";
import HandleLoader from "@/components/loader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import Image from "next/image";
import UserItems from "./user-items";
import { getUsers } from "@/lib/RTK/slices/users-slice";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import PageHeader from "@/components/page-header";

export default function UserDetails({ id }: { id: string }) {
  const { users, loading } = useAppSelector((state) => state.usersData);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getData() {
      await dispatch(getUsers());
    }
    getData();
  }, [dispatch]);
  const user = users.find((el: any) => el._id === id);

  return (
    <>
      <div className=" flex gap-5 flex-col  sm:flex-nowrap flex-wrap relative">
        {loading && <HandleLoader />}
        <Link
          href={"/dashboard/users"}
          className="cursor-pointer flex items-center gap-3 text-slate-800 text-[19px]"
        >
          <MoveLeft /> Back to users table
        </Link>
        <div className="flex items-center gap-3">
          <PageHeader title={"PROFILE |"} className="my-5">
            <span className="text-[25px]"> {user?.name || user?.email}</span>
          </PageHeader>
        </div>
        <div className="flex gap-5 sm:flex-nowrap flex-wrap">
          <div className="w-[250px] ">
            <Image
              src={user?.image || "/avatar/avatar.jpeg"}
              alt="image"
              width={250}
              height={250}
              className="w-[250px]  max-w-full rounded-md aspect-[1] object-cover"
            />
          </div>
          <UserItems data={user} />
        </div>
      </div>
    </>
  );
}
