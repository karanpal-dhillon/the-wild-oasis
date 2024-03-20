import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export function useSettingsUpdate() {
  const queryClient = useQueryClient();
  const { mutate: update, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Settings could not be updated");
    },
  });
  return { update, isUpdating };
}
