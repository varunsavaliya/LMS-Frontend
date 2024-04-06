import React from "react";

export const StatsItem = ({ title, children, number }) => {
  return (
    <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-md">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-center text-sm sm:text-base">
          {title}
        </p>
        <div className="flex gap-3 items-center justify-center">
          <h3 className="text-xl lg:text-4xl font-bold">{number}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};
