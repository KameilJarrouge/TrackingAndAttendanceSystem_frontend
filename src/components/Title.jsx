import React from "react";

function Title({ title = "", onClick = (f) => f, className = "" }) {
  return (
    <div className={`text-2xl text-background ${className}`} onClick={onClick}>
      {title}
    </div>
  );
}

export default Title;
