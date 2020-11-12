import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import { useTranslation } from "react-i18next";
import localeMap from "../../../core/localeMap";
import countries from "../../../data/Countries/de.json";
import i18n from "../../../i18n";
import useStyles from "./RegistrationPersonalForm.styles";

const RegistrationPersonalForm = ({
  errors,
  register,
  handleSubmit,
  onSubmit,
  data,
  setValue,
  getValues,
  onClearError,
}: any) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleBirthdayChange = (date: Date | null | MaterialUiPickersDate) => {
    if (date instanceof Date) {
      setValue("birthday", date);
      onClearError("birthday");
    }
  };

  const handleNationalityChange = (event: any, value: any) => {
    setValue("nationalityCountryCode", value.value);
    onClearError("nationalityCountryCode");
  };

  const handleResidenceCountryChange = (event: any, value: any) => {
    setValue("residenceCountryCode", value.value);
    onClearError("residenceCountryCode");
  };

  const values = getValues();

  return (
    <div className={classes.paper}>
      <div className={classes.formTitle}>
        <Typography component="span" variant="h5">
          {t("enterYourPersonalData")}
        </Typography>
      </div>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label={t("firstName")}
              name="firstName"
              inputRef={register}
              error={errors.firstName ? true : false}
              helperText={errors.firstName ? errors.firstName.message : ""}
              defaultValue={data?.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label={t("lastName")}
              name="lastName"
              inputRef={register}
              error={errors.lastName ? true : false}
              helperText={errors.lastName ? errors.lastName.message : ""}
              defaultValue={data?.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label={t("emailAddress")}
              name="email"
              type="email"
              inputRef={register}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ""}
              defaultValue={data?.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label={t("phone")}
              name="phone"
              type="tel"
              inputRef={register}
              error={errors.phone ? true : false}
              helperText={errors.phone ? errors.phone.message : ""}
              defaultValue={data?.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              inputRef={register}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              locale={localeMap[i18n.language]}
            >
              <KeyboardDatePicker
                disableFuture={true}
                autoOk={true}
                variant="inline"
                format="dd.MM.yyyy"
                id="birthday"
                type="datetime-local"
                name="birthday"
                label={t("birthday")}
                value={values.birthday || null}
                onChange={handleBirthdayChange}
                fullWidth
                required
                inputVariant="outlined"
                inputRef={register}
                error={errors.birthday ? true : false}
                helperText={errors.birthday ? errors.birthday.message : ""}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="nationalityCountryCode"
              options={countries}
              getOptionLabel={(country) => country!.label}
              value={
                countries.find(
                  (option) => option.value === values.nationalityCountryCode
                ) || null
              }
              onChange={handleNationalityChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("nationality")}
                  id="nationalityCountryCode"
                  name="nationalityCountryCode"
                  variant="outlined"
                  required
                  fullWidth
                  error={errors.nationalityCountryCode ? true : false}
                  helperText={
                    errors.nationalityCountryCode
                      ? errors.nationalityCountryCode.message
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="residenceCountryCode"
              options={countries}
              getOptionLabel={(country) => country!.label}
              onChange={handleResidenceCountryChange}
              value={
                countries.find(
                  (option) => option.value === values.residenceCountryCode
                ) || null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("residenceCountry")}
                  variant="outlined"
                  id="residenceCountryCode"
                  name="residenceCountryCode"
                  fullWidth
                  required
                  error={errors.residenceCountryCode ? true : false}
                  helperText={
                    errors.residenceCountryCode
                      ? errors.residenceCountryCode.message
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} className={classes.actionButtons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("next")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RegistrationPersonalForm;
