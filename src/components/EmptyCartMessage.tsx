import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
    },
  })
);

const EmptyCartMessage = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Alert severity="warning">
        <AlertTitle>{t("warning")}</AlertTitle>
        {t("emptyCartWarning")}
      </Alert>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        fullWidth
        className={classes.button}
      >
        {t("goToIndex")}
      </Button>
    </Container>
  );
};

export default EmptyCartMessage;
