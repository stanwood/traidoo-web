import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { getPricesRequest } from "../../api/queries/static";
import { htmlSanitize } from "../../utils/htmlSanitize";
import usePricesStyles from "./styles";

const PricesPage: React.FC = () => {
  const classes = usePricesStyles();
  const { t } = useTranslation();

  const { status, data } = useQuery("prices", getPricesRequest);

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
        {t("prices")}
      </Typography>
      <div dangerouslySetInnerHTML={htmlSanitize(data.body)} />
    </Container>
  );
};

export default PricesPage;