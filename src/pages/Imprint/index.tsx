import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getImprintRequest } from "../../api/queries/static";
import { htmlSanitize } from "../../utils/htmlSanitize";
import useImprintStyles from "./styles";

const ImprintPage: React.FC = () => {
  const classes = useImprintStyles();
  const { t } = useTranslation();

  const { status, data } = useQuery("imprint", getImprintRequest);

  if (status === "loading" || !data) {
    return (
      <>
        {Array.from(Array(10).keys()).map((number) => (
          <Skeleton key={number} />
        ))}
      </>
    );
  }

  return (
    <Container component={Paper} maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h4">
        {t("imprint")}
      </Typography>
      <div dangerouslySetInnerHTML={htmlSanitize(data.body)} />
    </Container>
  );
};

export default ImprintPage;
