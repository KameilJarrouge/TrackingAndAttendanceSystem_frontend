import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Student } from "../assets/student.svg";
import { ReactComponent as Professor } from "../assets/professor.svg";
import { IoBookOutline, IoPersonOutline } from "react-icons/io5";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { MdChecklistRtl } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { bindAction } from "./InitializeEcho";
function SideBarLink({
  to = "#",
  title = null,
  svg = null,
  isActiveColor = "text-accent",
  eventName = "",
  ...otherProps
}) {
  const [isActive, setIsActive] = useState(false);
  const [promptedColor, setPromptedColor] = useState("");
  const getSvg = () => {
    switch (svg) {
      case "home":
        return (
          <AiOutlineHome
            className={`w-[38px] h-[38px] ${
              isActive ? isActiveColor : "text-font"
            }`}
          />
        );
      case "checklist":
        return (
          <MdChecklistRtl
            className={`w-[38px] h-[38px] ${
              isActive ? isActiveColor : "text-font"
            }`}
          />
        );
      case "people":
        return (
          <IoPersonOutline
            className={`w-[38px] h-[38px] ${
              isActive ? isActiveColor : "text-font"
            }`}
          />
        );
      case "student":
        return (
          <Student
            width={38}
            height={38}
            fill={isActive ? "#00C570" : "#C8C8C8"}
          />
        );
      case "professor":
        return (
          <Professor
            width={38}
            height={38}
            fill={isActive ? "#00C570" : "#C8C8C8"}
          />
        );
      case "subject":
        return (
          <IoBookOutline
            className={`w-[38px] h-[38px] ${
              isActive ? "text-accent" : "text-font"
            }`}
          />
        );
      case "camera":
        return (
          <TbDeviceComputerCamera
            className={`w-[38px] h-[38px] ${
              isActive ? "text-accent" : "text-font"
            }`}
            strokeWidth={1}
          />
        );
      case "warnings":
        return (
          <MdChecklistRtl
            className={`w-[38px] h-[38px] ${
              isActive ? "text-accent" : getColor(false)
            }`}
          />
        );
      case "tracking":
        return (
          <FiEye
            className={`w-[38px] h-[38px] ${
              isActive ? "text-accent" : getColor(false)
            }`}
            strokeWidth={1}
          />
        );

      default:
        return null;
    }
  };

  const getColor = (withHover = true) => {
    if (promptedColor) {
      return promptedColor;
    } else {
      return "text-font" + (withHover ? "hover:text-background" : "");
    }
  };
  useEffect(() => {
    if (eventName) {
      bindAction("reactChannel", eventName, (event) => {
        console.log(event);
        if (
          event.color === "red" ||
          (event.color === "blue" && promptedColor !== "red") ||
          (event.color === "yellow" &&
            (promptedColor !== "red" || promptedColor !== "blue"))
        ) {
          setPromptedColor("text-" + event.color + "-500");
        }
      });
    }
  }, []);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (isActive) setPromptedColor("");
        setIsActive(isActive);
        return isActive ? "cursor-default" : "";
      }}
    >
      <div className="w-full flex justify-start group ">
        <div className={"w-[95px] my-4"}>
          <div className="flex justify-center">{getSvg()}</div>
        </div>

        <div
          className={`${
            isActive ? "text-accent" : getColor()
          } font-bold text-lg  text-center flex flex-col items-start justify-center w-[120px] transition-all`}
        >
          <div className="w-5/6 h-fit">{title}</div>
          {!isActive && (
            <div className="w-5/6 h-0.5 flex justify-center items-center">
              <div className="w-0 group-hover:w-1/2 transition-all h-full bg-background"></div>
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
}

export default SideBarLink;
