"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle, StopCircle } from "lucide-react";
import { useRef, useState } from "react";
import VideoPlayer from "./video-player";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      isPlaying ? video.pause() : video.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section>
      <div className="relative h-[500px] w-full overflow-hidden ">
        <div className="absolute flex justify-between w-[95%] h-5/6  left-[50%] translate-x-[-50%] bottom-5">
          <div className="text-white flex flex-1 items-start justify-end flex-col  w-full h-full pb-[30px]">
            <span className="skew-y-[-7deg] text-[43px] px-1 text-base py-3 bg-black  font-[900]  tracking-tighter ">
              $13{" "}
              <span className="underline text-[29px] relative left-[2px] top-[-9px] pr-[10px]  tracking-normal">
                99
              </span>
            </span>
            <span className="text-[30px] w-[180px]   mt-5 font-[900] bg-[#ff0000] px-2  ">
              Limited Time
            </span>
            <h4 className="text-[50px] font-bold mt-9">Shaq-a-Roni Pizza</h4>
            <p className="text-[38px] font-bold ">
              More cheese, more pepperoni, more to share
            </p>
            <Button
              className="bg-white hover:bg-slate-200 text-black font-bold mt-7 p-[10px_16px]"
              size={"md"}
            >
              ORDER NOW
            </Button>
          </div>
          <div className="flex flex-[.5] items-end justify-end ">
            <div onClick={togglePlay} className="cursor-pointer">
              {isPlaying ? (
                <StopCircle className="w-[50px] h-[50px] text-white" />
              ) : (
                <PlayCircle className="w-[50px] h-[50px] text-white" />
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
