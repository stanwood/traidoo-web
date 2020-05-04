import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const DeliveryAddressForm = ({
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
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t("addDeliveryAddress")}
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="companyName"
                label={t("companyName")}
                name="companyName"
                autoFocus
                inputRef={register}
                error={errors.companyName ? true : false}
                helperText={
                  errors.companyName ? errors.companyName.message : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="street"
                label={t("streetAndNumber")}
                name="street"
                inputRef={register}
                error={errors.street ? true : false}
                helperText={errors.street ? errors.street.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="city"
                label={t("city")}
                id="city"
                inputRef={register}
                error={errors.city ? true : false}
                helperText={errors.city ? errors.city.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="zip"
                label={t("zip")}
                id="zip"
                inputRef={register}
                error={errors.zip ? true : false}
                helperText={errors.zip ? errors.zip.message : ""}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className={classes.actions}>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                component={Link}
                to="/profile/company"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.editButton}
              >
                {t("save")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default DeliveryAddressForm;
