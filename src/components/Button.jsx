import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-700",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
