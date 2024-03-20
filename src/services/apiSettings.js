import supabase from "./supabase";
import { toast } from "react-hot-toast";

export async function getSettings() {
  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();
  if (error) {
    console.error(error);
    toast("Could not load settings");
  }
  return settings;
}

export async function updateSettings(settings) {
  const { _data, error } = await supabase
    .from("settings")
    .update(settings)
    .eq("id", 1) // Since there can be only one row in the settings master table.
    .select();
  if (error) {
    throw new Error("Could not update settings");
  }
}
