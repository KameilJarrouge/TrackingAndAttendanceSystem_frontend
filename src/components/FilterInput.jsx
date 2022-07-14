import React, { useEffect, useRef, useState } from "react";

function FilterInput({ filterUpdateFunc = (f) => f }) {
  const [filterValue, setfilterValue] = useState("");
  const filter = useRef("");
  useEffect(() => {
    filterUpdateFunc(filterValue);
  }, [filterValue]);

  return (
    <div className=" ">
      <input
        ref={filter}
        type="text"
        placeholder="فلتر"
        value={filterValue}
        onChange={(e) => {
          setfilterValue(e.target.value);
        }}
        dir="rtl"
        className="pr-2 text-primary bg-background_input border-[0.2px] border-primary text-xl"
      />
    </div>
  );
}

export default FilterInput;
