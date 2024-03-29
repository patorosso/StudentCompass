import React from "react";
import RadialProgress from "./RadialProgress";

const Analytics = () => {
  return (
    <div className="dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-900 from-20% to-pink-500 to-80% text-white shadow-xl rounded-lg p-4 md:col-span-3 opacity-90">
          <div className="flex justify-center items-center px-8 py-4 space-x-16">
            <div className="flex justify-center items-center text-2xl text-black bg-gradient-to-br from-white from-10% to-90% to-gray-400 w-24 h-24 rounded-full shadow-xl">
              52/63
            </div>
            <div className="flex justify-center items-center text-black bg-gradient-to-br from-white from-10% to-90% to-gray-400 w-24 h-24 rounded-full shadow-xl">
              <RadialProgress progress={83} />
            </div>
            <div className="flex justify-center items-center text-2xl text-black bg-gradient-to-br from-white from-10% to-90% to-gray-400 w-24 h-24 rounded-full shadow-xl">
              7.9
            </div>
          </div>
          <div className="flex justify-center items-center space-x-16 text-white">
            <div className="flex justify-center items-center bg-gray-300/30 backdrop-blur-md w-24 h-8 rounded-md shadow-xl">
              Aprobadas
            </div>
            <div className="flex justify-center items-center bg-gray-300/30 backdrop-blur-md w-24 h-8 rounded-md shadow-xl">
              Progreso
            </div>
            <div className="flex justify-center items-center bg-gray-300/30 backdrop-blur-md w-24 h-8 rounded-md shadow-xl">
              Promedio
            </div>
          </div>
        </div>
        <div className="bg-gray-400 dark:bg-surface-200 text-white shadow-xl rounded-lg p-4 md:col-span-2 h-40">
          Second
        </div>
        <div className="bg-gray-400 dark:bg-surface-200 text-white shadow-xl rounded-lg p-4 md:col-span-1">
          Third
        </div>
        <div className="bg-gray-400 dark:bg-surface-200 text-white shadow-xl rounded-lg p-4 md:col-span-3 h-32">
          Fourth
        </div>
      </div>
    </div>
  );
};

export default Analytics;
