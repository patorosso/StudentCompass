import React from "react";

type RadialProgressProps = {
  progress: number;
};

const RadialProgress: React.FC<RadialProgressProps> = ({ progress }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <svg className="transform -rotate-90" width="100" height="100">
        <circle
          className="text-surface-300"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="7"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: 0 }}
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-sixth"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="7"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex justify-center items-center">
        <span className="text-black text-2xl">{progress}%</span>
      </div>
    </div>
  );
};

export default RadialProgress;
