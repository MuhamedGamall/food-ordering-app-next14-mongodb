import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getProfile } from "@/lib/RTK/slices/users-slice";

export default function useProfile(id?:string) {
  const dispatch = useAppDispatch();
  const session = useSession();
  const { profile, loading } = useAppSelector((state) => state.usersData);

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        await dispatch(getProfile(id));
      }
    }
    getData();
  }, [dispatch, session.status,id]);

  return { loading, data: profile };
}
