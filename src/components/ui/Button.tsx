import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

export const Button = ({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      {...props}
      className="bg-white py-1 px-2 w-fit border shadow-lg rounded-md text-gray-600 dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:shadow-gray-900"
    >
      {children}
    </button>
  );
};
