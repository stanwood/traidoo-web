import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import useStyles from "./LoginForm.styles";

const LoginForm = ({
  errors,
  register,
  handleSubmit,
  onSubmit,
  isPending,
}: any) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t("signIn")}
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("emailAddress")}
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isPending}
          >
            {t("signIn")}
          </Button>
          <Grid container>
            <Grid item sm>
              <Link component={RouterLink} to="/password/reset" variant="body2">
                {t("forgotPassword")}
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/registration" variant="body2">
                {t("dontHaveAccount")}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
