import React from "react";
import { useNavigate } from "react-router-dom";

export const Denied = () => {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238}">
      <h1 className="relative text-9xl font-extrabold text-white tracking-widest">
        403
        <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute top-[50%] left-[25%] whitespace-nowrap tracking-normal">
          Access Denied ...
        </div>
      </h1>
      <button>
        <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring my-5">
          <span
            onClick={() => navigate('/')}
            className="relative block px-8 py-3 bg-[#1A2238] border border-current"
          >
            Go Home
          </span>
        </a>
      </button>
    </main>
  );
};
