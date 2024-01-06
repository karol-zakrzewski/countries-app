import { useQuery } from "@tanstack/react-query";

type Country = {
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string[];
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
};

const getCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (!response.ok) {
    throw Error("Failed to fetch data");
  }

  const data: Country[] = await response.json();
  return data;
};

export const useGetCountries = () => {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return query;
};
