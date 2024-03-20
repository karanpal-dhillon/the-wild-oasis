import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/TextArea";
import { useForm } from "react-hook-form";
import FileInput from "../../ui/FileInput";
import PropTypes from "prop-types";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { styled } from "styled-components";

const ButtonsRow = styled.div`
  display: flex;
  gap: 2rem;
`;

export default function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: cabinId, ...restValues } = cabinToEdit;
  const isEditing = Boolean(cabinId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditing ? restValues : {},
  });

  const { isCreating, create } = useCreateCabin();
  const { isUpdating, updateCabin } = useEditCabin();

  const onSubmit = async (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditing) {
      updateCabin(
        { newCabinData: { ...data, image }, id: cabinId },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    } else {
      create({ ...data, image }, { onSuccess: () => reset() });
    }
  };

  const isWorking = isCreating || isUpdating;

  const onError = (errors) => {
    console.log("error", errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow labelText="Cabin Name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This filed is required",
            minLength: {
              value: "2",
              message: "Name should be at least 2 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        labelText="Maximum capacity"
        errors={errors?.maxCapacity?.message}
      >
        <Input
          type="text"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Max capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow labelText="Regular Price" errors={errors?.regularPrice?.message}>
        <Input
          type="text"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Minimum price should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow labelText="Discount" errors={errors?.discount?.message}>
        <Input
          type="text"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                "Discount can not be more than regular price"
              );
            },
          })}
        />
      </FormRow>
      <FormRow labelText="Description" errors={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>
      <FormRow labelText="Cabin Photo">
        <FileInput id="image" {...register("image")} />
      </FormRow>
      <ButtonsRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditing ? "Edit cabin" : "Add cabin"}
        </Button>
      </ButtonsRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
};
