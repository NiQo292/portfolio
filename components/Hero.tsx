import Image from "next/image";
import React from "react";

import Nico from "@/public/images/nico.png";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-red-500">
      <div className="flex flex-row h-full">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="w-1/2">
            <p className="uppercase text-3xl text-left">Web</p>
            <p className="uppercase text-3xl">Developer</p>
          </div>
          <p className="w-1/2 ">
            Hi 👋 I&apos;m Nico. A creative Web Developer with experience in
            building responsive and user-friendly websites.
          </p>
        </div>
        <div className="w-1/2 h-screen flex items-center justify-center">
          <Image src={Nico} alt="Nico" width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
