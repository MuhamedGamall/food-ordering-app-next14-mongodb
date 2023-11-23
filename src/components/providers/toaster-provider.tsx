"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          padding: "10px",
          fontSize: "16px",
        },
        position: "top-right",
        duration: 1800,
      }}
      containerStyle={{
        top: 10,
        left: 20,
      }}
    />
  );
}
