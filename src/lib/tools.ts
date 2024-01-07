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
  query?: string;
};

export const getCountries = ({ countries, query, region }: FilterProps) => {
  const countriesFilteredByQuery = filterByCountryName({ countries, query });
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
  query,
}: Omit<FilterProps, "region">) => {
  if (!query) {
    return countries;
  }

  return countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()) ||
      country.name.official.toLowerCase().includes(query.toLowerCase())
  );
};
