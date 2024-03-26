import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

const Sort = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "nameAsc";
  const handleClick = (e) => {
    const { value } = e.target;
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleClick}
    />
  );
};

Sort.propTypes = {
  options: PropTypes.array,
};
export default Sort;
