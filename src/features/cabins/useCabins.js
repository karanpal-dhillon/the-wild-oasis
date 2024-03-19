import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { cabins, isLoading };
}
