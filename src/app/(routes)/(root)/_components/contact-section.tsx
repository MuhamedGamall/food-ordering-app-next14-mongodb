"use client";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ContactSection() {
  const router = useRouter();
  const session = useSession();
  const isLogin = session.status === "authenticated";
  const email = session.data?.user?.email || "";
  const form: any = useRef();
  const [value, setValue] = useState("");
  const sendEmail = async (e: any) => {
    e.preventDefault();
    if (isLogin) {
      if (value.trim().length > 0)
        await emailjs
          .sendForm(
            "service_food_ordering",
            "template_bdi5ehr",
            form.current,
            "JHaJCPs52KJhZBZsZ"
          )
          .then(
            (result: any) => {
              console.log(result.status);
            },
            (error: any) => {
              console.log(error.text);
            }
          );
    } else router.push("/log-in");
    setValue("");
  };

  return (
    <section>
      <div className="w-fit mx-auto my-8 ">
        <PageHeader
          title="CONTACT US"
          className="text-[19px] sm:text-[25px] mb-1 "
        />
        <span className="w-[70%] bg-black h-[2px] mx-auto block"></span>
      </div>
      <div className="rounded-md border p-4 ">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="rounded-md border p-4 shadow-md mb-5"
        >
          <span className=" block text-center  my-4">SEND YOUR MESSAGE</span>
          <div className="flex flex-col justify-center items-center p-2 mb-5">
            <input name="from_name" className="hidden" value={email} />
            <div className="flex flex-col gap-2 items-start w-[80%]">
              <label>Your message</label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                name="message"
                placeholder="Inter your message"
                className=" rounded-md px-3 py-1 w-full resize-none h-[100px] sm:h-[140px] bg-slate-100 border focus:outline-slate-400"
              />
            </div>
            <Button
              // disabled={value.trim().length === 0}
              type="submit"
              className="shadow-sm bg-cyan-800  transition hover:bg-gray-900 px-4 py-2 mt-3 cursor-pointer text-white font-bold"
            >
              SEND
            </Button>
          </div>
        </form>
        <span className="block text-center my-4">OR CONTACT SUPPORT</span>
        <Link
          href={"tel:+46738123123"}
          className="flex mb-5 w-fit mx-auto items-center flex-col justify-center gap-2 font-bold text-[25px]"
        >
          <Phone className="w-6 h-6" /> +46 738 123 123
        </Link>
      </div>
    </section>
  );
}
