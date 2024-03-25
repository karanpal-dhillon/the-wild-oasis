import styled from "styled-components";
import Button from "../../ui/Button";
import PropTypes from "prop-types";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../../hooks/useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;
//
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
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isCreating, create } = useCreateCabin();

  const onDuplicate = () => {
    create({
      name: `Copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      image,
      discount,
      description,
    });
  };
  return (
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{regularPrice}</Price>
      <Discount>{discount > 0 ? discount : "-"}</Discount>
      <ActionButtonsRow>
        <Button
          variation="secondary"
          size="small"
          onClick={onDuplicate}
          disabled={isCreating}
        >
          Duplicate
        </Button>
        <Modal>
          <Modal.Open opens="edit-cabin">
            <Button variation="secondary" size="small">
              Edit
            </Button>
          </Modal.Open>
          <Modal.Window name="edit-cabin">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.Open opens="confirm-delete">
            <Button variation="danger" size="small">
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </Modal.Open>
          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin({ cabinId: id })}
            />
          </Modal.Window>
        </Modal>
      </ActionButtonsRow>
    </Table.Row>
  );
};

CabinRow.propTypes = {
  cabin: PropTypes.object,
};
export default CabinRow;
