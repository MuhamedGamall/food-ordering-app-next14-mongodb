"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DataTable } from "./table-users";
import { getUsers } from "@/lib/RTK/slices/users-slice";

export default function AllUsers() {
  const session = useSession();
  const { users } = useAppSelector((state) => state.usersData);
  const [tableLoading, setTableLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        setTableLoading(true);
        await dispatch(getUsers());
        setTableLoading(false);
      }
    }
    getData();
  }, [dispatch, session.status]);

  return (
    <div>
      <DataTable
        data={users}
        tableLoading={tableLoading}
      />
    </div>
  );
}
