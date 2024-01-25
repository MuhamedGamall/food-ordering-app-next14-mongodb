import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getProfile } from "@/lib/RTK/slices/users-slice";

export default function useProfile() {
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.usersData);

  useEffect(() => {
    async function getData() {
      await dispatch(getProfile());
    }
    getData();
  }, [dispatch]);

  return { loading, data: profile };
}
