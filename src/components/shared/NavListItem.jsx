import React from "react";
import { Link, NavLink } from "react-router-dom";

export const NavListItem = ({ title, route }) => {
  return (
    <li>
      <NavLink className="px-4 hover:bg-base-200 py-2 rounded-lg" to={route}>
        {title}
      </NavLink>
    </li>
  );
};
