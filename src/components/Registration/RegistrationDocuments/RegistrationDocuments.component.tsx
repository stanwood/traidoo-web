import { yupResolver } from "@hookform/resolvers";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import requiredDocuments from "../../../core/utils/requiredDocuments";
import RegistrationDocumentsForm from "../RegistrationDocumentsForm";
import { DocumentsFormData } from "./interfaces";
import validationSchema from "./RegistrationDocuments.validation";

const RegistrationDocuments = ({
  submit,
  cancel,
  apiErrors,
  data,
  declaredAsSeller,
  companyType,
}: any) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    getValues,
    setValue,
  } = useForm<DocumentsFormData>({
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
      Object.entries(apiErrors).forEach(
        ([field, errorMessage]: [string, any]) => {
          setError(field, { type: "incorrectData", message: errorMessage });
        }
      );
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
      getValues={getValues}
      requiredFields={requiredDocuments(declaredAsSeller, companyType)}
    />
  );
};

export default RegistrationDocuments;
