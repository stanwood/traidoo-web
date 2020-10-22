import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import { useTranslation } from "react-i18next";
import Page from "../../components/Common/Page";

const CheckoutSuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const pageTitle = t("orderCreated");

  return (
    <Page title={pageTitle}>
      <Container component="main" maxWidth="md">
        <Alert severity="success">
          <AlertTitle>{t("orderConfirmationMessage_1")}</AlertTitle>
          {t("orderConfirmationMessage_2")}
        </Alert>
      </Container>
    </Page>
  );
};

export default CheckoutSuccessPage;
