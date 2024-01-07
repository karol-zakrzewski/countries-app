import { Country, Response } from "./types";

export const getCountries = async (): Promise<
  Response.Error | Response.Success<Country[]>
> => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (!response.ok) {
    return {
      success: false,
      error: "failed to fetch country data",
      data: null,
    };
  }

  const data: Country[] = await response.json();
  return {
    success: true,
    error: null,
    data,
  };
};

export const getCountry = async (
  code: string
): Promise<Response.Error | Response.Success<Country>> => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

  if (!response.ok) {
    return {
      success: false,
      error: "failed to fetch country data",
      data: null,
    };
  }

  const data: Country[] = await response.json();

  return {
    success: true,
    error: null,
    data: data[0],
  };
};
