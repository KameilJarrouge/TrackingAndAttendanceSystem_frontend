import React, { useRef, useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import HeaderLink from "./HeaderLink";
import { AiFillHome } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import api from "../api/api";
import {
  IoIosArrowDown,
  IoMdNotifications,
  IoMdSettings,
} from "react-icons/io";
import useOutsideAlerter from "../hooks/useOutsideAlert";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../api/token";
import { getUser, removeUser } from "../api/user";
import { CgProfile } from "react-icons/cg";
import userEvent from "@testing-library/user-event";
import { MdLogout, MdOutlineManageAccounts } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";
import MyAccountModal from "../Modals/MyAccountModal";
function Header() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [user, setUser] = useState(getUser());

  const wrapperRef = useRef(null);
  let navigate = useNavigate();
  useOutsideAlerter(wrapperRef, () => {
    setProfileMenu(false);
  });

  let offProfileAndOpenModal = () => {
    setProfileMenu(false);
    setmodalIsOpen(true);
  };

  let refresh = () => {
    setUser(getUser());
  };

  const handleLogout = async () => {
    const res = await api.post("/api/logout");
    // removeToken();
    // removeUser();
    // UserContext.setUser({});
    navigate("/login");
  };

  return (
    <div
      dir="rtl"
      className="flex flex-row min-h-full items-center justify-between "
    >
      <MyAccountModal
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={() => refresh()}
      ></MyAccountModal>
      <div className="flex justify-start w-1/2">
        {/* logo area 1/5 */}
        <div className="flex flex-row justify-start items-center  ">
          <div className="mr-4 ">
            <Logo width={60} height={60} className={"bg-transparent"}></Logo>
          </div>
          <span
            dir="rtl"
            className="text-right text-font font-extrabold text-3xl font-serif mx-3 "
          >
            System
          </span>
          {/* <div className=" h-[3rem] bg-font mx-1 "></div> */}
        </div>
        {/* nav area 2/5 */}
        <div className="flex items-center justify-start ">
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
      </div>

      <div className="flex justify-end w-1/2">
        {/* search area 1/5 */}
        <div className="flex  items-center justify-center ml-2 hidden">
          <input
            type="text"
            className="bg-background_input w-[10rem] text-primary px-2  rounded-sm py-0.5"
            placeholder="بحث"
          />
          <FaSearch className="mx-2 text-2xl text-font hover:text-accent hover:transition-all cursor-pointer" />
        </div>
        {/* profile area 1/5 */}
        <div
          dir="ltr"
          className={`ml-8 flex items-center justify-start min-w-[200px]  h-full }`}
        >
          <div
            // ={() => setProfileMenu(true)}
            onClick={() => setProfileMenu(profileMenu !== true)}
            className={` ${
              profileMenu ? " text-background" : "text-font"
            }    font-extrabold select-none text-2xl font-serif  flex flex-row justify-start items-center cursor-pointer transition-all`}
          >
            {user.username}
            <IoIosArrowDown className="mt-2 ml-2" />
          </div>
        </div>
      </div>

      {profileMenu && (
        <div
          ref={wrapperRef}
          className={`fixed top-[10vh] left-7 w-[12rem] h-[10rem] bg-primary_dark shadow-xl shadow-primary_dark2 border-r-2 border-l-2 border-b-2 border-accent z-50 transition-all rounded-b-lg `}
        >
          <div className="w-full h-full flex flex-col justify-start items-center">
            <NavLink
              to={"#"}
              onClick={() => offProfileAndOpenModal()}
              className="w-full h-1/2  border-primary flex justify-center items-center text-font font-bold text-lg hover:text-white "
            >
              <CgProfile className=" text-2xl w-1/5"></CgProfile>
              <TbMinusVertical className=""></TbMinusVertical>
              <span className="w-3/5 text-center">المستخدم</span>
            </NavLink>
            <div className="w-full h-0.5 bg-primary "></div>
            <NavLink
              to={"/users"}
              onClick={() => setProfileMenu(false)}
              className="w-full h-1/2  border-primary flex justify-center items-center text-font font-bold text-lg hover:text-white "
            >
              <MdOutlineManageAccounts className=" text-2xl w-1/5"></MdOutlineManageAccounts>
              <TbMinusVertical className=""></TbMinusVertical>
              <span className="w-3/5 text-center"> إدارة المستخدمين</span>
            </NavLink>

            <div className="w-full h-0.5 bg-primary "></div>
            <button
              onClick={handleLogout}
              className="w-full h-1/2  border-primary flex justify-center items-center text-font  font-bold text-lg hover:text-white "
            >
              <MdLogout className="text-2xl  w-1/5 "></MdLogout>
              <TbMinusVertical className=""></TbMinusVertical>

              <span className="w-3/5 text-center"> تسجيل خروج</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
