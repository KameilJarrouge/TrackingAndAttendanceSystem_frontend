import React from "react";
import TitleHeader from "./TitleHeader";
function SettingBox({ title, subTitle = null, children }) {
  return (
    <div className="w-[24%] h-full flex flex-col ">
      {/* title */}
      <div className="h-1/5">
        <TitleHeader>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div>{title}</div>
            <div>{subTitle}</div>
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
