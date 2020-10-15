import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Config from "../../../config";
import getCompanyTypes from "../../../core/constants/companyTypes";
import useStyles from "./RegistrationCompanyForm.styles";

interface CompanyType {
  label: string;
  value: string | number;
  parent?: string | number;
}

const RegistrationCompanyForm = ({
  errors,
  register,
  handleSubmit,
  onSubmit,
  onCancel,
  data,
  setValue,
  getValues,
  onClearError,
  triggerValidation,
}: any) => {
  const classes = useStyles();
  const values = getValues();
  const { t } = useTranslation();

  const [isCertifiedOrganicProducer, setIsCertifiedOrganicProducer] = useState<
    boolean
  >(false);

  const [isDeclaredAsSeller, setIsDeclaredAsSeller] = useState<boolean>(false);

  const handleOrganicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCertifiedOrganicProducer(event.target.checked);
  };

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    if (getValues().declaredAsSeller === undefined) {
      setValue("declaredAsSeller", false);
    }
  }, [getValues, setValue]);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
    setIsDeclaredAsSeller(values.declaredAsSeller);
  }, [values]);

  const handleCompanyTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setValue("companyType", event.target.value as string);
    onClearError("companyType");
  };

  const handledeclaredAsSellerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value === "true";
    setIsDeclaredAsSeller(value);
    setValue("declaredAsSeller", value);
  };

  return (
    <div className={classes.paper}>
      <div className={classes.formTitle}>
        <Typography component="span" variant="h5">
          {t("enterYourCompanyData")}
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
              id="companyName"
              label={t("companyName")}
              name="companyName"
              inputRef={register}
              error={errors.companyName ? true : false}
              helperText={errors.companyName ? errors.companyName.message : ""}
              defaultValue={data?.companyName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              required
              error={errors.companyType ? true : false}
            >
              <InputLabel ref={inputLabel} id="companyTypeLabelId">
                {t("type")}
              </InputLabel>
              <Select
                labelId="companyTypeLabelId"
                value={values.companyType || ""}
                required
                id="companyType"
                name="companyType"
                variant="outlined"
                labelWidth={labelWidth}
                onChange={handleCompanyTypeChange}
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
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="companyRegistrationId"
              label={t("registryNumber")}
              name="companyRegistrationId"
              autoComplete="companyRegistrationId"
              inputRef={register}
              error={errors.companyRegistrationId ? true : false}
              helperText={
                errors.companyRegistrationId
                  ? errors.companyRegistrationId.message
                  : ""
              }
              defaultValue={data?.companyRegistrationId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="taxID"
              label={t("taxId")}
              id="taxID"
              inputRef={register}
              error={errors.taxID ? true : false}
              helperText={errors.taxID ? errors.taxID.message : ""}
              defaultValue={data?.taxID}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="city"
              label={t("city")}
              id="city"
              inputRef={register}
              error={errors.city ? true : false}
              helperText={errors.city ? errors.city.message : ""}
              defaultValue={data?.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="street"
              label={t("street")}
              id="street"
              inputRef={register}
              error={errors.street ? true : false}
              helperText={errors.street ? errors.street.message : ""}
              defaultValue={data?.street}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="zip"
              label={t("zip")}
              id="zip"
              inputRef={register}
              error={errors.zip ? true : false}
              helperText={errors.zip ? errors.zip.message : ""}
              defaultValue={data?.zip}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCertifiedOrganicProducer}
                  onChange={handleOrganicChange}
                  color="primary"
                  id="isCertifiedOrganicProducer"
                  name="isCertifiedOrganicProducer"
                />
              }
              label={t("organic")}
              id="isCertifiedOrganicProducer"
              name="isCertifiedOrganicProducer"
              inputRef={register}
              value={data?.isCertifiedOrganicProducer}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              disabled={!isCertifiedOrganicProducer}
              name="organicCertificationId"
              label={t("organicCertificationId")}
              id="organicCertificationId"
              inputRef={register}
              error={errors.organicCertificationId ? true : false}
              helperText={
                errors.organicCertificationId
                  ? errors.organicCertificationId.message
                  : ""
              }
              defaultValue={data?.organicCertificationId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="declaredAsSeller"
                name="declaredAsSeller"
                value={values.declaredAsSeller ? "true" : "false"}
                onChange={handledeclaredAsSellerChange}
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label={t("iWantToBuy")}
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label={t("iWantToSell")}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {isDeclaredAsSeller && (
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="iban"
                label={t("iban")}
                name="iban"
                inputRef={register}
                error={errors.iban ? true : false}
                helperText={errors.iban ? errors.iban.message : ""}
                defaultValue={data?.iban}
              />
            </Grid>
          )}
          {isDeclaredAsSeller && (
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="vatID"
                label={t("vatId")}
                id="vatID"
                inputRef={register}
                error={errors.vatID ? true : false}
                helperText={errors.vatID ? errors.vatID.message : ""}
                defaultValue={data?.vatID}
              />
            </Grid>
          )}
          <Grid item xs={12} className={classes.actionButtons}>
            <Button
              type="button"
              color="primary"
              className={classes.submit}
              onClick={onCancel}
            >
              {t("cancel")}
            </Button>
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

export default RegistrationCompanyForm;
