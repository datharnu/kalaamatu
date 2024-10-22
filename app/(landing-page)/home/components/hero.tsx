import Image from "next/image";
import React from "react";
import hero from "../../../../public/k100.webp";
import { Button } from "@/components/ui/button";

export default function HeroPage() {
  return (
    <div className="bg-heroImg  bg-cover bg-center bg-no-repeat h-[40vh] md:h-[80vh] lg:h-[70vh] flex items-center justify-center ">
      {/* <Image src={hero} className="" alt="hero" width={400} height={400} /> */}
      <div className="bg-transparent text-white md:mt-72 ">
        <h2 className="text-4xl md:text-5xl ">Just Launched</h2>

        <div className="flex justify-center mt-7 ">
          <Button variant={"outline"} className="text-md px-8 py-6">
            Shop all
          </Button>
        </div>
      </div>
    </div>
  );
}
