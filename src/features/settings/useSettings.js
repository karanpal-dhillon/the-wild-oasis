import { useQuery } from "@tanstack/react-query";
import supabase from "../../services/supabase";
import { toast } from "react-hot-toast";

export function useSettings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryfn: async () => {
      const { data: settings, error } = await supabase
        .from("settings")
        .select("*");
      if (error) {
        console.error(error);
        toast("Could not load settings");
      }
      console.log(settings);
      return settings;
    },
  });
  return { isLoading, settings };
}
