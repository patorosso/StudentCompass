import React from "react";
import Auth from "./components/Auth";

export default function Home() {
  return (
    <section className="flex flex-col h-full justify-between pt-24">
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className="flex flex-col justify-center items-center px-10 w-full lg:w-3/5 lg:ml-30">
          <div>
            <div className="bg-clip-text text-transparent bg-gradient-to-r from-third from-5% to-primary to-90% text-4xl md:text-5xl lg:text-8xl font-extrabold">
              student
            </div>
            <div className="bg-clip-text text-transparent bg-gradient-to-r from-third from-5% to-second to-70% text-5xl md:text-6xl lg:text-9xl font-extrabold">
              Compass
            </div>
          </div>
          <p className="text-gray-600 text-xl md:text-2xl lg:text-4xl mt-4">
            Navigate your college journey
          </p>
        </div>
        <div className="flex justify-center items-center pt-12 w-full lg:w-2/5">
          <Auth />
        </div>
      </div>
      <div className="flex items-center justify-center pt-12 pb-16">
        <p className="text-gray-800 dark:text-gray-400 text-2xl md:text-4xl lg:text-6xl font-extrabold cursor-pointer">
          Take a look at what we provide
        </p>
      </div>
    </section>
  );
}
