import React from "react";

function THeader({ children, width = "auto", ...props }) {
  return (
    <th
      {...props}
      className={`text-xl border-collapse border-[1px] border-primary w-${width} bg-primary text-font `}
    >
      {children}
    </th>
  );
}

export default THeader;
