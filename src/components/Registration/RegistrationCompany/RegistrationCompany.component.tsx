import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { required } from "../../../utils";
import RegistrationCompanyForm from "../RegistrationCompanyForm";
import { FormData } from "./interfaces";
import validationSchema from "./RegistrationCompany.validation";

const RegistrationCompany = ({ submit, cancel, data, apiErrors }: any) => {
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearError,
    getValues,
    triggerValidation,
  } = useForm<FormData>({
    defaultValues: data,
    validationSchema: validationSchema,
  });
  const onSubmit = (formData: FormData) => submit(formData);
  const onCancel = (formData: FormData) => cancel(formData);
  // @ts-ignore
  const onClearError = (fieldName: string) => clearError(fieldName);

  useEffect(() => {
    register({ name: "companyType" }, { validate: required("Company type") });
    register({ name: "declaredAsSeller" });

    if (apiErrors) {
      Object.entries(apiErrors).forEach(
        ([field, errorMessage]: [string, any]) => {
          // @ts-ignore
          setError(field, "incorrectData", errorMessage);
        }
      );
    }
  }, [register, apiErrors, setError]);

  return (
    <RegistrationCompanyForm
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onCancel={onCancel}
      getValues={getValues}
      data={data}
      onClearError={onClearError}
      triggerValidation={triggerValidation}
      setValue={(name: string, value: any) => setValue(name, value)}
    />
  );
};

export default RegistrationCompany;
