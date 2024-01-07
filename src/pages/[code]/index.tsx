import { getCountry } from "@/lib";
import { Country } from "@/lib/types";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { z } from "zod";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";

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

  const res = await getCountry(result.data.code);

  if (!res.success) {
    return { notFound: true };
  }

  return { props: { country: res.data } };
}) satisfies GetStaticProps<{
  country: Country;
}>;

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function CountryDetails({ country }: Props) {
  const { back } = useRouter();
  return (
    <div className="p-10 w-full flex flex-col gap-14">
      <button
        onClick={back}
        className="flex items-center gap-2 bg-white py-2 px-10 border rounded-lg shadow-xl w-fit"
      >
        <IoIosArrowRoundBack className="text-2xl" />
        <span>Back</span>
      </button>
      <div className="flex gap-10">
        <div>
          <Image
            width={600}
            height={600}
            src={country.flags.png}
            alt={`flag of ${country.name.common}`}
            className="aspect-video"
          />
        </div>
        <div>
          <p className="font-bold text-2xl my-4">{country.name.common}</p>

          <div className="flex justify-between">
            <div>
              <p>
                <span className="font-semibold text-sm">Native Name: </span>
                {Object.values(country.name.nativeName).reverse()[0].common}
              </p>
              <p>
                <span className="font-semibold text-sm">Population: </span>
                {country.population}
              </p>
              <p>
                <span className="font-semibold text-sm">Region: </span>
                {country.region}
              </p>
              <p>
                <span className="font-semibold text-sm">Subregion: </span>
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold text-sm">Capital: </span>
                {country.capital.map((c) => c).join(", ")}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold text-sm">
                  Top Level Domain:{" "}
                </span>
                {country.tld.map((domain) => domain).join(", ")}
              </p>
              <p>
                <span className="font-semibold text-sm">Currencies: </span>
                {Object.values(country.currencies)
                  .map((currency) => currency.name)
                  .join(", ")}
              </p>
              <p>
                <span className="font-semibold text-sm">Languages: </span>
                {Object.values(country.languages)
                  .map((language) => language)
                  .join(", ")}
              </p>
            </div>
          </div>
          <p>
            <span className="font-semibold text-sm py-6">
              Border Countries:{" "}
            </span>
            {country.borders.map((border) => border).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
