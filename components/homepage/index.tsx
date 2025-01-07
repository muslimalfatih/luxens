import React from "react";
import Link from 'next/link'
import { Spotlight } from "../ui/spotlight";
import { Button } from "../ui/button";

export function SpotlightPreview() {
  return (
    <div className="h-full w-full flex flex-col justify-center md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Luxens. <br /> Your Photos, Your Story
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Uncover the hidden details of your photos effortlessly. Upload, explore, and enhance – no sign-up required. Make your moments truly unforgettable.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <Link href="/upload">
          <Button 
            type="button" 
            className="bg-gradient-to-b from-neutral-50 to-neutral-400 text-black rounded-full px-8 py-6 text-md font-medium hover:opacity-90 transition-opacity"
          >
            Upload Photo
          </Button>
        </Link>
      </div>
    </div>
  );
}
