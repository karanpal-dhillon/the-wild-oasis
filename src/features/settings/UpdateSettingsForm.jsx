import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { styled } from "styled-components";
import { useSettingsUpdate } from "./useSettingsUpdate";

const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-top: 2rem;
`;
const UpdateSettingsForm = () => {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { update, isUpdating } = useSettingsUpdate();

  const {
    register,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  function onSubmit(e) {
    const { id, value } = e.target;
    if (!id || !value) return;
    const invalidAndNotDirty =
      getFieldState(id).invalid || !getFieldState(id).isDirty;
    if (invalidAndNotDirty) return;
    update({ [id]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <>
      <Form>
        <FormRow
          labelText="Minimum nights/booking"
          errors={errors?.minBookingLength?.message}
        >
          <Input
            type="number"
            name="minBookingLength"
            id="minBookingLength"
            defaultValue={minBookingLength}
            disabled={isUpdating}
            {...register("minBookingLength", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Minimum booking length can not be less than 1",
              },
              onBlur: onSubmit,
            })}
          />
        </FormRow>
        <FormRow
          labelText="Maximum nights/booking"
          errors={errors?.maxBookingLength?.message}
        >
          <Input
            type="number"
            name="maxBookingLength"
            id="maxBookingLength"
            disabled={isUpdating}
            defaultValue={maxBookingLength}
            {...register("maxBookingLength", {
              onBlur: onSubmit,
              require: "This field is required",
              validate: (value) => {
                return (
                  value >= getValues().minBookingLength ||
                  "Max booking nights can not be less than min booking nights"
                );
              },
            })}
          />
        </FormRow>
        <FormRow
          labelText="Maximum guests per booking"
          errors={errors?.maxGuestsPerBooking?.message}
        >
          <Input
            type="number"
            name="maxGuestsPerBooking"
            disabled={isUpdating}
            defaultValue={maxGuestsPerBooking}
            id="maxGuestsPerBooking"
            {...register("maxGuestsPerBooking", {
              onBlur: onSubmit,
              require: "This field is required",
              min: {
                value: 1,
                message: "Minimum guests can not be less than 1",
              },
            })}
          />
        </FormRow>
        <FormRow
          labelText="Breakfast price"
          errors={errors?.breakfastPrice?.message}
        >
          <Input
            type="number"
            name="breakfastPrice"
            defaultValue={breakfastPrice}
            disabled={isUpdating}
            id="breakfastPrice"
            {...register("breakfastPrice", {
              onBlur: onSubmit,
              require: "This field is required",
              min: {
                value: 1,
                message: "Breakfast price can not be 0",
              },
            })}
          />
        </FormRow>
      </Form>
    </>
  );
};

UpdateSettingsForm.propTypes = {
  settings: PropTypes.array,
};

export default UpdateSettingsForm;
