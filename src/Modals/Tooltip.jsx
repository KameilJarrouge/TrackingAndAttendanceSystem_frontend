export const Tooltip = ({
  message,
  children,
  visible = false,
  textSize = "sm",
  background = "primary_dark",
  textColor = "font",
  zIndex = "50",
  className = "",
  nowrap = false,
}) => {
  if (!visible) return <>{children}</>;
  return (
    <div className={`${className} relative flex flex-col items-center group `}>
      {children}
      <div
        className={`absolute top-full rotate-180  flex flex-col items-center hidden   group-hover:flex`}
      >
        <span
          className={`relative z-${zIndex} p-2 w-fit ${
            nowrap && "whitespace-nowrap"
          } select-none text-${textSize} rotate-180 leading-none text-right text-${textColor} whitespace-no-wrap bg-${background}  shadow-lg rounded-md`}
        >
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
};
