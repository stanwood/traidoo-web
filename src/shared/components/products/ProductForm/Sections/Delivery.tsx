import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@material-ui/lab/Autocomplete";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Container } from "../../../../../api/queries/containers";
import InputAdornment from "@material-ui/core/InputAdornment";
import Config from "../../../../../config";
import DeliveryOption from "../../../../../core/types/deliveryOption";
import { deliveryOptions } from "../../constants";
import ControlledTextInput from "../Fields/ControlledTextField";
import useStyles from "../styles";
import { getCurrencySymbol } from "../../../../../core/constants/currencies";

interface DeliveryProps {
  containers: Container[];
}

const Delivery: React.FC<DeliveryProps> = (props: DeliveryProps) => {
  const { containers } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const sellerDeliveryOption = deliveryOptions.find(
    (option) => option.name === "seller"
  );
  const { errors, control, getValues, register, setValue } = useFormContext();
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState<
    DeliveryOption[]
  >([]);

  const autoCompleteClasses = useMemo(
    () => ({
      option: classes.option,
    }),
    [classes.option]
  );

  const inputProps = useCallback((params: AutocompleteRenderInputParams) => {
    return {
      ...params.inputProps,
      autoComplete: "new-password",
    };
  }, []);

  useEffect(() => {
    register("deliveryOptions");
  }, [register]);

  useEffect(() => {
    setSelectedDeliveryOptions(getValues().deliveryOptions);
  }, [getValues]);

  const sellerDelivery: boolean = useMemo(() => {
    return Boolean(
      selectedDeliveryOptions.find((deliveryOption) => deliveryOption.id === 1)
    );
  }, [selectedDeliveryOptions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValues = getValues().deliveryOptions;

    if (event.target.checked) {
      setValue("deliveryOptions", [
        ...currentValues,
        deliveryOptions.find(
          (deliveryOption) => deliveryOption.id === Number(event.target.value)
        ),
      ]);
    } else {
      setValue(
        "deliveryOptions",
        currentValues.filter(
          (value: DeliveryOption) => value.id !== Number(event.target.value)
        )
      );
    }

    setSelectedDeliveryOptions(getValues().deliveryOptions);

    if (
      !event.target.checked &&
      Number(event.target.value) === sellerDeliveryOption?.id
    ) {
      setValue("thirdPartyDelivery", false);
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        {t("delivery")}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            render={(props) => (
              <Autocomplete
                {...props}
                fullWidth
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.sizeClass
                }
                options={containers}
                classes={autoCompleteClasses}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("containerType")}
                    variant="outlined"
                    required
                    inputProps={inputProps(params)}
                    error={errors.containerTypeId ? true : false}
                    helperText={
                      errors.containerTypeId
                        ? errors.containerTypeId.message
                        : ""
                    }
                  />
                )}
                onChange={(_, data) => props.onChange(data)}
              />
            )}
            name="container"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {sellerDelivery && (
            <ControlledTextInput
              name="deliveryCharge"
              label={t("priceDeliverySeller")}
              type="number"
              required={sellerDelivery}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {getCurrencySymbol()}
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            {deliveryOptions.map((deliveryOption) => (
              <FormControlLabel
                key={deliveryOption.id}
                label={deliveryOption.label}
                control={
                  <Checkbox
                    color="primary"
                    name="deliveryOptions"
                    value={deliveryOption.id}
                    checked={selectedDeliveryOptions
                      .map((option) => option.id)
                      .includes(deliveryOption.id)}
                    onChange={handleChange}
                  />
                }
              />
            ))}
            {Config.features.routes && (
              <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name="thirdPartyDelivery"
                    render={(props) => (
                      <Checkbox
                        disabled={!sellerDelivery}
                        color="primary"
                        onChange={(e) => props.onChange(e.target.checked)}
                        checked={props.value}
                      />
                    )}
                  />
                }
                label={t("thirdPartyDelivery")}
              />
            )}
          </FormGroup>
          <FormHelperText className={classes.error}>
            {errors.deliveryOptions ? errors.deliveryOptions.message : ""}
          </FormHelperText>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Delivery;
