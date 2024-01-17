import React from "react";
import UserDetails from "./_components/user-details";

export default function UserDitailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <section className="sm:w-[90%] max-w-[80rem] mx-auto mt-5 p-5">
      <UserDetails id={id} />
    </section>
  );
}
