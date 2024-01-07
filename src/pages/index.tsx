import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useGetCountries } from "@/hooks/useGetCountries";
import { getCountries, getRegions } from "@/lib/tools";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const getStaticProps = (async (context) => {
  return { props: {} };
}) satisfies GetStaticProps<{}>;

export default function Countries() {
  const { data, error, isLoading } = useGetCountries();
  const { pathname, query, push } = useRouter();
  const region = Array.isArray(query.region) ? query.region[0] : query.region;
  const country = Array.isArray(query.country)
    ? query.country[0]
    : query.country;

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const countries = getCountries({ countries: data, query: country, region });

  return (
    <div className="max-w-screen-xl px-10 py-6 w-full flex flex-col gap-6">
      <div className="flex justify-between flex-col lg:flex-row gap-6 lg:items-center">
        <Input
          onChange={(event) => {
            const value = event.target.value;

            if (value === "") {
              delete query.country;
              push({
                pathname,
                query,
              });
              return;
            }

            push({
              pathname,
              query: {
                ...query,
                country: value,
              },
            });
          }}
          placeholder="Search for a country..."
        />

        <Select
          value={region}
          onChange={(event) => {
            const value = event.target.value;

            if (value === "") {
              delete query.region;
              push({
                pathname,
                query,
              });
              return;
            }

            push({
              pathname,
              query: {
                ...query,
                region: value,
              },
            });
          }}
          options={getRegions(data)}
        />
      </div>
      <div className="flex flex-wrap gap-6 justify-center lg:justify-between">
        {countries.map(({ name, cca3, flags, capital, population, region }) => {
          return (
            <Link
              href={`/${cca3}`}
              key={cca3}
              className="bg-white rounded-lg shadow-lg dark:bg-gray-700 text-white w-full sm:w-fit"
            >
              <Image
                width={256}
                height={200}
                src={flags.png}
                alt={`flag of ${name}`}
                className="aspect-video rounded-t-lg w-full sm:w-fit"
              />
              <div className="p-4">
                <p className="font-bold mb-2">{name.common}</p>
                <p>
                  <span className="font-semibold text-sm">Population: </span>
                  {population}
                </p>
                <p>
                  <span className="font-semibold text-sm">Region: </span>
                  {region}
                </p>
                <p>
                  <span className="font-semibold text-sm">Capital: </span>
                  {capital}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
