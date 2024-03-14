import React from "react";
import { Link } from "react-router-dom";

export const CustomButton = ({
  type = "button",
  title,
  clickHandler,
  route,
  designType = "submit",
}) => {
  const getButtonClass = (designType) => {
    switch (designType) {
      case "submit":
        return "w-full bg-yellow-600 hover:bg-transparent border hover:text-yellow-600 border-yellow-600 rounded-lg py-1 mt-6 transition-all ease-in-out duration-300 font-semibold text-lg";
      case "primary":
        return "btn-primary border border-yellow-500 text-yellow-500 px-4 py-1 font-semibold rounded-md w-full whitespace-nowrap";
      case "secondary":
        return "btn-secondary bg-white text-black px-4 py-1 font-semibold rounded-md w-full whitespace-nowrap";
      default:
        return "";
    }
  };
  return (
    <button
      className={getButtonClass(designType)}
      type={type}
      onClick={clickHandler ?? null}
    >
      {route ? <Link to={route}>{title}</Link> : <span>{title}</span>}
    </button>
  );
};
