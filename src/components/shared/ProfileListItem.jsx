import React from "react";
import { Link } from "react-router-dom";

export const ProfileListItem = ({ route, title, badgeTitle, handler }) => {
  return (
    <li>
      {handler ? (
        <span onClick={handler} className="justify-between">
          {title}
          {badgeTitle && (
            <span className="badge-primary px-2 rounded-full text-sm">New</span>
          )}
        </span>
      ) : (
        <Link to={route} className="justify-between">
          {title}
          {badgeTitle && (
            <span className="badge-primary px-2 rounded-full text-sm">New</span>
          )}
        </Link>
      )}
    </li>
  );
};
