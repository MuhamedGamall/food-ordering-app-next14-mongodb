"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRightCircle,

  PlayCircle,
  StopCircle,
} from "lucide-react";
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
            <span className="skew-y-[-7deg] text-[2.5rem] px-3 bg-black  font-[900]  tracking-tighter ">
              $13{" "}
              <span className="underline text-[1.5rem] relative left-[2px] top-[-9px] pr-[10px]  tracking-normal">
                99
              </span>
            </span>
            <span className="text-[2rem] w-[10rem]   mt-5 font-[900] bg-[#ff0000] px-2 ">
              Limited Time
            </span>
            <h4 className=" text-[3rem] md:text-[4rem] font-bold mt-3 md:mt-9">
              Shaq-a-Roni Pizza
            </h4>
            <p className="text-[1.5rem] md:text-[2.7rem] font-[200]">
              More cheese, more pepperoni, more to share
            </p>
            <div className="flex items-center  gap-3 justify-between mt-3 md:mt-7">
              <Button
                className="bg-white text-[1rem] hover:bg-slate-200 text-black font-[900]  p-[10px_16px]"
                size={"md"}
              >
                ORDER NOW
              </Button>
              <Link
                href={""}
                className="text-slate-100 flex items-center gap-x-2 "
              >
                Learn more <ArrowRightCircle />
              </Link>
            </div>
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
