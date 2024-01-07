import React from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/router";
import { useGetCountriesByCode } from "@/hooks/useGetCountriesByCode";

type Props = {
  borders: string[];
};

export const CountryBorders = ({ borders }: Props) => {
  const { push } = useRouter();
  const { data, isError, isLoading } = useGetCountriesByCode(borders);

  if (isError) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold text-sm py-6">Border Countries:</span>
      <div className="flex gap-1">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data?.map(({ name, cca3 }) => (
            <Button key={cca3} onClick={() => push(`/${cca3}`)}>
              <div className="text-xs">{name.common}</div>
            </Button>
          ))
        )}
      </div>
    </div>
  );
};
