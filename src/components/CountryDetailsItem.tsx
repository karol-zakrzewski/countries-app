import { Option } from "@/lib/types";
import React from "react";

type Props = Option<string | number>;

export const CountryDetailsItem = ({ label, value }: Props) => {
  return (
    <div>
      <span className="font-semibold text-sm">{label}</span>
      {value}
    </div>
  );
};
