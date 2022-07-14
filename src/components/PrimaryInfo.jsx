import React from "react";

function PrimaryInfo({ text, oriantation = "right", svg = null }) {
  return (
    <div
      dir="rtl"
      className={`w-full p-1 text-2xl text-font rounded-lg bg-primary text-${oriantation}`}
    >
      {text}
      {svg}
    </div>
  );
}

export default PrimaryInfo;
