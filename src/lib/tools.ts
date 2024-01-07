import { Country } from "./types";
import { Option } from "@/lib/types";

export const getRegions = (countries: Country[]) => {
  // TODO: save to json
  // TODO: get regions instead options
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

export const filterCountriesByNameAndRegion = ({
  countries,
  countryName,
  region,
}: FilterProps) => {
  const countriesFilteredByQuery = filterByCountryName({
    countries,
    countryName: countryName,
  });
  const countriesFilteredByRegion = filterByRegion({
    countries: countriesFilteredByQuery,
    region,
  });
  return countriesFilteredByRegion;
};

const filterByRegion = ({ countries, region }: Omit<FilterProps, "query">) => {
  if (!region) {
    return countries;
  }
  return countries.filter((country) => country.region.includes(region));
};
const filterByCountryName = ({
  countries,
  countryName,
}: Omit<FilterProps, "region">) => {
  if (!countryName) {
    return countries;
  }

  return countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(countryName.toLowerCase()) ||
      country.name.official.toLowerCase().includes(countryName.toLowerCase())
  );
};
