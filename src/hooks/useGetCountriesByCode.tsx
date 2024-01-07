import { getCountriesByCodes } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const useGetCountriesByCode = (codes: string[]) => {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await getCountriesByCodes(codes);

      if (!res.success) {
        throw Error("Field to fetch");
      }

      return res.data;
    },
  });

  return query;
};
