import Form from "../../ui/Form";
import styled from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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
      toast.error("Cabin could not be created");
    },
  });

  const onSubmit = async (data) => {
    mutate(data);
  };

  const onError = (errors) => {
    console.log("error", errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin Name</Label>
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
        {errors?.name?.message && <Error>{errors?.name?.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxCapacity">Maxium Capacity</Label>
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
        {errors?.maxCapacity?.message && (
          <Error>{errors?.maxCapacity?.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="regularPrice">Regular Price</Label>
        <Input
          type="text"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Minimum price should be at least 1" },
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors?.regularPrice?.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="discount">Discount</Label>
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
        {errors?.discount?.message && (
          <Error>{errors?.discount?.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Input
          type="text"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="image">Cabin Photo</Label>
        <Input type="text" id="image" />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? "Adding cabin..." : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}
