import React from "react";
import { NavLink } from "react-router-dom";

export const NavListItem = ({ title, route }) => {
  return (
    <li>
      <NavLink className="px-4 hover:bg-base-200 py-2 rounded-lg text-base" to={route}>
        {title}
      </NavLink>
    </li>
  );
};
