import React, { useRef, useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import HeaderLink from "./HeaderLink";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import api from "../api/api";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import useOutsideAlerter from "../hooks/useOutsideAlert";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../api/token";
import { removeUser } from "../api/user";

function Header() {
  const [profileMenu, setProfileMenu] = useState(false);
  const wrapperRef = useRef(null);
  let navigate = useNavigate();
  useOutsideAlerter(wrapperRef, () => setProfileMenu(false));

  const handleLogout = async () => {
    const res = await api.post("/api/logout");
    // removeToken();
    // removeUser();
    // UserContext.setUser({});
    navigate("/login");
  };

  return (
    <div dir="rtl" className="flex flex-row min-h-full items-center ">
      {/* logo area 1/5 */}
      <div className="flex flex-row justify-start items-center w-1/5">
        <div className="mr-4 w-1/4">
          <Logo width={60} height={60} className={"bg-transparent"}></Logo>
        </div>
        <span
          dir="rtl"
          className="text-right text-font font-extrabold text-3xl font-serif w-3/4"
        >
          System
        </span>
        {/* <div className="w-0.5 h-[3rem] bg-font mx-1 "></div> */}
      </div>
      {/* nav area 2/5 */}
      <div className="flex items-center justify-start w-[35%]">
        <HeaderLink
          to="/dashboard"
          title={"الرئيسية"}
          svg={<AiFillHome />}
        ></HeaderLink>
        <HeaderLink
          to="settings"
          title={"الإعدادات"}
          svg={<IoMdSettings />}
        ></HeaderLink>
        <HeaderLink
          to="notifications"
          title={"الإشعارات"}
          svg={<IoMdNotifications />}
        ></HeaderLink>
      </div>
      {/* search area 1/5 */}
      <div className="flex items-center justify-center w-[25%] ">
        <input
          type="text"
          className="bg-background_input text-primary px-2 w-1/2 rounded-sm"
          placeholder="Quick search"
        />
        <FaSearch className="mx-2 text-xl text-font hover:text-accent hover:transition-all cursor-pointer" />
      </div>
      {/* profile area 1/5 */}
      <div dir="ltr" className="flex items-center justify-start w-1/5 h-full">
        <div
          onMouseEnter={() => setProfileMenu(true)}
          onClick={() => setProfileMenu(profileMenu !== true)}
          className="w-12 h-12 rounded-full ml-4  "
        >
          <img
            src={"image"}
            className="w-12 h-12 rounded-full bg-background"
            alt="img"
          />
        </div>
        <div
          onMouseEnter={() => setProfileMenu(true)}
          onClick={() => setProfileMenu(profileMenu !== true)}
          className="   text-font font-extrabold text-2xl font-serif ml-2 flex flex-row justify-start items-center "
        >
          {"كميل جروج"}
          {/* <IoIosArrowDown className="mt-2" /> */}
        </div>
      </div>
      {profileMenu && (
        <div
          ref={wrapperRef}
          className={`fixed top-[10vh] left-2 w-[12rem] h-[8rem] bg-background shadow-lg shadow-primary border-r-2 border-l-2 border-b-2 border-primary z-50 transition-all  `}
        >
          <div className="w-full h-full flex flex-col justify-start items-center">
            <NavLink
              to={"#"}
              onClick={() => setProfileMenu(false)}
              className="w-full h-1/2  border-primary flex justify-center items-center text-primary font-bold text-xl"
            >
              Profile
            </NavLink>
            <div className="w-full h-0.5 bg-primary my-1"></div>
            <button
              onClick={handleLogout}
              className="w-full h-1/2  border-primary flex justify-center items-center text-primary font-bold text-xl"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
