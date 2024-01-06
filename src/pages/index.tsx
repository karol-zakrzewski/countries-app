import { useGetCountries } from "@/hooks/useGetCountries";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data, error, isLoading } = useGetCountries();

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <Link
      href="/"
      className="max-w-screen-xl flex flex-wrap gap-6 px-10 py-6 w-full justify-center"
    >
      {data &&
        data?.map(({ name, cca3, flags, capital, population, region }) => {
          return (
            <div key={cca3} className="bg-white border rounded-lg shadow-lg">
              <Image
                width={200}
                height={200}
                src={flags.png}
                alt={`flag of ${name}`}
                className="w-full aspect-video rounded-t-lg"
              />
              <div className="p-4">
                <p className="font-bold mb-2">{name.common}</p>
                <p>
                  <span className="font-semibold text-sm">Population:</span>{" "}
                  {population}
                </p>
                <p>
                  <span className="font-semibold text-sm">Region:</span>{" "}
                  {region}
                </p>
                <p>
                  <span className="font-semibold text-sm">Capital:</span>{" "}
                  {capital}
                </p>
              </div>
            </div>
          );
        })}
    </Link>
  );
}
