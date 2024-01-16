"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import useProfile from "@/hooks/user-profile";
import { cn } from "@/lib/utils";
import ProfileMenu from "./profile-menu";
export default function NavbarTop() {
  const session = useSession();
  const { data } = useProfile();
  const status = session.status;
  const loading = status === "loading";

  const email = data?.email;
  const userName = data?.name?.split(" ")?.[0] || email?.split("@");

  return (
    <div className="py-2">
      <nav className="flex items-center justify-between w-full">
        <Link href={"/"} className={cn(data?.admin && "sm:hidden block")}>
          <Logo color="red" />
        </Link>
        <div></div>
        <div className=" flex items-center gap-3">
          <>
            {loading ? (
              <span className="text-lg mr-20">Loading...</span>
            ) : status === "authenticated" ? (
              <>
                {/* <div className="flex items-center gap-1 max-w-[100px] overflow-hidden">
                  HI,
                  <Link href={"/profile"} className="underline">
                    {userName}
                  </Link>
                </div>
                <Button
                  variant={"green"}
                  className="rounded-full text-[16px] md:text-[20px]"
                  size={"lg"}
                  onClick={() => signOut()}
                >
                  Sign out
                </Button> */}
                <ProfileMenu name={userName} />
              </>
            ) : (
              <>
                <Link href={"/create-acount"}>
                  <Button
                    variant={"ghost"}
                    className=" rounded-full text-[18px] md:text-[20px]"
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
    </div>
  );
}
