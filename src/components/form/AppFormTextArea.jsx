import { useFormikContext } from "formik";
import React from "react";
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";

function AppFormTextArea({ name, className = "", title = "", ...otherProps }) {
  const { handleChange, setFieldTouched, touched, errors, values } =
    useFormikContext();

  return (
    <div className={`text-left m-1 flex flex-col `}>
      <AppText className={"text-darkGray font-bold"}>{title}</AppText>
      <textarea
        className={`pl-1 shadow-md shadow-darkGray border-[1px] text-lg border-darkGray ${className}`}
        onChange={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
        value={values[name]}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]}></ErrorMessage>
    </div>
  );
}

export default AppFormTextArea;
