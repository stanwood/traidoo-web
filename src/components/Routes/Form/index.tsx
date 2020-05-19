import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { frequency } from "../frequency";
import PlacesField from "./PlacesField";
import useAddRouteStyles from "./styles";

const RouteForm = ({
  onSubmit,
  defaultData,
}: {
  onSubmit: any;
  defaultData?: any;
}) => {
  const classes = useAddRouteStyles();
  const { t } = useTranslation();

  const {
    handleSubmit,
    setValue,
    register,
    errors,
    control,
    getValues,
  } = useFormContext();

  const [days, setDays] = useState<number[]>([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "waypoints",
  });

  const setFormValue = (fieldName: string, fieldValue: any) => {
    setValue(fieldName, fieldValue);
  };

  const updateFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedDays = [...days];

    if (event.target.checked) {
      updatedDays.push(Number(event.target.name));
    } else {
      updatedDays = days.filter((day) => day !== Number(event.target.name));
    }

    setDays(updatedDays);
    setValue("frequency", updatedDays);
  };

  useEffect(() => {
    register("frequency");
  }, []);

  useEffect(() => {
    defaultData?.frequency ? setDays(defaultData.frequency) : null;
    defaultData?.waypoints ? append(defaultData.waypoints) : null;
  }, [defaultData]);

  return (
    <Container component={Paper} className={classes.paper} maxWidth="md">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              {t("general")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PlacesField
              fieldName={"origin"}
              label={t("origin")}
              onChange={setFormValue}
              control={control}
              errors={errors["origin"]}
              register={register}
              defaultValue={defaultData?.origin}
            />
          </Grid>
          <Grid item xs={12}>
            <PlacesField
              fieldName={"destination"}
              label={t("destination")}
              onChange={setFormValue}
              control={control}
              errors={errors["destination"]}
              defaultValue={defaultData?.destination}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              className={clsx(classes.title, classes.nextSection)}
            >
              {t("waypoints")}
            </Typography>
          </Grid>
          {fields.map((item, index) => {
            return (
              <Grid container item xs={12} key={`waypoint-${index}`}>
                <Grid item xs={11}>
                  <PlacesField
                    fieldName={`waypoints[${index}]`}
                    label={t("waypoint")}
                    control={control}
                    onChange={setFormValue}
                    errors={errors[`waypoints[${index}]`]}
                    defaultValue={defaultData?.waypoints[index]}
                  />
                </Grid>
                <Grid item xs={1} className={classes.removeIcon}>
                  <IconButton
                    color="primary"
                    aria-label="remove waypoint"
                    component="span"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                append("");
              }}
            >
              {t("addWaypoint")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              className={clsx(classes.title, classes.nextSection)}
            >
              {t("schedule")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              {Object.entries(frequency).map(([key, value]) => (
                <FormControlLabel
                  key={`${value}-${key}`}
                  control={
                    <Checkbox
                      checked={days.includes(Number(key))}
                      onChange={updateFrequency}
                      name={key}
                    />
                  }
                  label={value}
                />
              ))}
            </FormGroup>
            <FormHelperText className={classes.frequencyErrorMessage}>
              {errors.frequency ? errors.frequency.message : ""}
            </FormHelperText>
          </Grid>

          <Grid item container justify="flex-end" className={classes.actions}>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                to="/seller/logistic/routes"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.saveButton}
              >
                {t("save")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RouteForm;
