import React from "react";

import SideBarLink from "./SideBarLink";
function SideBar() {
  return (
    <div className=" w-full flex flex-col items-start mt-8 overflow-x-hidden">
      <SideBarLink to="people" title={"الأشخاص"} svg={"people"}></SideBarLink>

      {/* <SideBarLink to="students" title={"الطلاب"} svg={"student"}></SideBarLink> */}

      {/* <SideBarLink
        to="professors"
        title={"المدرسين"}
        svg={"professor"}
      ></SideBarLink> */}

      <SideBarLink
        to="subject"
        title={"المقررات"}
        svg={"subject"}
      ></SideBarLink>

      <SideBarLink to="camera" title={"الكاميرات"} svg={"camera"}></SideBarLink>
    </div>
  );
}

export default SideBar;
