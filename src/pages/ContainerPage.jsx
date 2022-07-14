import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function ContainerPage() {
  let navigate = useNavigate();
  const [sideBarExtended, setSideBarExtended] = useState(true);
  useEffect(() => {
    if (window.location.href == "http://localhost:3000/")
      navigate("/dashboard");
  }, []);

  return (
    <>
      <div className="h-[10vh]  bg-primary  w-full  ">
        <Header></Header>
      </div>
      <div
        dir="rtl"
        className="h-[90vh]  bg-background w-full flex flex-row overflow-hidden "
      >
        {/* <div
          className={`${
            sideBarExtended ? "w-[20%]" : "w-[7%]"
          } bg-primary text-font min-h-full transition-all `}
        > */}
        <div
          className={`w-[7%] hover:w-[16%] z-50 
           bg-primary text-font min-h-full transition-all flex`}
        >
          <SideBar
            sideBarExtended={sideBarExtended}
            setSideBarExtended={setSideBarExtended}
          ></SideBar>
          <div className="w-[4px] h-full bg-accent"></div>
        </div>
        <div
          className={`w-[93%] left-0 top-[10vh] bottom-0 fixed h-full bg-background`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default ContainerPage;
