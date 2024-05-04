import React from "react";
import RadialProgress from "./RadialProgress";
import CurrentSubjects from "./currentSubjects/CurrentSubjects";

const Analytics = () => {
  return (
    <div className="dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className=" bg-slate-400 bg-opacity-55 dark:bg-surface-300 dark:bg-opacity-55 text-white shadow-xl rounded-lg p-4 md:col-span-3">
          <div className="flex justify-center items-center px-8 py-4 space-x-16">
            <div className="flex justify-center items-center text-2xl text-black bg-gradient-to-br from-white from-30% to-98% to-gray-400 w-24 h-24 rounded-full shadow-xl">
              52/63
            </div>
            <div className="flex justify-center items-center text-black bg-gradient-to-br from-white from-30% to-98% to-gray-400 w-24 h-24 rounded-full shadow-xl">
              <RadialProgress progress={83} />
            </div>
            <div className="flex justify-center items-center text-2xl text-black bg-gradient-to-br from-white from-30% to-98% to-gray-400 w-24 h-24 rounded-full shadow-xl">
              7.9
            </div>
          </div>
          <div className="flex justify-center items-center space-x-16 text-white">
            <div className="flex justify-center items-center bg-primary w-24 h-8 rounded-md shadow-xl">
              Aprobadas
            </div>
            <div className="flex justify-center items-center bg-second w-24 h-8 rounded-md shadow-xl">
              Progreso
            </div>
            <div className="flex justify-center items-center bg-third backdrop-blur-md w-24 h-8 rounded-md shadow-xl">
              Promedio
            </div>
          </div>
        </div>
        <CurrentSubjects />
      </div>
    </div>
  );
};

export default Analytics;
