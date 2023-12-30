import React from "react";
import Auth from "./components/Auth";

export default function Home() {
  return (
    <section className="flex flex-col h-full justify-between">
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex flex-col justify-center items-center px-10 w-full lg:w-3/5 text-center">
          <h1 className="text-black text-5xl md:text-6xl lg:text-8xl font-extrabold">
            Student Compass
          </h1>
          <p className="text-gray-600 text-xl md:text-2xl lg:text-3xl mt-4">
            Navigate your college journey
          </p>
        </div>
        <div className="flex justify-center items-center pt-12 w-full lg:w-2/5">
          <Auth />
        </div>
      </div>
      <div className="flex items-center justify-center pt-12 pb-16">
        <p className="text-black text-2xl md:text-4xl lg:text-6xl font-extrabold">
          Take a look at what we provide
        </p>
      </div>
    </section>
  );
}
