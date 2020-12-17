import React from "react";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { StringParam, useQueryParams } from "use-query-params";
import Typography from "@material-ui/core/Typography";
import Page from "../../components/Common/Page";

export const useCheckoutErrorPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      marginTop: theme.spacing(2),
    },
  })
);

const CheckoutErrorPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useCheckoutErrorPageStyles();
  const pageTitle = t("error");
  const [query] = useQueryParams({
    eventId: StringParam,
  });

  return (
    <Page title={pageTitle}>
      <Container component="main" maxWidth="md">
        <Alert severity="error">
          <AlertTitle>{t("errorMessageTitle")}</AlertTitle>
          <Typography className={classes.block}>
            {t("errorMessageBody")}
          </Typography>
          <Typography className={classes.block}>
            {t("errorId")} {query.eventId}
          </Typography>
        </Alert>
      </Container>
    </Page>
  );
};

export default CheckoutErrorPage;
