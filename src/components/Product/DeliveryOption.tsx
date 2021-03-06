import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { getCurrencySymbol } from "../../core/constants/currencies";

const DeliveryOption = (props: {
  id: number;
  name: string;
  price: number | null;
}) => {
  const { t } = useTranslation();
  const deliveryNamesMapping: { [key: number]: string } = {
    0: t("centralLogistics*"),
    1: t("seller"),
    2: t("pickup"),
  };

  if (!deliveryNamesMapping[props.id]) {
    return null;
  }

  return (
    <Grid item xs={12} sm container>
      <Grid item xs container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="subtitle1">
            {deliveryNamesMapping[props.id]}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          {props.price ? props.price.toFixed(2) : "0.00"}
          {getCurrencySymbol()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DeliveryOption;
