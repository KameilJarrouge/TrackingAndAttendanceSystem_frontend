import { useFormikContext } from "formik";
import React, { useEffect } from "react";
// import AppText from "../AppText";
// import DisplayNumberAsString from "../DisplayNumberAsString";
import ErrorMessage from "./ErrorMessage";

function AppFormCheckBox({
  name,
  title = "",
  // displayNumberAsString = false,
  svg = null,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, touched, errors, values } =
    useFormikContext();

  return (
    <div
      className={` flex flex-col
        w-full h-full `}
    >
      {/* input */}
      <div
        className="flex flex-row 
            w-full h-4/5"
      >
        <div
          className=" flex items-center justify-center
            text-xl rounded-r-lg
            w-4/5 h-[2.8rem] 
           text-font bg-primary"
        >
          {title}
          {svg}
        </div>
        <input
          type={"checkbox"}
          checked={values[name]}
          // value={values[name] === "on"}
          className={`w-1/5 h-[2.8rem] 
            pr-2   `}
          onChange={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
          // value={values[name]}
        />
      </div>
      {/* Error */}
      <div
        className="flex flex-row justify-center items-center
            w-full h-1/5 
            text-right"
      >
        <ErrorMessage
          visible={touched[name]}
          error={errors[name]}
        ></ErrorMessage>
      </div>
    </div>
  );
}

export default AppFormCheckBox;
