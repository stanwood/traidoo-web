import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

const PasswordChangeForm = ({
  apiErrors,
  errors,
  register,
  handleSubmit,
  onSubmit,
  setError,
}: any) => {
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (apiErrors) {
      Object.entries(apiErrors).forEach(
        ([field, errorMessage]: [string, any]) => {
          setError(field, "incorrectData", errorMessage);
        }
      );
    }
  }, [apiErrors, setError, register]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t("updatePassword")}
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
            label={t("newPassword")}
            type="password"
            id="password"
            inputRef={register}
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label={t("confirmNewPassword")}
            type="password"
            id="passwordConfirmation"
            inputRef={register}
            error={errors.passwordConfirmation ? true : false}
            helperText={
              errors.passwordConfirmation
                ? errors.passwordConfirmation.message
                : ""
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label={t("currentPassword")}
            type="password"
            id="currentPassword"
            inputRef={register}
            error={errors.currentPassword ? true : false}
            helperText={
              errors.currentPassword ? errors.currentPassword.message : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t("changePassword")}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PasswordChangeForm;
