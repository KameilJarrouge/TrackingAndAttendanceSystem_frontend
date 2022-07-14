import { useFormikContext } from "formik";
import React from "react";
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";
import DisplayNumberAsString from "../DisplayNumberAsString";
function AppFormFieldAD({
  name,
  className = "",
  title = "",
  f1,
  f2,
  ...otherProps
}) {
  const {
    handleChange,
    setFieldTouched,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormikContext();

  return (
    <div className={`text-left m-1 flex flex-col `}>
      <AppText className={"text-darkGray font-bold"}>{title}</AppText>
      <input
        className={`pl-1 shadow-md shadow-darkGray border-[1px] text-lg border-darkGray ${className}`}
        onChange={
          values[f1] === 0 && values[f2] === 0
            ? handleChange(name)
            : () => setFieldValue(name, values[f1] * values[f2])
        }
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
        value={
          values[f1] === 0 && values[f2] === 0
            ? values[name]
            : values[f1] * values[f2]
        }
      />
      <DisplayNumberAsString
        value={
          values[f1] === 0 && values[f2] === 0
            ? values[name]
            : values[f1] * values[f2]
        }
      ></DisplayNumberAsString>

      <ErrorMessage visible={touched[name]} error={errors[name]}></ErrorMessage>
    </div>
  );
}

export default AppFormFieldAD;
