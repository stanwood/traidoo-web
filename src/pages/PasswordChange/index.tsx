import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { changePasswordRequest } from "../../api/queries/users/password";
import PasswordUpdateForm from "../../components/PasswordChange";
import { Context } from "../../core/context";
import { FormData } from "./types";
import validationSchema from "./validation";

const PasswordChangePage = () => {
  const AppContext = useContext(Context);
  const history = useHistory();
  const { t } = useTranslation();
  const [passwordChangeErrors, setPasswordChangeErrors] = useState({});

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    setError,
    clearError,
  } = useForm<FormData>({
    validationSchema,
  });

  async function handleError(error: any) {
    let errors: any = {};

    const errorResponse = await error.response.json();

    Object.entries(errorResponse).forEach(([key, value]: [string, any]) => {
      errors[key] = value[0].message; // TODO: do not use messages from API
    });

    setPasswordChangeErrors(errors);
  }

  const onSubmit = (formData: FormData) => {
    changePasswordRequest(
      formData.password,
      formData.passwordConfirmation,
      formData.currentPassword
    )
      .then(() => {
        AppContext.dispatch({
          type: "addMessage",
          payload: { message: t("passwordChanged") },
        });
        history.push("/profile/personal");
      })
      .catch((error: any) => {
        handleError(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>{t("passwordChange")}</title>
      </Helmet>
      <PasswordUpdateForm
        apiErrors={passwordChangeErrors}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        setValue={setValue}
        setError={setError}
        clearError={clearError}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default PasswordChangePage;
