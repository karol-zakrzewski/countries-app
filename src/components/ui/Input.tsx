import { InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex items-center bg-white rounded-md gap-6 min-w-96 dark:bg-gray-700 dark:text-white">
      <span className="ml-6 text-gray-500 dark:text-white">
        <FaSearch />
      </span>
      <input
        {...props}
        type="text"
        className="bg-transparent w-full py-2 dark:placeholder:text-white"
      />
    </div>
  );
};
