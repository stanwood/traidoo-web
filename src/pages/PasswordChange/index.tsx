import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { changePasswordRequest } from "../../api/queries/users/password";
import Page from "../../components/Common/Page";
import PasswordUpdateForm from "../../components/PasswordChange";
import { FormData } from "./types";
import validationSchema from "./validation";

const PasswordChangePage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { t } = useTranslation();
  const pageTitle = t("passwordChange");

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
        enqueueSnackbar(t("passwordChanged"), {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
        history.push("/profile/personal");
      })
      .catch((error: any) => {
        handleError(error);
      });
  };

  return (
    <Page title={pageTitle}>
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
    </Page>
  );
};

export default PasswordChangePage;
