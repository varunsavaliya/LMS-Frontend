import React from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

export const BackButton = ({ state }) => {
  const navigate = useNavigate();
  return (
    <button
      className="text-xl text-gray-300 me-2"
      onClick={() => navigate(-1, { state: { ...state } })}
    >
      <RiArrowLeftSLine className="text-3xl" />
    </button>
  );
};
