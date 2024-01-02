import React from "react";

const Analytics = () => {
  return (
    <div className="dark:text-white w-96">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-400 dark:bg-surface-200 text-white shadow-xl rounded-lg p-4 md:col-span-3">
          First
        </div>
        <div className="bg-gray-400 dark:bg-surface-200 text-white shadow-xl rounded-lg p-4 md:col-span-2">
          Second
        </div>
        <div className="bg-gray-400 dark:bg-surface-200 text-white shadow-xl rounded-lg p-4 md:col-span-1">
          Third
        </div>
      </div>
    </div>
  );
};

export default Analytics;
