"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DataTable } from "./table-users";
import { getUsers } from "@/lib/RTK/slices/users-slice";

export default function AllUsers() {
  const session = useSession();
  const { users, loading } = useAppSelector((state) => state.usersData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        await dispatch(getUsers());
      }
    }
    getData();
  }, [dispatch, session.status]);

  return <DataTable data={users} tableLoading={loading} />;
}
