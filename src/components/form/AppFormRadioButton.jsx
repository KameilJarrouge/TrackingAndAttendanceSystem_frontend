import { useFormikContext } from "formik";
import React from "react";

function AppFormRadioButton({
  editable = true,
  forced = false,
  fillBackground = false,
  border = false,
  name,
  buttons = [
    { name: "test", value: 1 },
    { name: "test2", value: 2 },
    { name: "test3", value: 3 },
  ],
}) {
  const { values, setFieldValue } = useFormikContext();
  const handleClick = (value) => {
    if (!editable) return;
    if (values[name] === value) {
      if (!forced) {
        setFieldValue(name, -1);
      }
    } else {
      setFieldValue(name, value);
    }
  };
  return (
    <div
      className={`flex flex-row 
          w-fit h-full items-center  ${
            border && "border-[0.2px] border-font py-1"
          }  `}
    >
      {buttons.map((button, index) => (
        <>
          <div
            key={button.value}
            onClick={() => handleClick(button.value)}
            className={`w-fit text-center mx-1 px-2 select-none
           text-xl font-semibold  transition-all
           cursor-pointer rounded-md  ${
             values[name] === button.value ? "text-accent " : "text-font "
           } ${fillBackground ? "bg-primary" : ""} `}
          >
            {button.name}
          </div>
          {index !== buttons.length - 1 && (
            <div className="w-0.5 h-1/3 bg-font text-xs text-font text-center">
              '
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default AppFormRadioButton;
