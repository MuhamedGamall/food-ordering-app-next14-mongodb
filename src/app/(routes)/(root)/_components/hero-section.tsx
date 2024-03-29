"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightCircle, PlayCircle, StopCircle } from "lucide-react";
import { useRef, useState } from "react";
import VideoPlayer from "./video-player";
import Link from "next/link";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      !isPlaying ? video.pause() : video.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section>
      <div className="relative h-[500px]">
        <div className="mx-auto max-w-[90rem] absolute flex justify-between  w-[85%]   left-[50%] translate-x-[-50%] bottom-5 h-full">
          <div className="text-white flex flex-1 items-start justify-end flex-col  w-full h-full pb-[30px]">
            <span className="skew-y-[-7deg] text-[30px] px-3 bg-black  font-[900]  tracking-tighter ">
              $15{" "}
              <span className="underline text-[17px] relative left-[2px] top-[-9px] pr-[10px]  tracking-normal">
                99
              </span>
            </span>
            <span className="text-[25px] w-[190px]   mt-5 font-[900] bg-[#ff0000] px-2 ">
              Limited Time
            </span>
            <h4 className=" text-[40px] md:text-[50px] font-bold mt-3 md:mt-9 leading-[1]">
              Shaq-a-Roni Pizza
            </h4>
            <p className="text-[30px] md:text-[30px] text-slate-100 font-[100]">
              More cheese, more pepperoni, more to share
            </p>
          
              <Button
                className="bg-white text-[1rem] hover:bg-slate-200 text-black font-bold md:mt-7  px-5"
                size={"md"}
              >
                <Link
                  className="flex items-center gap-x-2 "
                  href={"menu/category/pizza/65b27a78b776bf5cb84cd02b"}
                >
                  ORDER NOW
                  <ArrowRightCircle />
                </Link>
              </Button>
           
          </div>
          <div className="flex md:mb-6 md:items-end mt-10 items-start justify-end ">
            <div onClick={togglePlay} className="cursor-pointer">
              {!isPlaying ? (
                <StopCircle className="w-[3rem] h-[3rem] text-white" />
              ) : (
                <PlayCircle className="w-[3rem] h-[3rem] text-white" />
              )}
            </div>
          </div>
        </div>
        <VideoPlayer
          videoRef={videoRef}
          videoSrc={"/hero/video/2023-p10-SAR-202310251109PCC.mp4"}
        />
      </div>
    </section>
  );
}
