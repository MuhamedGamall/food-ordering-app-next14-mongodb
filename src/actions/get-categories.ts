import axios from "axios";

export default async function getCategories() {
  try {
    const data = (await axios.get("/api/categories")).data;
    return { data };
  } catch (error: any) {
    console.log(error);
    return { data: null };
  }
}

