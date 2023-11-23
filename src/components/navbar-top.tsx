"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";

export default function NavbarTop() {
  const session = useSession();
  console.log("session", session);
  const status = session.status;

  return (
    <header className=" py-2">
      <nav className="flex items-center justify-between w-full">
        <Link href={"/"}>
          <Logo color="red" />
        </Link>
        <div className=" flex items-center">
          <>
            {status === "authenticated" ? (
              <Button
                variant={"green"}
                className="rounded-full text-[16px] md:text-[20px]"
                size={"lg"}
                onClick={()=>signOut()}
              >
                Sign out
              </Button>
            ) : (
              <>
                <Link href={"/create-acount"}>
                  <Button
                    variant={"ghost"}
                    className=" rounded-full text-[16px] md:text-[20px]"
                    size={"lg"}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href={"/log-in"}>
                  <Button
                    variant={"green"}
                    className=" rounded-full text-[21px] md:text-[25px]"
                    size={"lg"}
                  >
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </>
        </div>
      </nav>
    </header>
  );
}
