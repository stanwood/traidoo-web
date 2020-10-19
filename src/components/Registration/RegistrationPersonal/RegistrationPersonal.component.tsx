import { yupResolver } from "@hookform/resolvers";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { APIValidationErrors } from "../../../api/errors/parser";
import { required } from "../../../utils/errors";
import RegistrationPersonalForm from "../RegistrationPersonalForm";
import { FormData } from "./interfaces";
import validationSchema from "./RegistrationPersonal.validation";

interface RegistrationPersonalProps {
  submit: any;
  apiErrors: APIValidationErrors[];
  data: any;
}

const RegistrationPersonal = (props: RegistrationPersonalProps) => {
  const { submit, apiErrors, data } = props;

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm<FormData>({
    defaultValues: data,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (formData: FormData) => {
    // @ts-ignore
    formData.birthday = format(formData.birthday, "yyyy-MM-dd");
    submit(formData);
  };
  // @ts-ignore
  const onClearError = (fieldName: string) => clearErrors(fieldName);

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
      apiErrors.forEach((apiError) => {
        // @ts-ignore
        setError(apiError.fieldName, {
          type: apiError.code,
          message: apiError.message,
        });
      });
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
