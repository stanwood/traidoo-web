import { Button, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { passwordSetRequest } from "../../api/queries/password";
import SetForm from "../../components/PasswordReset/SetForm";
import { FormData } from "./interfaces";
import validationSchema from "./PasswordSet.validation";

const PasswordSet = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    validationSchema: validationSchema,
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
        setError("password", "token", t("tokenNotValid"));
      } else if (errorBody.newPassword) {
        setError("password", "incorrectData", t("incorrectPasswordFormat"));
      } else {
        setError("password", "unknown", t("unknownError"));
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
    <>
      <Helmet>
        <title>{t("setPassword")}</title>
      </Helmet>
      <SetForm
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isPending={pending}
      />
    </>
  );
};

export default PasswordSet;
