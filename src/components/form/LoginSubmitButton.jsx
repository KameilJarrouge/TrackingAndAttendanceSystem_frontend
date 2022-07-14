import { useFormikContext } from "formik";
import React from "react";

function LoginSubmitButton({ title = null, svg = null }) {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      type="button"
      className={`bg-primary font-bold  text-accent rounded-lg text-3xl border-[2px] flex justify-center items-center m-2  border-accent px-2 py-1 
        hover:bg-accent hover:text-primary hover:border-primary hover:transition-all`}
      onClick={handleSubmit}
    >
      {title}
      {svg}
    </button>
  );
}

export default LoginSubmitButton;
