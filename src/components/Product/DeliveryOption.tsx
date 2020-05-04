import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useTranslation } from "react-i18next";

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
        {props.price && (
          <Typography variant="subtitle1">{props.price.toFixed(2)}€</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default DeliveryOption;
