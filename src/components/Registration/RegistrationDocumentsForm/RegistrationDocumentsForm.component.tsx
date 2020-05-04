import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./RegistrationDocumentsForm.styles";

const RegistrationDocumentsForm = ({
  errors,
  register,
  handleSubmit,
  onSubmit,
  onCancel,
  data,
  requiredFields,
}: any) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [termAndConditions, setTermAndConditions] = useState(false);

  const handleTermsAndConditionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermAndConditions(event.target.checked);
  };

  return (
    <div className={classes.paper}>
      <div className={classes.formTitle}>
        <Typography component="span" variant="h5">
          {t("uploadDocuments")}
        </Typography>
      </div>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Grid container spacing={3}>
          {requiredFields.includes("businessLicense") && (
            <Grid item xs={12} sm={6}>
              <Input
                className={classes.input}
                id="businessLicense"
                name="businessLicense"
                inputProps={{ accept: "image/*,application/pdf" }}
                type="file"
                required
                inputRef={register}
              />
              <label htmlFor="businessLicense">
                <Button
                  variant="outlined"
                  size="large"
                  component="span"
                  fullWidth
                  className={classes.button}
                >
                  {t("businessLicense")}
                </Button>
              </label>
              {errors.businessLicense && (
                <p className={classes.error}>
                  {errors.businessLicense.message}
                </p>
              )}
            </Grid>
          )}
          {requiredFields.includes("identityProof") && (
            <Grid item xs={12} sm={6}>
              <Input
                className={classes.input}
                id="identityProof"
                name="identityProof"
                inputProps={{ accept: "image/*,application/pdf" }}
                type="file"
                inputRef={register}
              />
              <label htmlFor="identityProof">
                <Button
                  variant="outlined"
                  size="large"
                  component="span"
                  fullWidth
                  className={classes.button}
                >
                  {t("uploadIdentityProof")}
                </Button>
              </label>
              {errors.identityProof && (
                <p className={classes.error}>{errors.identityProof.message}</p>
              )}
            </Grid>
          )}
          {requiredFields.includes("image") && (
            <Grid item xs={12} sm={6}>
              <Input
                className={classes.input}
                id="image"
                name="image"
                inputProps={{ accept: "image/*" }}
                type="file"
                inputRef={register}
              />
              <label htmlFor="image">
                <Button
                  variant="outlined"
                  size="large"
                  component="span"
                  fullWidth
                  className={classes.button}
                >
                  {t("uploadCompanyLogo")}
                </Button>
              </label>
              {errors.image && (
                <p className={classes.error}>{errors.image.message}</p>
              )}
            </Grid>
          )}
          {requiredFields.includes("registrationProof") && (
            <Grid item xs={12} sm={6}>
              <Input
                className={classes.input}
                id="registrationProof"
                name="registrationProof"
                inputProps={{ accept: "image/*,application/pdf" }}
                type="file"
                inputRef={register}
              />
              <label htmlFor="registrationProof">
                <Button
                  variant="outlined"
                  size="large"
                  component="span"
                  fullWidth
                  className={classes.button}
                >
                  {t("uploadRegistrationProof")}
                </Button>
              </label>
              {errors.registrationProof && (
                <p className={classes.error}>
                  {errors.registrationProof.message}
                </p>
              )}
            </Grid>
          )}
          {requiredFields.includes("articlesOfAssociation") && (
            <Grid item xs={12} sm={6}>
              <Input
                className={classes.input}
                id="articlesOfAssociation"
                name="articlesOfAssociation"
                inputProps={{ accept: "image/*,application/pdf" }}
                type="file"
                inputRef={register}
              />
              <label htmlFor="articlesOfAssociation">
                <Button
                  variant="outlined"
                  size="large"
                  component="span"
                  fullWidth
                  className={classes.button}
                >
                  {t("uploadArticlesOfAssociation")}
                </Button>
              </label>
              {errors.articlesOfAssociation && (
                <p className={classes.error}>
                  {errors.articlesOfAssociation.message}
                </p>
              )}
            </Grid>
          )}
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termAndConditions}
                  onChange={handleTermsAndConditionsChange}
                  color="primary"
                  id="termAndConditions"
                  name="termAndConditions"
                  inputRef={register}
                  required
                  defaultValue={data?.termAndConditions}
                />
              }
              label={t("acceptTheTerms")}
            />
            {errors.termAndConditions && (
              <p className={classes.error}>
                {errors.termAndConditions.message}
              </p>
            )}
          </Grid>
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

export default RegistrationDocumentsForm;
