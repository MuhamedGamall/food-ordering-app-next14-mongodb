import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getProfile } from "@/lib/RTK/slices/profile-slice";

export default function useProfile() {
  const dispatch = useAppDispatch();
  const session = useSession();
  const { profile, loading } = useAppSelector((state) => state.profileData);

  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        await dispatch(getProfile());
      }
    }
    getData();
  }, [dispatch, session.status]);

  return { loading, data: profile };
}
