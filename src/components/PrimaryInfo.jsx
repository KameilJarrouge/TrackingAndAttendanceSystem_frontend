import React from "react";

function PrimaryInfo({
  text,
  data = "",
  oriantation = "right",
  svg = null,
  textWidth = "2/5",
  dataWidth = "3/5",
}) {
  return (
    <div
      dir="rtl"
      className={`w-full p-1 my-2 text-lg flex text-font text-${oriantation}`}
    >
      {text && (
        <div
          className={`w-${textWidth} flex justify-center items-center p-1  text-xl  rounded-r-lg bg-primary border-[1px] border-primary`}
        >
          {text}
        </div>
      )}
      <div
        className={`w-${dataWidth} flex justify-center items-center p-1 ${
          text ? "rounded-l-lg" : "rounded-lg"
        } bg-background_special text-primary border-[1px] border-primary`}
      >
        {data}
      </div>
    </div>
  );
}

export default PrimaryInfo;
