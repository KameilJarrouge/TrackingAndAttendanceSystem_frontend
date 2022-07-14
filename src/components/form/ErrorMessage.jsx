import React from "react";
function ErrorMessage({ visible, error }) {
  if (!visible || !error) {
    return null;
  }
  return (
    <div className={"text-red-500 font-semibold text-right"}>
      {"* " + error}{" "}
    </div>
  );
}

export default ErrorMessage;
