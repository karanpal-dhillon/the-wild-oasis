import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsModalOpen((curr) => !curr)}>
        Create new cabin
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateCabinForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default AddCabin;
