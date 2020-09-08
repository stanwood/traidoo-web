import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import * as Sentry from "@sentry/react";
import React from "react";
import { FallbackProps } from "react-error-boundary";
import { useTranslation } from "react-i18next";

export const useGlobalErrorFallbackStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      marginBottom: theme.spacing(4),
    },
    container: {
      padding: theme.spacing(4),
    },
    block: {
      marginTop: theme.spacing(2),
    },
  })
);

export const GlobalErrorFallback: React.FC<FallbackProps> = (
  props: FallbackProps
) => {
  const { t } = useTranslation();
  const lastEventId = Sentry.getCurrentHub().lastEventId();
  const { resetErrorBoundary } = props;
  const classes = useGlobalErrorFallbackStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Grid container spacing={0} direction="column">
        <Alert
          className={classes.alert}
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={resetErrorBoundary}>
              {t("tryAgain")}
            </Button>
          }
        >
          {t("errorMessageTitle")}
        </Alert>

        <Typography className={classes.block}>
          {t("errorMessageBody")}
        </Typography>
        <Typography className={classes.block}>
          {t("errorId")}: {lastEventId}
        </Typography>
      </Grid>
    </Container>
  );
};
