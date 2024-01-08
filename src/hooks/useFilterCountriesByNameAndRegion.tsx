import { filterCountriesByNameAndRegion } from "@/lib/tools";
import { Country } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Props = {
  countries: Country[];
  region?: string;
  countryName?: string;
};

export const useFilterCountriesByNameAndRegion = ({
  countries,
  countryName,
  region,
}: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["countries", countryName, region],
    queryFn: async () => {
      const res = await filterCountriesByNameAndRegion({
        countries,
        countryName,
        region,
      });

      return res;
    },
  });

  return { data, loading: isLoading };
};
