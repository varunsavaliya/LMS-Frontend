import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const BackButton = ({ route, state }) => {
  const navigate = useNavigate();
  return (
    <button
      className="text-xl text-green-500"
      onClick={() => navigate(route, { state: { ...state } })}
    >
      <AiOutlineArrowLeft />
    </button>
  );
};
