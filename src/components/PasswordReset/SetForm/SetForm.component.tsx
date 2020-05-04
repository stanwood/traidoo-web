import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./SetForm.styles";

const SetForm = ({
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
          {t("setNewPassword")}
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
            name="password"
            label={t("password")}
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t("confirmPassword")}
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            inputRef={register}
            error={errors.confirmPassword ? true : false}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isPending}
          >
            {t("set")}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SetForm;
