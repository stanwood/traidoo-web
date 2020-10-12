import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import localeMap from "../../../core/localeMap";
import countries from "../../../data/Countries/de.json";
import i18n from "../../../i18n";
import { required } from "../../../utils/errors";
import useStyles from "./styles";

const PersonalProfileForm = ({
  apiErrors,
  errors,
  register,
  handleSubmit,
  onSubmit,
  onCancel,
  setValue,
  clearError,
  setError,
  profile,
  editMode,
  setEditMode,
}: any) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(profile.birthday)
  );

  const onClearError = (fieldName: string) => clearError(fieldName);

  useEffect(() => {
    register({ name: "birthday" }, { validate: required("Birthday") });
    setValue("birthday", profile.birthday);

    register(
      { name: "nationalityCountryCode" },
      { validate: required("Nationality") }
    );
    setValue("nationalityCountryCode", profile.nationalityCountryCode);

    register(
      { name: "residenceCountryCode" },
      { validate: required("Residence country") }
    );
    setValue("residenceCountryCode", profile.residenceCountryCode);

    if (apiErrors) {
      Object.entries(apiErrors).forEach(
        ([field, errorMessage]: [string, any]) => {
          setError(field, "incorrectData", errorMessage);
        }
      );
    }
  }, [profile, apiErrors, setError, register, setValue]);

  const handleNationalityChange = (event: any, value: any) => {
    setValue("nationalityCountryCode", value?.value);
    onClearError("nationalityCountryCode");
  };

  const handleResidenceCountryChange = (event: any, value: any) => {
    setValue("residenceCountryCode", value?.value);
    onClearError("residenceCountryCode");
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setValue("birthday", date);
    onClearError("birthday");
  };

  const cancelButton = (): void => {
    setEditMode(false);
    onCancel();
  };

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t("personalData")}
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label={t("firstName")}
                name="firstName"
                defaultValue={profile.firstName}
                autoFocus
                inputRef={register}
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? errors.firstName.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="lastName"
                defaultValue={profile.lastName}
                label={t("lastName")}
                id="lastName"
                inputRef={register}
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? errors.lastName.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                defaultValue={profile.email}
                label={t("email")}
                id="email"
                type="email"
                inputRef={register}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="region"
                defaultValue={profile.region?.name}
                label={t("region")}
                id="region"
                inputRef={register}
                error={errors.region ? true : false}
                helperText={errors.region ? errors.region.message : ""}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={localeMap[i18n.language]}
              >
                <DatePicker
                  disableFuture={true}
                  autoOk={true}
                  variant="inline"
                  margin="normal"
                  format="dd.MM.yyyy"
                  id="birthday"
                  name="birthday"
                  label={t("birthday")}
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
                  required
                  inputVariant="outlined"
                  error={errors.birthday ? true : false}
                  helperText={errors.birthday ? errors.birthday.message : ""}
                  disabled={!editMode}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="nationalityCountryCode"
                options={countries}
                getOptionLabel={(country) => country!.label}
                defaultValue={
                  countries.find(
                    (option) => option.value === profile.nationalityCountryCode
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
                    margin="normal"
                    required
                    fullWidth
                    error={errors.nationalityCountryCode ? true : false}
                    helperText={
                      errors.nationalityCountryCode
                        ? errors.nationalityCountryCode.message
                        : ""
                    }
                    disabled={!editMode}
                  />
                )}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="residenceCountryCode"
                options={countries}
                getOptionLabel={(country) => country!.label}
                onChange={handleResidenceCountryChange}
                defaultValue={
                  countries.find(
                    (option) => option.value === profile.residenceCountryCode
                  ) || null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("country")}
                    variant="outlined"
                    margin="normal"
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
                    disabled={!editMode}
                  />
                )}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label={t("phone")}
                name="phone"
                defaultValue={profile.phone}
                autoFocus
                inputRef={register}
                error={errors.phone ? true : false}
                helperText={errors.phone ? errors.phone.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="invoiceEmail"
                defaultValue={profile.invoiceEmail}
                label={t("invoiceEmail")}
                id="invoiceEmail"
                inputRef={register}
                error={errors.invoiceEmail ? true : false}
                helperText={
                  errors.invoiceEmail ? errors.invoiceEmail.message : ""
                }
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className={classes.actions}>
            {!editMode && (
              <Grid item>
                <Button type="submit" component={Link} to={"/profile/password"}>
                  {t("resetPassword")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.editButton}
                  onClick={() => setEditMode(true)}
                >
                  {t("edit")}
                </Button>
              </Grid>
            )}

            {editMode && (
              <Grid item>
                <Button type="submit" onClick={() => cancelButton()}>
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.editButton}
                >
                  save
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PersonalProfileForm;
