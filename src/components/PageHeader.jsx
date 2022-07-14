import React from "react";

function PageHeader({ left, right, title }) {
  return (
    <div
      dir="rtl"
      className="w-full h-full bg-primary flex flex-row items-center "
    >
      <div className="flex flex-row items-center justify-start w-1/3 mr-4">
        {right}
      </div>
      <div className="flex flex-row items-center justify-center w-1/3">
        {title}
      </div>
      <div className="flex flex-row items-center justify-end w-1/3 ml-4">
        {left}
      </div>
    </div>
  );
}

export default PageHeader;
