import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./ResetForm.styles";

const ResetForm = ({
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
          {t("requestNewPassword")}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isPending}
          >
            {t("request")}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetForm;
