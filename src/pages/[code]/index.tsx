import { getCountriesByCodes } from "@/lib";
import { Country } from "@/lib/types";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { z } from "zod";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";
import { CountryBorders } from "@/components/CountryBorders";
import { CountryDetailsItem } from "@/components/CountryDetailsItem";

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

const paramsSchema = z.object({
  code: z.string(),
});

export const getStaticProps = (async (context) => {
  const result = paramsSchema.safeParse(context.params);

  if (!result.success) {
    return { notFound: true };
  }

  const res = await getCountriesByCodes(result.data.code);

  if (!res.success) {
    return { notFound: true };
  }

  return { props: { country: res.data[0] } };
}) satisfies GetStaticProps<{
  country: Country;
}>;

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function CountryDetails({ country }: Props) {
  const { back } = useRouter();

  const countryDetails = [
    {
      label: "Native Name: ",
      value: Object.values(country.name.nativeName).reverse()[0].common,
    },
    {
      label: "Population: ",
      value: country.population,
    },
    {
      label: "Region: ",
      value: country.region,
    },
    {
      label: "Subregion: ",
      value: country.subregion,
    },
    {
      label: "Capital: ",
      value: country.capital.map((c) => c).join(", "),
    },

    {
      label: "Top Level Domain: ",
      value: country.tld.map((domain) => domain).join(", "),
    },
    {
      label: "Currencies: ",
      value: Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", "),
    },
    {
      label: "Languages: ",
      value: Object.values(country.languages)
        .map((language) => language)
        .join(", "),
    },
  ];

  return (
    <div className="px-6 p-10 lg:px-10 w-full flex flex-col gap-14 dark:text-white">
      <Button onClick={back}>
        <div className="flex items-center gap-2 px-4">
          <IoIosArrowRoundBack className="text-2xl" />
          <span>Back</span>
        </div>
      </Button>

      <div className="flex justify-center">
        <div className="flex flex-col lg:flex-row gap-10">
          <div>
            <Image
              width={500}
              height={500}
              src={country.flags.png}
              alt={`flag of ${country.name.common}`}
              className="aspect-video"
            />
          </div>

          <div className="flex flex-col justify-evenly">
            <p className="font-bold text-2xl">{country.name.common}</p>

            <div className="grid grid-rows-5 grid-flow-col">
              {countryDetails.map(({ label, value }) => {
                return (
                  <CountryDetailsItem key={label} label={label} value={value} />
                );
              })}
            </div>

            <CountryBorders borders={country.borders} />
          </div>
        </div>
      </div>
    </div>
  );
}
