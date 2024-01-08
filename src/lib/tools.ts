import { getCountriesByCountryName } from ".";
import { Country } from "./types";
import { Option } from "@/lib/types";

export const getRegions = (countries: Country[]) => {
  const options = countries.reduce<Option<string>[]>((acc, country) => {
    const region = country.region;

    const hasRegion = acc.some((option) => option?.value === region);
    if (hasRegion) {
      return acc;
    }
    acc.push({ label: country.region, value: country.region });
    return acc;
  }, []);

  return options;
};

type FilterProps = {
  countries: Country[];
  region?: string;
  countryName?: string;
};

export const filterCountriesByNameAndRegion = async ({
  countries,
  countryName,
  region,
}: FilterProps) => {
  const countriesFilteredByCountryQuery = await filterByCountryName({
    countries,
    countryName: countryName,
  });

  const countriesFilteredByRegion = filterByRegion({
    countries: countriesFilteredByCountryQuery,
    region,
  });

  return countriesFilteredByRegion;
};

const filterByRegion = ({ region, countries }: Omit<FilterProps, "query">) => {
  if (!region) {
    return countries;
  }

  return countries.filter((country) => country.region === region);
};

const filterByCountryName = async ({
  countries,
  countryName,
}: Omit<FilterProps, "region">) => {
  if (!countryName) {
    return countries;
  }

  const res = await getCountriesByCountryName(countryName);

  if (!res.success) {
    return countries;
  }

  return res.data;
};
