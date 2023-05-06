import React from "react";
import { NavLink } from "react-router-dom";

function HeaderLink({ to = "#", title = null, svg = null, ...otherProps }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `text-center mx-2 ${
        title == null ? "px-1" : "px-4"
      } ${
        title == null ? "rounded-md" : "rounded-xl"
      } font-bold text-xl flex flex-row justify-between  items-center  border-2 
      ${
        isActive
          ? "text-accent bg-primary border-accent "
          : "text-font bg-primary  border-font  hover:text-primary hover:bg-font hover:transition-all"
      }`}
    >
      <div className={title == null ? "" : "ml-2"}>{svg}</div>
      {title}
    </NavLink>
  );
}

export default HeaderLink;
