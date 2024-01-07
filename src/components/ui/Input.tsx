import { InputHTMLAttributes } from "react";
import { FaSearch } from "react-icons/fa";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex items-center bg-white rounded-md gap-6 min-w-96">
      <span className="ml-6">
        <FaSearch className="text-gray-500" />
      </span>
      <input {...props} type="text" className="bg-transparent w-full py-2" />
    </div>
  );
};
