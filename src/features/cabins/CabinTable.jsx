import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();
  const [searchParams, _] = useSearchParams();
  const discount = searchParams.get("discount") || "all";
  if (isLoading) return <Spinner />;
  let filteredCabins;
  if (discount === "all") {
    filteredCabins = cabins;
  } else if (discount === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (discount === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [sortKey, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  filteredCabins = filteredCabins.sort(
    (a, b) => (a[sortKey] - b[sortKey]) * modifier,
  );

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 2fr">
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </Table.Header>
      <Table.Body
        data={filteredCabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
};

export default CabinTable;
