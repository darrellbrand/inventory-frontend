
import React from "react";
import { Vortex } from "./ui/vortex";

export function VortexDemo() {
  return (
    <div className="w-full mx-auto rounded-md  h-screen overflow-hidden  ">
      <Vortex
        rangeY={200}
        backgroundColor=""
        className="flex items-center flex-col justify-center px-2 md:px-10  w-full h-full absolute top-0"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          RTFM (Read This Fine Manual)
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          Blogs, images, rich text editing, and real time chat.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Learn more
          </button>
          <button className="px-4 py-2  text-white ">Watch trailer</button>
        </div>
      </Vortex>
    </div>
  );
}
