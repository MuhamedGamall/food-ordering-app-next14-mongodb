import { Facebook } from "lucide-react";
import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className=" border-t mt-10 p-5">
      <div className=" flex justify-center flex-col items-center bg-white w-[90%] max-w-[80rem] mx-auto  ">
        <div className=" mb-3 mt-2 flex gap-2 items-center justify-center">
          <h5 className="text-[15px] ">Social media</h5>
          <ul className="flex items-center gap-2 text-[27px] hover:[&>li]:text-slate-600 [&>li]:cursor-pointer">
            <li>
              <Link
                href={"lhttps://www.linkedin.com/in/muhamed-gamal-468339241"}
              >
                <FaLinkedin />
              </Link>
            </li>
            <li>
              <Link href={"https://github.com/MuhamedGamall?tab=repositories"}>
                <FaGithubSquare />
              </Link>
            </li>
          </ul>
        </div>
        <span className=" mt-2 mb-5 text-center text-[15px]">
          &copy; {new Date().getFullYear()} All Rights Reserved for
          <span className="text-[#2d5d2a] ml-[3px] font-bold whitespace-nowrap text-[13px]">
            Food ordering
          </span>
          .
        </span>
      </div>
    </footer>
  );
}
