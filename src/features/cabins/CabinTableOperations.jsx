import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import styled from "styled-components";

const StyledTableOperation = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const CabinTableOperations = () => {
  return (
    <StyledTableOperation>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No Discount", value: "no-discount" },
          { label: "With Discount", value: "with-discount" },
        ]}
      />
      <Sort
        options={[
          { label: "By Name(asc)", value: "name-asc" },
          { label: "By Name(desc)", value: "name-desc" },
          { label: "By capacity(asc)", value: "maxCapacity-asc" },
          { label: "By Capacity(desc)", value: "maxCapacity-desc" },
          { label: "By Price(asc)", value: "regularPrice-asc" },
          { label: "By Price(desc)", value: "regularPrice-desc" },
        ]}
      />
    </StyledTableOperation>
  );
};

export default CabinTableOperations;
