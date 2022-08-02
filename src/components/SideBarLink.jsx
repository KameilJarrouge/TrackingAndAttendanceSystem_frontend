import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Student } from "../assets/student.svg";
import { ReactComponent as Professor } from "../assets/professor.svg";
import { IoBookOutline, IoPersonOutline } from "react-icons/io5";
import { TbDeviceComputerCamera } from "react-icons/tb";
function SideBarLink({
  to = "#",
  title = null,
  svg = null,
  isActiveColor = "text-accent",
  ...otherProps
}) {
  const [isActive, setIsActive] = useState(false);
  const getSvg = () => {
    switch (svg) {
      case "people":
        return (
          <IoPersonOutline
            className={`w-[40px] h-[40px] ${
              isActive ? isActiveColor : "text-font"
            }`}
          />
        );
      case "student":
        return (
          <Student
            width={40}
            height={40}
            fill={isActive ? "#00C570" : "#C8C8C8"}
          />
        );
      case "professor":
        return (
          <Professor
            width={40}
            height={40}
            fill={isActive ? "#00C570" : "#C8C8C8"}
          />
        );
      case "subject":
        return (
          <IoBookOutline
            className={`w-[40px] h-[40px] ${
              isActive ? "text-accent" : "text-font"
            }`}
          />
        );
      case "camera":
        return (
          <TbDeviceComputerCamera
            className={`w-[40px] h-[40px] ${
              isActive ? "text-accent" : "text-font"
            }`}
            strokeWidth={1}
          />
        );

      default:
        return null;
    }
  };
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        setIsActive(isActive);
      }}
    >
      <div className="w-full flex justify-start ">
        <div className={"w-[95px] my-4"}>
          <div className="flex justify-center">{getSvg()}</div>
        </div>

        <div
          className={`${
            isActive ? "text-accent" : "text-font hover:text-background"
          } font-bold text-xl  text-center flex justify-start  items-center w-[120px]    transition-all`}
        >
          <div>{title}</div>
        </div>
      </div>
    </NavLink>
  );
}

export default SideBarLink;
