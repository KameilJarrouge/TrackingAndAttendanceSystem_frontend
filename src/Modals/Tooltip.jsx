export const Tooltip = ({ message, children, visible = false }) => {
  if (!visible) return <>{children}</>;
  return (
    <div className="relative flex flex-col items-center group ">
      {children}
      <div
        className={`absolute top-full rotate-180  flex flex-col items-center hidden   group-hover:flex`}
      >
        <span className="relative z-10 p-2 w-fit select-none text-sm rotate-180 leading-none text-right text-white whitespace-no-wrap bg-primary_dark  shadow-lg rounded-md">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
};
