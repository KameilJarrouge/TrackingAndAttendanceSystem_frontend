import React from "react";
import SubjectsBox from "../components/SubjectsBox";

function DashboardPage() {
  return (
    <div className="py-14 px-14 h-[90vh] bg-background ">
      {/* main box */}
      <div className="w-full h-full  flex flex-row-reverse justify-between">
        {/* previous subjects box */}
        <div className="w-[31%] h-full border-2 border-primary ">
          <SubjectsBox
            className={"bg-primary_dark text-font"}
            title="المحاضرات السابقة"
          ></SubjectsBox>
        </div>

        {/* current subjects box */}
        <div className="w-[31%] h-full border-2 border-primary ">
          <SubjectsBox title={"المحاضرات الحالية"}></SubjectsBox>
        </div>

        {/* future subjects box */}
        <div className="w-[31%] h-full border-2 border-primary">
          <SubjectsBox
            className={"bg-primary_dark text-font"}
            title="المحاضرات التالية"
          ></SubjectsBox>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
