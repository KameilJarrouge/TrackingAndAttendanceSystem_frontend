import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
// import AppText from "../AppText";
// import DisplayNumberAsString from "../DisplayNumberAsString";

function AppFormImage({
  name,
  imgUrl = "",
  id = 0,
  person_id = 0,
  onDelete = (f) => f,
  onUpdate = (f) => f,
  onCreate = (f) => f,
  ...otherProps
}) {
  const fileInput = useRef(null);
  const [img, setImg] = useState(imgUrl);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (img === "") {
      onCreate(person_id, file, name);
    } else {
      onUpdate(id, file, name);
    }
    setFieldValue(name, file);
    setImg(URL.createObjectURL(file));
  };
  useEffect(() => {
    setImg(imgUrl);
  }, [imgUrl]);

  const invokeInputFile = () => {
    fileInput.current.click();
  };

  const handleRemove = () => {
    setImg("");
    setFieldValue(name, undefined);
    onDelete(id);
  };

  const { setFieldValue } = useFormikContext();

  return (
    <div className="w-auto h-auto flex flex-col justify-start items-center">
      <div
        className="
      w-[220px] h-[220px] 
      border-[0.2px] border-primary "
      >
        <img
          src={img}
          alt={""}
          sizes="220px,220px"
          className="w-[220px] h-[220px]"
        />
      </div>
      <div className="w-full flex  items-center mt-0.5 font-bold text-xl ">
        <button
          onClick={invokeInputFile}
          className="w-full transition-all border-[0.2px]
          bg-primary text-accent border-primary
          hover:bg-accent hover:text-primary select-none "
        >
          {img !== "" ? "تغيير" : " إضافة صورة"}
        </button>
        {img !== "" && <div className="w-0.5 h-full bg-font" />}
        {img !== "" && (
          <button
            onClick={handleRemove}
            className="w-full transition-all border-[0.2px]
        bg-primary text-red-600 border-primary
        hover:bg-red-600 hover:text-primary select-none"
          >
            إزالة
          </button>
        )}
      </div>
      <input
        ref={fileInput}
        type="file"
        onChange={onImageChange}
        className="hidden"
      />
    </div>
  );
}

export default AppFormImage;
