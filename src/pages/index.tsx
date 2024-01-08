import { CountriesList } from "@/components/CountriesList";
import { FilterInputsSection } from "@/components/FilterInputsSection";
import { useFilterCountriesByNameAndRegion } from "@/hooks/useFilterCountriesByNameAndRegion";
import { getCountries } from "@/lib";
import { getRegions } from "@/lib/tools";
import { Country } from "@/lib/types";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

export const getStaticProps = (async (context) => {
  const res = await getCountries();

  if (!res.success) {
    return { notFound: true };
  }

  return { props: { countries: res.data } };
}) satisfies GetStaticProps<{
  countries: Country[];
}>;

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function Countries({ countries }: Props) {
  const { query } = useRouter();
  const region = Array.isArray(query.region) ? query.region[0] : query.region;
  const countryName = Array.isArray(query.country)
    ? query.country[0]
    : query.country;

  const filteredCountries = useFilterCountriesByNameAndRegion({
    countries,
    countryName,
    region,
  });

  return (
    <div className="max-w-screen-xl px-10 py-6 w-full flex flex-col gap-6">
      <FilterInputsSection regions={getRegions(countries)} />
      <CountriesList countries={filteredCountries} />
    </div>
  );
}
