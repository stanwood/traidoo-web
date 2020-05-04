import { Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { passwordResetRequest } from "../../api/queries/password";
import ResetForm from "../../components/PasswordReset/ResetForm";
import { FormData } from "./interfaces";
import validationSchema from "./PasswordReset.validation";

const PasswordReset = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    validationSchema: validationSchema,
  });

  const [pending, setPending] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const onSubmit = async (formData: FormData) => {
    try {
      setPending(true);
      await passwordResetRequest(formData.email);
      setRequestSent(true);
    } catch (error) {
      setError("email", "incorrectData", t("unknownError"));
    } finally {
      setPending(false);
    }
  };

  if (requestSent) {
    return (
      <Container component="main" maxWidth="xs">
        <Alert severity="info">{t("passwordResetLinkSent")}</Alert>
      </Container>
    );
  }

  return (
    <ResetForm
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isPending={pending}
    />
  );
};

export default PasswordReset;
