import React from "react";
import { Link } from "react-router-dom";

export const CustomButton = ({
  type = "button",
  title,
  clickHandler,
  route,
  designType = "submit",
  width = "full",
}) => {
  const getButtonClass = (designType) => {
    let classes = "";
    switch (designType) {
      case "submit":
        classes =
          "bg-yellow-600 hover:bg-transparent border hover:text-yellow-600 border-yellow-600 rounded-lg px-3 py-1 mt-6 transition-all ease-in-out duration-300 font-semibold text-lg";
        break;
      case "primary":
        classes =
          "btn-primary border border-yellow-500 text-yellow-500 px-4 py-1 font-semibold rounded-md whitespace-nowrap";
        break;
      case "secondary":
        classes =
          "btn-secondary bg-white text-black px-4 py-1 font-semibold rounded-md whitespace-nowrap";
        break;
      default:
        classes = "";
        break;
    }
    if (width === "full") {
      classes = classes + " w-full";
    } else {
      classes = classes + " w-fit";
    }
    return classes;
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
