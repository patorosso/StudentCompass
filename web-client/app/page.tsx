import React from "react";
import Auth from "./components/Auth";

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex h-4/5 items-center">
        <div className="flex justify-center items-center w-2/3 h-full">
          <div className="flex ">Title and explanation</div>
        </div>
        <div className="flex justify-center items-center w-1/3 h-full">
          <Auth />
        </div>
      </div>
      <div className="flex h-1/5 items-center justify-center">
        <p className="text-black text-4xl lg:text-6xl font-extrabold">
          Take a look at what we provide
        </p>
      </div>
      <div className="min-h-screen"> ASD</div>
    </React.Fragment>
  );
}
