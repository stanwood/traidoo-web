import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { useTranslation } from "react-i18next";
import Page from "../../../components/Common/Page";

const RegistrationSuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("Registration");

  return (
    <Page title={pageTitle}>
      <Container component="main" maxWidth="md">
        <Alert severity="info">{t("thankYouForRegistration")}</Alert>
      </Container>
    </Page>
  );
};

export default RegistrationSuccessPage;
