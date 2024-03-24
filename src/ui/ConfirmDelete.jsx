import styled from "styled-components";
import PropTypes from "prop-types";
import Heading from "./Heading";
import Button from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const ConfirmDelete = ({ resourceName, onConfirm, disabled, onClose }) => {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete {resourceName}? This can not be undone
      </p>
      <div>
        <Button disabled={disabled} variation="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  disabled: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ConfirmDelete;
