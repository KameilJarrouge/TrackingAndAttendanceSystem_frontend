import React, { useState } from "react";
import { getUser } from "../api/user";

import SideBarLink from "./SideBarLink";
function SideBar() {
  const [user, setUser] = useState(getUser());

  return (
    <div className=" w-full flex flex-col items-start mt-8 overflow-x-hidden">
      {user.isAdmin === 1 ? (
        <>
          <SideBarLink
            to="people"
            title={"الأشخاص"}
            svg={"people"}
          ></SideBarLink>

          <SideBarLink
            to="subject"
            title={"المقررات"}
            svg={"subject"}
          ></SideBarLink>

          <SideBarLink
            to="camera"
            title={"الكاميرات"}
            svg={"camera"}
          ></SideBarLink>
        </>
      ) : (
        <>
          <SideBarLink
            to="my-subjects"
            title={"المقررات"}
            svg={"subject"}
          ></SideBarLink>

          <SideBarLink
            to="my-attendance"
            title={"الحضور"}
            svg={"checklist"}
          ></SideBarLink>
        </>
      )}
    </div>
  );
}

export default SideBar;
