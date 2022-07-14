import React from "react";
import { NavLink } from "react-router-dom";

function BodyLink({ to = "#", title = null, svg = null, ...otherProps }) {
  return (
    <div className="w-full flex justify-center items-center">
      <NavLink
        to={to}
        className={
          " text-2xl text-font text-center font-bold bg-primary border-[0.2px] border-font hover:text-primary hover:bg-font hover:border-primary transition-all w-full rounded-lg"
        }
      >
        {title}
      </NavLink>
    </div>
  );
}

export default BodyLink;
