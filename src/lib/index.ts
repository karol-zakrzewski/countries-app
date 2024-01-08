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

export const getCountriesByCodes = async (
  codes: string | string[]
): Promise<Response.Error | Response.Success<Country[]>> => {
  const isCodesArray = Array.isArray(codes);
  const codesQuery = isCodesArray ? codes.join(",") : codes;
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${codesQuery}`
  );

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

export const getCountriesByCountryName = async (
  countryName: string
): Promise<Response.Error | Response.Success<Country[]>> => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );

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
