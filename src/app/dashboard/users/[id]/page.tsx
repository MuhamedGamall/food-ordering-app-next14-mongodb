import React from "react";
import UserDetails from "./_components/user-details";

export default function UserDitailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <main>
      <UserDetails id={id} />
    </main>
  );
}
