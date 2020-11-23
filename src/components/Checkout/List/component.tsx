import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";
import useStyles from "./styles";
import { useSnackbar } from "notistack";
import { CheckoutContext } from "../../../pages/Checkout/context";
import SelectDeliveryOption from "./SelectDeliveryOption";

const CheckoutList = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    checkoutDelivery,
    updateDeliveryOption,
    setDeliveryOption,
  } = React.useContext(CheckoutContext);

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    index: number,
    productId: number
  ) => {
    updateDeliveryOption({
      productId,
      deliveryOption: Number(event.target.value),
    }).then(() => {
      if (
        index === 0 &&
        checkoutDelivery &&
        checkoutDelivery.items.length > 0 &&
        checkoutDelivery.items.filter((item) =>
          item.deliveryOptions
            .map((item) => item.id)
            .includes(Number(event.target.value))
        ).length > 1
      ) {
        setDeliveryOption(Number(event.target.value));
        enqueueSnackbar(
          "Would you like to set the selected delivery for all items?"
        );
      }
    });
  };

  return (
    <Box>
      {checkoutDelivery?.items?.map((item, index) => (
        <Grid container spacing={0} key={item.id} className={classes.item}>
          <Grid item xs={12} md={6} className={classes.productName}>
            {item.product.name}
          </Grid>
          <Grid item xs={12} md={6} className={classes.delivery}>
            <SelectDeliveryOption
              index={index}
              item={item}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default CheckoutList;
