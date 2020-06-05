import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { createUserDeliveryAddressRequest } from "../../api/queries/users/profile";
import DeliveryAddressForm from "../../components/DeliveryAddress";
import { DeliveryAddressData } from "./types";
import validationSchema from "./validation";

const DeliveryAddress: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [registrationErrors, setRegistrationErrors] = useState({});

  const { register, handleSubmit, errors, setError } = useForm<
    DeliveryAddressData
  >({
    validationSchema,
  });

  async function handleError(error: any) {
    let errors: any = {};

    const errorResponse = await error.response.json();

    Object.entries(errorResponse).forEach(([key, value]: [string, any]) => {
      errors[key] = value[0].message; // TODO: do not use messages from API
    });

    setRegistrationErrors(errors);
  }

  const onSubmit = (formData: FormData) => {
    createUserDeliveryAddressRequest(formData)
      .then(() => {
        history.push("/profile/company");
      })
      .catch((error: any) => {
        handleError(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>{t("addDeliveryAddress")}</title>
      </Helmet>
      <DeliveryAddressForm
        apiErrors={registrationErrors}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        setError={setError}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DeliveryAddress;
