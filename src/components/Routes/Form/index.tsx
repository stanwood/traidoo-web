import { yupResolver } from "@hookform/resolvers";
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
import React from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Route } from "../../../core/interfaces/routes";
import { RouteFormFields } from "../../../core/interfaces/routes/form";
import routesValidationSchema from "../../../pages/Routes/Add/validation";
import { frequency } from "../frequency";
import PlacesField from "./PlacesField";
import useAddRouteStyles from "./styles";

const RouteForm = ({
  onSubmit,
  defaultData,
}: {
  onSubmit: (data: RouteFormFields) => Promise<void>;
  defaultData?: Route;
}) => {
  const { t } = useTranslation();
  const classes = useAddRouteStyles();

  const updatedData = {
    ...defaultData,
    waypoints: defaultData?.waypoints.map((item, index) => {
      return { name: item };
    }),
  };

  const form = useForm<RouteFormFields>({
    defaultValues: updatedData,
    resolver: yupResolver(routesValidationSchema),
  });

  const { handleSubmit, control, errors, getValues } = form;

  const defaultChecked = defaultData?.frequency;

  const handleCheck = (checkedId: number): number[] => {
    const { frequency: ids } = getValues();
    const newIds = ids?.includes(checkedId)
      ? ids?.filter((id: number) => id !== checkedId)
      : [...(ids ?? []), checkedId];
    return newIds;
  };

  const {
    fields: waypointsFields,
    append: waypointsAppend,
    remove: waypointsRemove,
  } = useFieldArray({
    control,
    name: "waypoints",
  });

  return (
    <Container component={Paper} className={classes.paper} maxWidth="md">
      <FormProvider {...form}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.title}>
                {t("general")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <PlacesField fieldName={"origin"} label={t("origin")} />
            </Grid>
            <Grid item xs={12}>
              <PlacesField fieldName={"destination"} label={t("destination")} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                className={clsx(classes.title, classes.nextSection)}
              >
                {t("waypoints")}
              </Typography>
            </Grid>
            {waypointsFields.map((waypoint, index) => {
              return (
                <Grid container item xs={12} key={waypoint.id}>
                  <Grid item xs={11}>
                    <PlacesField
                      fieldName={`waypoints[${index}].name`}
                      label={t("waypoint")}
                    />
                  </Grid>
                  <Grid item xs={1} className={classes.removeIcon}>
                    <IconButton
                      color="primary"
                      aria-label="remove waypoint"
                      component="span"
                      onClick={() => waypointsRemove(index)}
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
                  waypointsAppend({ name: "" });
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
                <Controller
                  name="frequency"
                  // eslint-disable-next-line
                  // @ts-ignore
                  render={(props) =>
                    frequency.map((item, index) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={() =>
                              props.onChange(handleCheck(item.id))
                            }
                            defaultChecked={defaultChecked?.includes(item.id)}
                          />
                        }
                        key={item.id}
                        label={item.name}
                      />
                    ))
                  }
                  control={control}
                />
              </FormGroup>
              <FormHelperText className={classes.frequencyErrorMessage}>
                {/* eslint-disable-next-line */}
                {/* @ts-ignore */}
                {errors.frequency?.message}
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
      </FormProvider>
    </Container>
  );
};

export default RouteForm;
