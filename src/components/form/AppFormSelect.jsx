import { useFormikContext } from "formik";
import React from "react";

function AppFormSelect({
  name,
  options,
  title = "test",
  defaultOption = null,
  valueAttr = "location",
  renderAttr = "location",
  infoWidth = "1/6",
  selectWidth = "5/6",
}) {
  const { values, setFieldValue } = useFormikContext();
  const handleSelect = (value) => {
    setFieldValue(name, value);
  };

  return (
    <div
      className={` 
          w-full h-full flex `}
    >
      <div
        className={`w-${infoWidth} text-font bg-primary border-[0.2px] border-primary rounded-r-lg text-xl px-2  font-semibold flex items-center  `}
      >
        {title}
      </div>

      <select
        onChange={(event) => handleSelect(event.target.value)}
        className={`bg-background_input  text-primary font-semibold rounded-l-lg border-primary border-[0.2px] w-${selectWidth} text-center `}
        value={values[name]}
      >
        {defaultOption && (
          <option value={defaultOption}>{defaultOption}</option>
        )}
        {options.map((option) => (
          <option
            key={option[valueAttr]}
            className=""
            value={option[valueAttr]}
          >
            {option[renderAttr]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AppFormSelect;
