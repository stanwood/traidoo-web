import { yupResolver } from "@hookform/resolvers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { APIValidationErrors } from "../../../api/errors/parser";
import Config from "../../../config";
import { required } from "../../../utils/errors";
import RegistrationCompanyForm from "../RegistrationCompanyForm";
import { FormData } from "./interfaces";
import validationSchema from "./RegistrationCompany.validation";

interface RegistrationCompanyProps {
  submit: any;
  cancel: any;
  data: any;
  apiErrors: APIValidationErrors[];
}

const RegistrationCompany = (props: RegistrationCompanyProps) => {
  const { submit, cancel, data, apiErrors } = props;

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearErrors,
    getValues,
    trigger,
  } = useForm<FormData>({
    defaultValues: data,
    resolver: yupResolver(validationSchema),
    context: { companyID: Config.registration.companyID },
  });
  const onSubmit = (formData: FormData) => submit(formData);
  const onCancel = (formData: FormData) => cancel(formData);
  // @ts-ignore
  const onClearError = (fieldName: string) => clearErrors(fieldName);

  useEffect(() => {
    register({ name: "companyType" }, { validate: required("Company type") });
    register({ name: "declaredAsSeller" });

    if (apiErrors) {
      apiErrors.forEach((apiError) => {
        // @ts-ignore
        setError(apiError.fieldName, {
          type: apiError.code,
          message: apiError.message,
        });
      });
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
      triggerValidation={trigger}
      setValue={(name: any, value: any) => setValue(name, value)}
    />
  );
};

export default RegistrationCompany;
