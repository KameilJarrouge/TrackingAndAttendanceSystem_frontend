import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { Tooltip } from "../../Modals/Tooltip";
// import AppText from "../AppText";
// import DisplayNumberAsString from "../DisplayNumberAsString";
import ErrorMessage from "./ErrorMessage";

function AppFormField({
  name,
  title = "",
  disabled = false,
  // displayNumberAsString = false,
  svg = null,
  infoWidth = "2/5",
  inputWidth = "3/5",
  tooltipMessage = "",
  tooltipVisiable = false,
  withError = true,
  zIndex = "50",

  ...otherProps
}) {
  const { handleChange, setFieldTouched, touched, errors, values } =
    useFormikContext();

  return (
    <div
      className={`flex flex-col 
        w-full h-${withError ? "[3.5rem]" : "[2rem]"} `}
    >
      <Tooltip
        message={tooltipMessage}
        visible={tooltipVisiable}
        zIndex={zIndex}
      >
        <div
          dir="rtl"
          className="flex flex-row 
          w-full h-[2.0rem]"
        >
          <div
            className={`flex items-center justify-center
            w-${infoWidth} h-[2.0rem] 
            rounded-r-lg text-xl 
            text-font bg-primary `}
          >
            {title}
            {svg}
          </div>
          <input
            disabled={disabled}
            className={`w-${inputWidth}  h-[2.0rem] pr-2
          border-[1px] border-primary  
          bg-background_input   
          text-xl text-primary 
          rounded-l-lg`}
            onChange={handleChange(name)}
            onBlur={() => setFieldTouched(name)}
            {...otherProps}
            value={values[name]}
          />
        </div>
      </Tooltip>
      {/* {displayNumberAsString && <DisplayNumberAsString value={values[name]} />} */}
      {withError && (
        <div
          dir="rtl"
          className="flex flex-row justify-start 
        h-[1.5rem]
        pr-2"
        >
          <ErrorMessage
            visible={touched[name]}
            error={errors[name]}
          ></ErrorMessage>
        </div>
      )}
    </div>
  );
}

export default AppFormField;
