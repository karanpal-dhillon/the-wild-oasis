import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/TextArea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FileInput from "../../ui/FileInput";

export default function CreateCabinForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const { isLoading, mutate } = useMutation({
    mutationFn: async (data) => await createCabin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin created successfully");
      reset();
    },
    onError: (_error) => {
      console.log(_error);
      toast.error("Cabin could not be created");
    },
  });

  const onSubmit = async (data) => {
    mutate({ ...data, image: data.image[0] });
  };

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
      <div>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? "Adding cabin..." : "Add cabin"}
        </Button>
      </div>
    </Form>
  );
}
