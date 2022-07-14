import React from "react";

function PageHeaderWSearch({ right, left }) {
  return (
    <div
      dir="rtl"
      className="w-full h-full bg-primary flex flex-row items-center "
    >
      {right && (
        <>
          <div className="flex h-full flex-row items-center justify-center w-[6%] ">
            {right}
          </div>
          <div className="w-0.5 h-full bg-background"></div>
        </>
      )}
      {/* flex flex-row items-center justify-end */}
      <div className={` w-full ml-4`}>{left}</div>
    </div>
  );
}

export default PageHeaderWSearch;
