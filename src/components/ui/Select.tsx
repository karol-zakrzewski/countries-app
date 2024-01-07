import { Option } from "@/lib/types";
import { SelectHTMLAttributes } from "react";

type Props<T> = {
  options: Option<T>[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = <T extends string | number>({
  options,
  ...props
}: Props<T>) => {
  return (
    <select
      {...props}
      className="w-fit p-2 rounded-md focus:outline-none dark:bg-gray-700 dark:text-white"
    >
      <option value="">Filter by Region</option>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
