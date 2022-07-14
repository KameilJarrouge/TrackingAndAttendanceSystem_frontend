import { useFormikContext } from "formik";
import React from "react";
import { FaSearch } from "react-icons/fa";

function SubmitSearch() {
  const { handleSubmit } = useFormikContext();

  return (
    <FaSearch
      onClick={handleSubmit}
      className="text-4xl text-font hover:text-accent transition-all cursor-pointer"
    />
  );
}

export default SubmitSearch;
