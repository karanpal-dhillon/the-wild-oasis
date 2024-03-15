import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Textarea from "../../ui/TextArea";
import FileInput from "../../ui/FileInput";
import PropTypes from "prop-types";
import { updateCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

const EditCabinForm = ({ cabin, setShowForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: cabin });
  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    mutate({ cabin: data, id: cabin.id });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  const { mutate } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin updated successfully");
      setShowForm((show) => !show);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Cabin could not be updated");
    },
  });

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
      <div>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Edit Cabin</Button>
        {/* <Button disabled={isLoading}> */}
        {/*   {isLoading ? "Adding cabin..." : "Add cabin"} */}
        {/* </Button> */}
      </div>
    </Form>
  );
};

EditCabinForm.propTypes = {
  cabin: PropTypes.object,
  setShowForm: PropTypes.func,
};
export default EditCabinForm;
