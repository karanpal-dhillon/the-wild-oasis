import { useSettings } from "../features/settings/useSettings";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";

const Settings = () => {
  const { isLoading, settings } = useSettings();
  if (isLoading) return <Spinner />;
  console.log(settings);
  return <Heading as="h1">Update hotel settings</Heading>;
};

export default Settings;
