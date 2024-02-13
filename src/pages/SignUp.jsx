import React from "react";
import HomeLayout from "../layouts/HomeLayout";

export const SignUp = () => {
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>
        </form>
      </div>
    </HomeLayout>
  );
};
