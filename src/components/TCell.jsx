import React from "react";

function TCell({ children, width = "auto" }) {
  return (
    <td
      className={`overflow-hidden whitespace-nowrap px-1  text-primary font-semibold text-lg  text-center border-[1px] border-primary w-${width}`}
    >
      {children}
    </td>
  );
}

export default TCell;
