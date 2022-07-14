import { useFormikContext } from "formik";
import React from "react";

function AppFormCheckBox2({
  name,
  input,
  className,
  double = false,
  textSize = "text-2xl",
}) {
  const { values, setFieldValue } = useFormikContext();
  const handleClick = () => {
    if (double) {
      if (values[name] === 1) {
        setFieldValue(name, 0);
      } else {
        setFieldValue(name, 1);
      }
    } else {
      if (values[name] === 1) {
        setFieldValue(name, -1);
      } else {
        setFieldValue(name, values[name] + 1);
      }
    }
  };
  return (
    <div
      className={`flex flex-row 
          w-full h-[2.8] `}
    >
      <div
        onClick={() => handleClick()}
        className={`
           w-auto h-full  px-1
           ${textSize}  transition-all
           cursor-pointer rounded-md  ${
             values[name] === 1
               ? `${className}`
               : values[name] === 0
               ? "text-blue-500 "
               : "text-font"
           } `}
      >
        {input}
      </div>
    </div>
  );
}

export default AppFormCheckBox2;
