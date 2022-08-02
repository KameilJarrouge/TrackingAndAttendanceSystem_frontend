import React from "react";
import { Tooltip } from "../Modals/Tooltip";
import TitleHeader from "./TitleHeader";
function SettingBox({ title, subTitle = null, children }) {
  return (
    <div className="w-[24%] h-full flex flex-col ">
      {/* title */}
      <div className="h-1/6">
        <TitleHeader>
          <div className="w-full h-full flex flex-col justify-center items-center text-xl">
            <Tooltip message={subTitle} visible={subTitle !== null}>
              <div>{title}</div>
            </Tooltip>
          </div>
        </TitleHeader>
      </div>
      {/* body */}
      <div className="h-5/6 w-full border-[0.2px] border-primary flex flex-col items-center ">
        {children}
      </div>
    </div>
  );
}

export default SettingBox;
