import { useNavigate } from "react-router-dom";
import React from "react";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="relative text-9xl font-extrabold text-white tracking-widest">
        404
        <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute top-[50%] left-[25%] whitespace-nowrap tracking-normal">
          Page Not Found ...
        </div>
      </h1>
      <button>
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring my-5">
          <span
            onClick={() => navigate(-1)}
            className="relative block px-8 py-3 bg-[#1A2238] border border-current"
          >
            Go Back
          </span>
        </a>
      </button>
    </div>
  );
};
