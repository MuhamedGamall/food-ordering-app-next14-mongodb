"use client";

import { DataTable } from "./categories-table";
import getCategories from "@/actions/get-categories";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AllCategorios() {
  const session = useSession();
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    async function getData() {
      if (session.status === "authenticated") {
        const { data } = await getCategories();
        setCategories(data);
      }
    }
    getData();
  }, [session.status]);

  return (
    <div>
      <DataTable data={categories} />
    </div>
  );
}
