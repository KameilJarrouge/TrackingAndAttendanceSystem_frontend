import React, { useEffect, useState } from "react";
import FilterInput from "./FilterInput";
import SubjectCard from "./SubjectCard";
import TitleHeader from "./TitleHeader";

function SubjectsBox({ className, title, data = [{}, {}, {}, {}], data_type }) {
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      setFilteredData(data.filter((subject) => subject.name.match(filter)));
    } else {
      setFilteredData(data);
    }
  }, [filter, data]);

  return (
    <div className="w-full h-full">
      {/* header */}
      <div className="w-full h-[10%]">
        <TitleHeader className={className}>{title}</TitleHeader>
      </div>
      {/* body */}
      <div className="w-full h-[90%] flex flex-col items-center">
        {/* filter */}
        <div className="w-5/6 h-[10%] flex justify-center items-center">
          <FilterInput filterUpdateFunc={setFilter}></FilterInput>
        </div>
        {/* subject scroll box */}
        <div className="w-full h-[90%] overflow-y-scroll flex flex-col items-center px-2 mt-1">
          {/* subjects cards */}
          {filteredData.map((subject) => (
            <SubjectCard className={className}></SubjectCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubjectsBox;
