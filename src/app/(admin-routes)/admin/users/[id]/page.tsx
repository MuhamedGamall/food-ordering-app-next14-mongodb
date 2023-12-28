import React from "react";
import UserDetails from "./_components/user-details";

export default function UserDitailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <section>
      <UserDetails id={id} />
    </section>
  );
}
