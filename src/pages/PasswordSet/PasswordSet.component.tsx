import { yupResolver } from "@hookform/resolvers";
import { Button, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { passwordSetRequest } from "../../api/queries/password";
import Page from "../../components/Common/Page";
import SetForm from "../../components/PasswordReset/SetForm";
import { FormData } from "./interfaces";
import validationSchema from "./PasswordSet.validation";

const PasswordSet: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("setPassword");

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const { uid, token } = useParams();

  const [pending, setPending] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  const onSubmit = async (formData: FormData) => {
    try {
      setPending(true);
      // TODO: add type
      // @ts-ignore
      await passwordSetRequest(uid, token, formData.password);
      setRequestSent(true);
    } catch (error) {
      const errorBody = await error.response.json();
      if (errorBody.token) {
        setError("password", { type: "token", message: t("tokenNotValid") });
      } else if (errorBody.newPassword) {
        setError("password", {
          type: "incorrectData",
          message: t("incorrectPasswordFormat"),
        });
      } else {
        setError("password", { type: "unknown", message: t("unknownError") });
      }
    } finally {
      setPending(false);
    }
  };

  if (requestSent) {
    return (
      <Container component="main" maxWidth="xs">
        <Alert
          action={
            <Button color="inherit" size="small" component={Link} to={"/login"}>
              {t("login")}
            </Button>
          }
        >
          {t("newPasswordSet")}
        </Alert>
      </Container>
    );
  }

  return (
    <Page title={pageTitle}>
      <SetForm
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isPending={pending}
      />
    </Page>
  );
};

export default PasswordSet;
