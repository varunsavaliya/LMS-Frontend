import React from "react";
import { Link } from "react-router-dom";

export const NavListItem = ({ title, route }) => {
  return (
    <li>
      <Link to={route}>{title}</Link>
    </li>
  );
};
