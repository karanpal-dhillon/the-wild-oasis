import Filter from "../../ui/Filter";

const CabinTableOperations = () => {
  return (
    <Filter
      filterField="discount"
      options={[
        { label: "All", value: "all" },
        { label: "No Discount", value: "no-discount" },
        { label: "With Discount", value: "with-discount" },
      ]}
    />
  );
};

export default CabinTableOperations;
