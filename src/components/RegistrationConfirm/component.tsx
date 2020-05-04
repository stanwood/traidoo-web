import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RegistrationConfirmProps } from "./types";

const RegistrationConfirm = ({ success }: RegistrationConfirmProps) => {
  const { t } = useTranslation();

  if (success === false) {
    return (
      <Container component="main" maxWidth="md">
        <Alert severity="error">{t("accountActivationFailed.")}</Alert>
      </Container>
    );
  } else if (success === true) {
    return (
      <Container component="main" maxWidth="md">
        <Alert
          severity="success"
          action={
            <Button color="inherit" size="small" component={Link} to={"/login"}>
              {t("login")}
            </Button>
          }
        >
          {t("accountHasBeenActivated.")}
        </Alert>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="md">
        <Alert severity="info">{t("validationInProgress")}</Alert>
      </Container>
    );
  }
};

export default RegistrationConfirm;
