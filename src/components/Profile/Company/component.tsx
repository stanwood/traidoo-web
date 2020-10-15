import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Config from "../../../config";
import getCompanyTypes from "../../../core/constants/companyTypes";
import DeliveryAddresses from "../DeliveryAddresses";
import useStyles from "./styles";

interface CompanyType {
  label: string;
  value: string | number;
  parent?: string | number;
}

const CompanyProfileForm = ({
  apiErrors,
  errors,
  register,
  handleSubmit,
  onSubmit,
  clearError,
  onCancel,
  setValue,
  onDelete,
  getValues,
  setError,
  profile,
  deliveryAddresses,
  editMode,
  setEditMode,
  isCertifiedOrganicProducer,
  setIsCertifiedOrganicProducer,
  isSeller,
}: any) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
    setIsCertifiedOrganicProducer(profile.isCertifiedOrganicProducer);

    if (apiErrors) {
      Object.entries(apiErrors).forEach(
        ([field, errorMessage]: [string, any]) => {
          setError(field, "incorrectData", errorMessage);
        }
      );
    }
  }, [profile, apiErrors, setError, register, setIsCertifiedOrganicProducer]);

  const cancelButton = (): void => {
    setEditMode(false);
    onCancel();
  };

  const handleCompanyTypeChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>): void => {
      setValue("companyType", event.target.value as string);
      clearError("companyType");
    },
    [setValue, clearError]
  );

  return (
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t("companyData")}
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
                id="companyName"
                label={t("companyName")}
                name="companyName"
                defaultValue={profile.companyName}
                autoFocus
                inputRef={register}
                error={errors.companyName ? true : false}
                helperText={
                  errors.companyName ? errors.companyName.message : ""
                }
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                margin="normal"
                required
                error={errors.companyType ? true : false}
              >
                <InputLabel ref={inputLabel} id="companyTypeLabelId">
                  {t("type")}
                </InputLabel>
                <Select
                  labelId="companyTypeLabelId"
                  // TODO: Pass API response to form default values and use it instead of profile
                  defaultValue={profile.companyType}
                  required
                  id="companyType"
                  name="companyType"
                  variant="outlined"
                  labelWidth={labelWidth}
                  onChange={handleCompanyTypeChange}
                  disabled={!editMode}
                >
                  {getCompanyTypes(Config.compantTypesVariant).map(
                    (companyType: CompanyType) => {
                      if (companyType.parent) {
                        return (
                          <MenuItem
                            value={companyType.value}
                            key={companyType.value}
                          >
                            {companyType.label}
                          </MenuItem>
                        );
                      } else {
                        return (
                          <ListSubheader key={companyType.value}>
                            {companyType.label}
                          </ListSubheader>
                        );
                      }
                    }
                  )}
                </Select>
                <FormHelperText>
                  {errors.companyType ? errors.companyType.message : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            {isSeller && (
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="iban"
                  defaultValue={profile.iban}
                  label={t("iban")}
                  id="iban"
                  inputRef={register}
                  error={errors.iban ? true : false}
                  helperText={errors.iban ? errors.iban.message : ""}
                  disabled={!editMode}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="companyRegistrationId"
                defaultValue={profile.companyRegistrationId}
                label={t("registryNumber")}
                id="companyRegistrationId"
                inputRef={register}
                error={errors.companyRegistrationId ? true : false}
                helperText={
                  errors.companyRegistrationId
                    ? errors.companyRegistrationId.message
                    : ""
                }
                disabled={!editMode}
              />
            </Grid>
            {isSeller && (
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="vatId"
                  defaultValue={profile.vatId}
                  label={t("vatId")}
                  id="vatId"
                  inputRef={register}
                  error={errors.vatId ? true : false}
                  helperText={errors.vatId ? errors.vatId.message : ""}
                  disabled={!editMode}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="taxId"
                label={t("taxId")}
                defaultValue={profile.taxId}
                id="taxId"
                inputRef={register}
                error={errors.taxId ? true : false}
                helperText={errors.taxId ? errors.taxId.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="street"
                defaultValue={profile.street}
                label={t("street")}
                id="street"
                inputRef={register}
                error={errors.street ? true : false}
                helperText={errors.street ? errors.street.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="city"
                defaultValue={profile.city}
                label={t("city")}
                id="city"
                inputRef={register}
                error={errors.city ? true : false}
                helperText={errors.city ? errors.city.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="zip"
                label={t("zip")}
                name="zip"
                defaultValue={profile.zip}
                autoFocus
                inputRef={register}
                error={errors.zip ? true : false}
                helperText={errors.zip ? errors.zip.message : ""}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.checkbox}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCertifiedOrganicProducer || false}
                    name="isCertifiedOrganicProducer"
                    onChange={() =>
                      setIsCertifiedOrganicProducer(!isCertifiedOrganicProducer)
                    }
                    id="isCertifiedOrganicProducer"
                    inputRef={register}
                    disabled={!editMode}
                  />
                }
                label={t("organicProducer")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="organicControlBody"
                defaultValue={profile.organicControlBody}
                label={t("organicCertification")}
                id="organicControlBody"
                inputRef={register}
                error={errors.organicControlBody ? true : false}
                helperText={
                  errors.organicControlBody
                    ? errors.organicControlBody.message
                    : ""
                }
                disabled={!editMode || !isCertifiedOrganicProducer}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                multiline
                required
                fullWidth
                name="description"
                defaultValue={profile.description}
                label={t("description")}
                id="description"
                inputRef={register}
                error={errors.description ? true : false}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-end" className={classes.actions}>
            {!editMode && (
              <Grid item>
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
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => cancelButton()}
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
            )}
          </Grid>
        </form>
      </div>

      <DeliveryAddresses
        deliveryAddresses={deliveryAddresses}
        onDelete={onDelete}
        className={classes.deliveryAddresses}
      />
    </Container>
  );
};

export default CompanyProfileForm;
