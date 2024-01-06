import { useGetCountries } from "@/hooks/useGetCountries";
import Image from "next/image";

export default function Home() {
  const { data, error, isLoading } = useGetCountries();

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Coutries</h2>
      <ul className="flex flex-col gap-4">
        {data &&
          data?.map(({ name, cca3, flags, capital, population, region }) => {
            return (
              <li key={cca3} className="p-4 border">
                <Image
                  width={300}
                  height={300}
                  src={flags.png}
                  alt={`flag of ${name}`}
                />
                <p>{name.common}</p>
                <p>Population: {population}</p>
                <p>Region: {region}</p>
                <p>Capital: {capital}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
