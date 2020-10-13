import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GlobalSettings } from "../../../../../core/interfaces/settings";
import { productUnits } from "../../constants";
import ControlledTextInput from "../Fields/ControlledTextField";
import useStyles from "../styles";

interface PricingProps {
  globalSettings?: GlobalSettings;
}

const Pricing: React.FC<PricingProps> = (props: PricingProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { errors, control } = useFormContext();
  const { globalSettings } = props;

  const endAdornment = useMemo(() => {
    return {
      endAdornment: (
        <Controller
          name="unit"
          control={control}
          as={
            <Select
              required
              className={classes.endAdornment}
              variant="outlined"
            >
              {Object.entries(productUnits).map(([key, name]) => {
                return (
                  <MenuItem value={key} key={key}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          }
        />
      ),
    };
  }, [classes.endAdornment, control]);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        {t("pricing")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            as={TextField}
            type="number"
            name="price"
            defaultValue=""
            variant="outlined"
            fullWidth
            required
            label={t("price")}
            error={errors.price ? true : false}
            helperText={errors.price ? errors.price.message : ""}
            InputProps={endAdornment}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            required
            error={errors.vat ? true : false}
          >
            <InputLabel id="vatLabelId">{t("vat")}</InputLabel>
            <Controller
              name="vat"
              control={control}
              as={
                <Select
                  labelId="vatLabelId"
                  label={t("vat")}
                  variant="outlined"
                >
                  {globalSettings?.productVat.map((v: number) => {
                    return (
                      <MenuItem value={v} key={v}>
                        {v}
                      </MenuItem>
                    );
                  })}
                </Select>
              }
            />

            <FormHelperText>
              {errors.vat ? errors.vat.message : ""}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <ControlledTextInput
            name="amount"
            label={t("unitsPerLot")}
            type="number"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Pricing;
