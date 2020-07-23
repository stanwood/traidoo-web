import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getTermsOfServiceRequest } from "../../api/queries/static";
import Page from "../../components/Common/Page";
import { htmlSanitize } from "../../utils/htmlSanitize";
import useTermsOfServicesStyles from "./styles";

const TermsOfServicePage: React.FC = () => {
  const classes = useTermsOfServicesStyles();
  const { t } = useTranslation();
  const pageTitle = t("termsOfServices");

  const { status, data } = useQuery(
    "terms-of-services",
    getTermsOfServiceRequest
  );

  return (
    <Page title={pageTitle}>
      {status === "loading" || !data ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <Container component={Paper} maxWidth="md" className={classes.root}>
          <Typography variant="h4" component="h4">
            {t("termsOfServices")}
          </Typography>
          <div dangerouslySetInnerHTML={htmlSanitize(data.body)} />
        </Container>
      )}
    </Page>
  );
};

export default TermsOfServicePage;
