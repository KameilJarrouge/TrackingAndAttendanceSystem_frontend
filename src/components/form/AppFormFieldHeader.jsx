import { useFormikContext } from "formik";
import React, { useEffect } from "react";
// import AppText from "../AppText";
// import DisplayNumberAsString from "../DisplayNumberAsString";
import ErrorMessage from "./ErrorMessage";

function AppFormFieldHeader({ name, placeholder = "", ...otherProps }) {
  const { handleChange, setFieldTouched, touched, errors, values } =
    useFormikContext();

  return (
    <div
      className={`flex flex-col 
          w-full h-[2.2rem] `}
    >
      <div
        dir="rtl"
        className="flex flex-row
             w-full h-[2.2rem]"
      >
        <input
          className={`w-full  h-[2.2rem] pr-2
              border-[1px] border-primary  
              bg-background_input   
              text-xl text-primary 
              rounded-lg`}
          onChange={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          placeholder={placeholder}
          {...otherProps}
          value={values[name]}
        />
      </div>
    </div>
  );
}

export default AppFormFieldHeader;
