import { yupResolver } from "@hookform/resolvers";
import { Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { passwordResetRequest } from "../../api/queries/password";
import Page from "../../components/Common/Page";
import ResetForm from "../../components/PasswordReset/ResetForm";
import { FormData } from "./interfaces";
import validationSchema from "./PasswordReset.validation";

const PasswordReset: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("passwordReset");

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [pending, setPending] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const onSubmit = async (formData: FormData) => {
    try {
      setPending(true);
      await passwordResetRequest(formData.email);
      setRequestSent(true);
    } catch (error) {
      setError("email", { type: "incorrectData", message: t("unknownError") });
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
    <Page title={pageTitle}>
      <ResetForm
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isPending={pending}
      />
    </Page>
  );
};

export default PasswordReset;
