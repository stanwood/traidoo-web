import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getContactRequest } from "../../api/queries/static";
import Page from "../../components/Common/Page";
import { htmlSanitize } from "../../utils/htmlSanitize";
import useContactStyles from "./styles";

const ContactPage: React.FC = () => {
  const classes = useContactStyles();
  const { t } = useTranslation();
  const pageTitle = t("contact");

  const { status, data } = useQuery("contact", getContactRequest);

  return (
    <Page title={pageTitle}>
      {status === "loading" || !data ? (
        Array.from(Array(10).keys()).map((number) => <Skeleton key={number} />)
      ) : (
        <Container component={Paper} maxWidth="md" className={classes.root}>
          <Typography variant="h4" component="h4">
            {t("contact")}
          </Typography>
          <div dangerouslySetInnerHTML={htmlSanitize(data.body)} />
        </Container>
      )}
    </Page>
  );
};

export default ContactPage;
