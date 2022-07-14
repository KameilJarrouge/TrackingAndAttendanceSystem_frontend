import { useFormikContext } from "formik";
import React from "react";

// import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import { Tooltip } from "../../Modals/Tooltip";

function AppFormDatePicker({
  name,
  height = "auto",
  className = "",
  title = "",
  format = "yyyy/MM/dd",
  disapleClock = true,
  clearIcon = false,
  itemsPos = "start",
  tooltipMessage = "",
  tooltipVisiable = false,
  ...otherProps
}) {
  const { setFieldValue, touched, errors, values } = useFormikContext();
  return (
    <Tooltip message={tooltipMessage} visible={tooltipVisiable}>
      <div
        className={` w-full h-${height} flex items-${itemsPos} justify-center `}
      >
        <div dir="rtl" className="flex flex-row w-full">
          {title !== "" && (
            <>
              <div
                className="flex items-center justify-center
              w-2/5 h-[2.0rem]
              text-xl rounded-r-lg
              text-font bg-primary"
              >
                {title}
              </div>
            </>
          )}
          <div
            dir="ltr"
            className={`${title !== "" ? "w-3/5" : "w-full"} h-[2.0rem]
          rounded-l-lg`}
          >
            {clearIcon ? (
              <DateTimePicker
                name={name}
                onChange={(value) => setFieldValue(name, value)}
                value={values[name]}
                format={format}
                disableClock={disapleClock}
                maxDate={new Date("2099-12-31")}
                calendarIcon={null}
                className={`w-full h-full 
               rounded-l-md text-center text-xl
               border-[0.1px] border-primary  text-primary  bg-background_input `}
                {...otherProps}
              />
            ) : (
              <DateTimePicker
                name={name}
                onChange={(value) => setFieldValue(name, value)}
                value={values[name]}
                format={format}
                disableClock={disapleClock}
                maxDate={new Date("2099-12-31")}
                calendarIcon={null}
                className={`w-full h-full 
               rounded-l-md text-center text-xl
               border-[0.1px] border-primary  text-primary  bg-background_input `}
                {...otherProps}
                clearIcon={null}
              />
            )}
          </div>
        </div>
      </div>
    </Tooltip>
  );
}

export default AppFormDatePicker;
