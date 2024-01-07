import React from "react";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { useRouter } from "next/router";
import { Option } from "@/lib/types";

type Props = {
  regions: Option<string>[];
};
export const FilterInputsSection = ({ regions }: Props) => {
  const { push, query, pathname } = useRouter();
  const region = Array.isArray(query.region) ? query.region[0] : query.region;

  return (
    <div className="flex justify-between flex-col lg:flex-row gap-6 lg:items-center">
      <Input
        onChange={(event) => {
          const value = event.target.value;

          if (value === "") {
            delete query.country;
            push({
              pathname,
              query,
            });
            return;
          }

          push({
            pathname,
            query: {
              ...query,
              country: value,
            },
          });
        }}
        placeholder="Search for a country..."
      />

      <Select
        value={region ?? ""}
        onChange={(event) => {
          const value = event.target.value;

          if (value === "") {
            delete query.region;
            push({
              pathname,
              query,
            });
            return;
          }

          push({
            pathname,
            query: {
              ...query,
              region: value,
            },
          });
        }}
        options={regions}
      />
    </div>
  );
};
