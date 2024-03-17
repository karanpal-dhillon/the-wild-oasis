import styled from "styled-components";
import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ActionButtonsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CabinRow = ({ cabin }) => {
  const [showForm, setShowForm] = useState(false);

  const client = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: async ({ cabinId }) => deleteCabin(cabinId),
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

  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{regularPrice}</Price>
        <Discount>{discount}</Discount>
        <ActionButtonsRow>
          <Button
            variation="secondary"
            size="small"
            onClick={() => setShowForm((show) => !show)}
          >
            Edit
          </Button>
          <Button
            variation="danger"
            size="small"
            onClick={() => mutate({ cabinId: id })}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </ActionButtonsRow>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.object,
};
export default CabinRow;
