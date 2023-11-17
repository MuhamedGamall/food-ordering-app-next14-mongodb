import React from "react";

interface VideoPlayerProps {
  videoRef: any;
  videoSrc: string;
}
export default function VideoPlayer({ videoRef, videoSrc }: VideoPlayerProps) {
  return (
    <video
      ref={videoRef}
      playsInline
      loop
      className="aspect-[5/2] object-cover object-center brightness-[.9] relative z-[-500] h-full w-full"
      muted
      autoPlay={true}
    >
      <source src={videoSrc} type="video/mp4" />
      Browser not supported
    </video>
  );
}
