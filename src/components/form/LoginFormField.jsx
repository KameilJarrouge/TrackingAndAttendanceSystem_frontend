import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
// import AppText from "../AppText";
// import DisplayNumberAsString from "../DisplayNumberAsString";

function LoginFormField({
  name,
  title = "",
  type = "text",
  // displayNumberAsString = false,
  svg = null,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, touched, errors, values } =
    useFormikContext();

  return (
    <div className={`text-left mx-2 flex flex-col `}>
      <div className="flex flex-col justify-start my-2">
        <div className="text-3xl mb-2 h-[2.0rem]  rounded-r-lg text-font flex justify-end ">
          {title}
          {svg}
        </div>
        <input
          type={type}
          className={` px-1 h-[2.0rem]  text-xl  rounded-lg text-primary bg-background_input `}
          onChange={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
          value={values[name]}
        />
        <div className="w-full flex justify-end">
          <ErrorMessage
            visible={touched[name]}
            error={errors[name]}
          ></ErrorMessage>
        </div>
      </div>
    </div>
  );
}

export default LoginFormField;
