import { format } from "date-fns";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { required } from "../../../utils";
import RegistrationPersonalForm from "../RegistrationPersonalForm";
import { FormData } from "./interfaces";
import validationSchema from "./RegistrationPersonal.validation";

const RegistrationPersonal = ({ submit, apiErrors, data }: any) => {
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearError,
    getValues,
  } = useForm<FormData>({
    defaultValues: data,
    validationSchema,
  });

  const onSubmit = (formData: FormData) => {
    // @ts-ignore
    formData.birthday = format(formData.birthday, "yyyy-MM-dd");
    submit(formData);
  };
  // @ts-ignore
  const onClearError = (fieldName: string) => clearError(fieldName);

  useEffect(() => {
    register({ name: "birthday" }, { validate: required("Birthday") });
    register(
      { name: "nationalityCountryCode" },
      { validate: required("Nationality") }
    );
    register(
      { name: "residenceCountryCode" },
      { validate: required("Residence country") }
    );

    if (apiErrors) {
      Object.entries(apiErrors).forEach(
        ([field, errorMessage]: [string, any]) => {
          // @ts-ignore
          setError(field, "incorrectData", errorMessage);
        }
      );
    }
  }, [apiErrors, setError, register]);

  return (
    <RegistrationPersonalForm
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      data={data}
      onClearError={onClearError}
      getValues={getValues}
      setValue={(name: string, value: string) => setValue(name, value)}
    />
  );
};

export default RegistrationPersonal;