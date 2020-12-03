import { yupResolver } from "@hookform/resolvers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { APIValidationErrors } from "../../../api/errors/parser";
import requiredDocuments from "../../../core/utils/requiredDocuments";
import RegistrationDocumentsForm from "../RegistrationDocumentsForm";
import { DocumentsFormData } from "./interfaces";
import validationSchema from "./RegistrationDocuments.validation";

interface RegistrationDocumentsProps {
  submit: any;
  cancel: any;
  apiErrors: APIValidationErrors[];
  data: any;
  declaredAsSeller: boolean;
  companyType: string;
}

const RegistrationDocuments = (props: RegistrationDocumentsProps) => {
  const {
    submit,
    cancel,
    apiErrors,
    data,
    declaredAsSeller,
    companyType,
  } = props;

  const { register, handleSubmit, errors, setError, setValue, watch } = useForm<
    DocumentsFormData
  >({
    defaultValues: data,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (formData: DocumentsFormData) => {
    const fileNames = [
      "image",
      "businessLicense",
      "registrationProof",
      "identityProof",
      "articlesOfAssociation",
    ];

    let data = {};

    for (const fileName of fileNames) {
      if (formData.hasOwnProperty(fileName)) {
        // @ts-ignore
        data[fileName] = formData[fileName];
      }
    }

    submit(data);
  };
  const onCancel = (formData: FormData) => cancel(formData);

  useEffect(() => {
    register("declaredAsSeller");
    setValue("declaredAsSeller", declaredAsSeller);

    register("companyType");
    setValue("companyType", companyType);

    if (apiErrors) {
      apiErrors.forEach((apiError) => {
        // @ts-ignore
        setError(apiError.fieldName, {
          type: apiError.code,
          message: apiError.message,
        });
      });
    }
  }, [apiErrors, setError, declaredAsSeller, companyType, register, setValue]);

  return (
    <RegistrationDocumentsForm
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onCancel={onCancel}
      data={data}
      watch={watch}
      requiredFields={requiredDocuments(declaredAsSeller, companyType)}
    />
  );
};

export default RegistrationDocuments;
