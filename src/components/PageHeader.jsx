import React from "react";

function PageHeader({
  left,
  right,
  title,
  withBorder = false,
  border = "",
  leftWidth = "1/3",
  rightWidth = "1/3",
  titleWidth = "1/3",
}) {
  return (
    <div
      dir="rtl"
      className={`w-full h-full bg-primary flex flex-row items-center text-base ${
        withBorder && border
      } `}
    >
      <div
        className={`flex flex-row items-center justify-start w-${rightWidth} mr-4`}
      >
        {right}
      </div>
      <div
        className={`flex flex-row items-center justify-center w-${titleWidth}`}
      >
        {title}
      </div>
      <div
        className={`flex flex-row items-center justify-end w-${leftWidth} ml-4`}
      >
        {left}
      </div>
    </div>
  );
}

export default PageHeader;
