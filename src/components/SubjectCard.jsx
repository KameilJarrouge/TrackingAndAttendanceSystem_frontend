import React from "react";
import { MdChecklistRtl, MdRestartAlt, MdTimer } from "react-icons/md";
function SubjectCard({ className = "bg-primary", subject }) {
  return (
    <div
      className={`w-11/12 min-h-[7rem] rounded-xl ${className} flex flex-col items-center my-1 text-font`}
    >
      <div className="w-full h-3/5 flex flex-col items-center text-font  ">
        {/* info */}
        <div className="w-full flex items-center text-xl mt-1 justify-center font-bold">
          <div> تصميم وتحليل الشبكات الحاسوبية</div>
        </div>
        <div className="w-11/12 h-0.5 bg-background"></div>

        <div className="w-full flex flex-row-reverse justify-between text-lg  font-semibold  items-center px-3 pt-1">
          <div className="text-font/70">08:30</div>
          <div>08:00</div>
          <div>فئة:4</div>
          <div>نظري</div>
        </div>
      </div>
      <div className="w-11/12 h-0.5 bg-background"></div>
      <div className="w-full h-2/5 flex justify-evenly items-center">
        {/* actions */}
        <div className="border-[0.2px] h-6 border-font flex items-center px-2 rounded-lg">
          <MdChecklistRtl className="text-xl " />
          <div className="mr-1">4/20</div>
        </div>
        <div
          className={`border-[0.2px] h-6 border-font flex items-center px-2 rounded-lg hover:text-primary hover:bg-font transition-all cursor-pointer`}
        >
          <MdRestartAlt className={`text-xl `} />
        </div>
        <div
          className={`border-[0.2px] h-6 border-font flex items-center px-2 rounded-lg hover:text-primary hover:bg-font transition-all cursor-pointer `}
        >
          <MdTimer className="text-xl" />
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;
