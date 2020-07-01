import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Region } from "../../../../../api/queries/regions";
import useStyles from "../styles";

interface AvailabilityProps {
  regions: Region[];
}

const Availability: React.FC<AvailabilityProps> = (
  props: AvailabilityProps
) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
  const { regions } = props;
  const { getValues, setValue, register } = useFormContext();

  useEffect(() => {
    register("regions");
  }, [register]);

  useEffect(() => {
    setSelectedRegions(getValues().regions);
  }, [getValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValues = getValues().regions;

    if (event.target.checked) {
      setValue("regions", [
        ...currentValues,
        regions.find((region) => region.id === Number(event.target.value)),
      ]);
    } else {
      setValue(
        "regions",
        currentValues.filter(
          (value: Region) => value.id !== Number(event.target.value)
        )
      );
    }

    setSelectedRegions(getValues().regions);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        {t("availability")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormGroup row>
            {regions.map((region) => (
              <FormControlLabel
                key={region.id}
                control={
                  <Checkbox
                    name="regions"
                    color="primary"
                    value={region.id}
                    checked={selectedRegions
                      .map((region) => region.id)
                      .includes(region.id)}
                    onChange={handleChange}
                  />
                }
                label={region.name}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Availability;
