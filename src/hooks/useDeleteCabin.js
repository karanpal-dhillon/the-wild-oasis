import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../services/apiCabins";

export const useDeleteCabin = () => {
  const client = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: async ({ cabinId }) => deleteCabinApi(cabinId),
    onSuccess: () => {
      toast("Cabin deleted successfully", { type: "success" });
      client.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast("Cabin could not be deleted", { type: "error" });
    },
  });
  return { isDeleting, deleteCabin };
};
