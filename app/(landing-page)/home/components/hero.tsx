"use client";

import Image from "next/image";
import React from "react";
import hero from "../../../../public/k100.webp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();
  return (
    // <div className="bg-heroImg  bg-cover bg-center bg-no-repeat h-[40vh] md:h-[80vh] lg:h-[70vh] flex items-center justify-center ">
    //   {/* <Image src={hero} className="" alt="hero" width={400} height={400} /> */}
    //   <div className="bg-transparent text-white md:mt-72 ">
    //     <h2 className="text-4xl md:text-5xl ">Just Launched</h2>
    //     <div className="flex justify-center mt-7 ">
    //       <Button variant={"outline"} className="text-md px-8 py-6">
    //         Shop all
    //       </Button>
    //     </div>
    //   </div>
    // </div>
    <div className="relative h-[40vh] md:h-[80vh] lg:h-[70vh] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/boots.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30" />

      {/* Content */}
      <div className="relative flex items-center justify-center h-full">
        <div className="text-white md:mt-72 text-center z-10">
          {/* <h2 className="text-4xl md:text-5xl">Just Launched</h2> */}
          <h2 className="text-lg md:text-2xl lg:5xl font-semibold">
            ALLYS CLOSET/ NEW & PREOWNED BOOT/ WINTER JACKETS/ LEATHER ITEMS
          </h2>
          <div className="flex justify-center mt-7">
            <Button
              variant="outline"
              onClick={() => router.push("/shop")}
              className="text-md px-8 py-6 hover:bg-white/20"
            >
              Shop all
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
