import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useProfile() {
  const session = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      if (session.status === "authenticated") {
        try {
          setLoading(true);
          const user = (await axios.get("/api/edit-profile")).data;
          setData(user);
        } catch (error: any) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }
    getUser();
  }, [session.status]);

  return { loading, data };
}
