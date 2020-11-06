import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { getCurrencySymbol } from "../../../core/constants/currencies";
import { deliveryOptionsMapping } from "./deliveryMapping";
import useStyles from "./styles";

const CheckoutList: React.FC<{
  items: any[] | undefined;
  onDeliveryOptionUpdate: Function;
}> = (props) => {
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    productId: number
  ) => {
    props.onDeliveryOptionUpdate(productId, event.target.value);
  };

  return (
    <Box>
      {props.items?.map((item) => (
        <Grid container spacing={0} key={item.id} className={classes.item}>
          <Grid item xs={12} md={6} className={classes.productName}>
            {item.product.name}
          </Grid>
          <Grid item xs={12} md={6} className={classes.delivery}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                defaultValue={item.deliveryOption.id}
                onChange={(event) => handleChange(event, item.product.id)}
              >
                {item.deliveryOptions.map((deliveryOption: any) => (
                  <MenuItem value={deliveryOption.id} key={deliveryOption.id}>
                    {deliveryOptionsMapping[deliveryOption.id]}{" "}
                    {deliveryOption.value.toFixed(2)}
                    {getCurrencySymbol()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default CheckoutList;
