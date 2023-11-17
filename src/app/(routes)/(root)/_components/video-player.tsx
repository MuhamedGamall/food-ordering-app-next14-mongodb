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
      className="aspect-[3/2] object-cover object-bottom brightness-50 relative z-[-500]"
      muted
    >
      <source src={videoSrc} type="video/mp4" />
      Browser not supported
    </video>
  );
}
