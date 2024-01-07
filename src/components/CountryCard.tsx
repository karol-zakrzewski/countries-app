import { Country } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  country: Country;
};

export const CountryCard = ({ country }: Props) => {
  const { cca3, flags, name, population, region, capital } = country;
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
};
