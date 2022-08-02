import React from "react";

function TCell({
  children,
  width = "auto",
  fillColor = "",
  textColor = "primary",
  borderColor = "primary",
  ...props
}) {
  return (
    <td
      {...props}
      className={`overflow-hidden whitespace-nowrap px-1 bg-${fillColor}  text-${textColor} font-semibold text-base  text-center border-[1px] border-${borderColor} w-${width}`}
    >
      {children}
    </td>
  );
}

export default TCell;
