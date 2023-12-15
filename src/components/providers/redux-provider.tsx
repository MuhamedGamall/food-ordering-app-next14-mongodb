"use client";
import store from "@/lib/RTK/store";
import { Provider } from "react-redux";
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
