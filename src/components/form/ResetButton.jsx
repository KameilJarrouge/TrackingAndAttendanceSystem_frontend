import { useFormikContext } from "formik";
import React from "react";
import { BiReset } from "react-icons/bi";

function ResetButton() {
  const { resetForm } = useFormikContext();

  return (
    <div
      onClick={resetForm}
      className="w-full h-full bg-primary rounded-lg text-2xl cursor-pointer  text-font border-[2px] flex justify-center items-center m-2  border-font px-2 py-1   hover:bg-font hover:text-primary hover:border-primary hover:transition-all`"
    >
      <BiReset />
    </div>
  );
}

export default ResetButton;
