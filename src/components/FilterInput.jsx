import React, { useEffect, useRef, useState } from "react";

function FilterInput({ filterUpdateFunc = (f) => f, placeholder = "" }) {
  const [filterValue, setfilterValue] = useState("");
  const filter = useRef("");

  const handleSetValue = (value) => {
    setfilterValue(value.replace("\\", ""));
  };
  useEffect(() => {
    filterUpdateFunc(filterValue);
  }, [filterValue]);

  return (
    <div className=" ">
      <input
        ref={filter}
        type="text"
        placeholder={placeholder}
        value={filterValue}
        onChange={(e) => {
          handleSetValue(e.target.value);
        }}
        dir="rtl"
        className="pr-2 text-primary bg-background_input border-[0.2px] border-primary text-lg"
      />
    </div>
  );
}

export default FilterInput;
