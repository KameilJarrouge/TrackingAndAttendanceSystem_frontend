import React from "react";

function TitleHeader({ children, className = "bg-primary text-font" }) {
  return (
    <div
      className={`w-full h-full ${className} text-2xl font-bold text-center flex justify-center items-center`}
    >
      {children}
    </div>
  );
}

export default TitleHeader;
