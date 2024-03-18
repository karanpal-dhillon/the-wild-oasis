import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: async ({ newCabinData, id }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin updated successfully");
    },
    onError: (_error) => {
      console.log(_error);
      toast.error("Cabin could not be updated");
    },
  });
  return { isUpdating, updateCabin };
}
