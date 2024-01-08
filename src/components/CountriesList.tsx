import { Country } from "@/lib/types";
import React from "react";
import { CountryCard } from "./CountryCard";
import { FaSpinner } from "react-icons/fa";

type Props = {
  countries: { data: Country[] | undefined; loading: boolean };
};

export const CountriesList = ({ countries: { data, loading } }: Props) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <FaSpinner className="w-10 h-10 dark:text-white animate-spin" />
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="dark:text-white text-center text-2xl">
        <p>Not found countries</p>
        <p>Change search parameters</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center lg:justify-between">
      {data?.map((country) => {
        return <CountryCard key={country.cca3} country={country} />;
      })}
    </div>
  );
};
