import React from "react";

export const SubmitButton = ({ disabled = false, title }) => {
  return (
    <button
      className="disabled:bg-gray-700 disabled:text-gray-500 disabled:border-none bg-yellow-600 enabled:hover:bg-transparent border enabled:hover:text-yellow-600 border-yellow-600 rounded-lg py-1 transition-all ease-in-out duration-300 font-semibold text-lg w-full"
      type="submit"
      disabled={disabled}
    >
      {title}
    </button>
  );
};
