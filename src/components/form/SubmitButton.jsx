import { useFormikContext } from "formik";
import React from "react";

function SubmitButton({ title = null, svg = null }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      type="button"
      className={`flex justify-center items-center 
        w-full h-full 
        rounded-lg text-2xl font-bold
        bg-primary text-accent  border-[2px]  border-accent  
        hover:bg-accent hover:text-primary hover:border-primary transition-all`}
      onClick={handleSubmit}
    >
      {title}
      {svg}
    </button>
  );
}

export default SubmitButton;
