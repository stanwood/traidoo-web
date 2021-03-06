import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getPrivacyPolicyRequest } from "../../api/queries/static";
import Page from "../../components/Common/Page";
import { htmlSanitize } from "../../utils/htmlSanitize";
import usePrivacyPolicyStyles from "./styles";

const PrivacyPolicyPage: React.FC = () => {
  const classes = usePrivacyPolicyStyles();
  const { t } = useTranslation();
  const pageTitle = t("privacyPolicy");

  const { status, data } = useQuery("privacy-policy", getPrivacyPolicyRequest);

  return (
    <Page title={pageTitle}>
      {status === "loading" || !data ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <Container component={Paper} maxWidth="md" className={classes.root}>
          <Typography variant="h4" component="h4">
            {t("privacyPolicy")}
          </Typography>
          <div dangerouslySetInnerHTML={htmlSanitize(data.body)} />
        </Container>
      )}
    </Page>
  );
};

export default PrivacyPolicyPage;
