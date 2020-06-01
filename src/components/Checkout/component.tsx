import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DeliveryAddress from "../../core/interfaces/deliveryAddress";
import { CheckoutType } from "../../core/types/checkout";
import CheckoutList from "./List";
import useStyles from "./styles";

interface CheckoutProps {
  checkout: CheckoutType;
  deliveryDays: string[];
  deliveryAddresses: DeliveryAddress[];
  onDeliveryOptionUpdate: Function;
  onDeliveryDateUpdate: Function;
  onDeliveryAddressUpdate: Function;
  checkoutPath: string;
}

const Checkout: React.FC<CheckoutProps> = (props: CheckoutProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    checkout,
    deliveryDays,
    deliveryAddresses,
    onDeliveryOptionUpdate,
    onDeliveryDateUpdate,
    onDeliveryAddressUpdate,
    checkoutPath,
  } = props;

  const deliveryDateInputLabel = React.useRef<HTMLLabelElement>(null);
  const [deliveryDateLabelWidth, setDeliveryDateLabelWidth] = useState(0);
  const deliveryAddressInputLabel = React.useRef<HTMLLabelElement>(null);
  const [deliveryAddressLabelWidth, setDeliveryAddressLabelWidth] = useState(0);

  const handleDateChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    setDeliveryDateLabelWidth(
      deliveryDateInputLabel.current
        ? deliveryDateInputLabel.current.offsetWidth
        : 0
    );
    onDeliveryDateUpdate(event.target.value);
  };

  useEffect(() => {
    setDeliveryDateLabelWidth(
      deliveryDateInputLabel.current
        ? deliveryDateInputLabel.current.offsetWidth
        : 0
    );

    if (checkout?.deliveryAddress) {
      setDeliveryAddressLabelWidth(
        deliveryAddressInputLabel.current
          ? deliveryAddressInputLabel.current.offsetWidth
          : 0
      );
    }
  }, []);

  const handleAddressChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    setDeliveryAddressLabelWidth(
      deliveryAddressInputLabel.current
        ? deliveryAddressInputLabel.current.offsetWidth
        : 0
    );
    onDeliveryAddressUpdate(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h1" className={classes.header}>
          {t("chooseDeliveryOptions")}
        </Typography>

        <CheckoutList
          items={checkout?.items}
          onDeliveryOptionUpdate={onDeliveryOptionUpdate}
        />

        <Grid item xs={12} className={classes.totalDelivery}>
          <Typography>
            {t("totalDeliveryCost")} {checkout?.deliveryFeeNet.toFixed(2)}€
          </Typography>
        </Grid>
        <Grid container item className={classes.selects}>
          <Grid item xs={12} md={6}>
            {checkout && (
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  shrink
                  id="deliveryDate"
                  ref={deliveryDateInputLabel}
                >
                  {t("deliveryDate")}
                </InputLabel>

                <Select
                  labelWidth={deliveryDateLabelWidth}
                  id="deliveryDate"
                  defaultValue={checkout.earliestDeliveryDate}
                  onChange={(event) => handleDateChange(event)}
                  fullWidth
                >
                  {deliveryDays.map((day) => (
                    <MenuItem value={day} key={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={12} md={6} className={classes.address}>
            {deliveryAddresses.length < 1 && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                to={"/profile/company"}
              >
                {t("addDeliveryAddress")}
              </Button>
            )}
            {deliveryAddresses.length > 0 && (
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  shrink
                  id="deliveryAddress"
                  ref={deliveryAddressInputLabel}
                >
                  {t("deliveryAddress")}
                </InputLabel>
                <Select
                  id="deliveryAddress"
                  labelWidth={deliveryAddressLabelWidth}
                  onChange={(event) => handleAddressChange(event)}
                  defaultValue={
                    checkout.deliveryAddress ? checkout.deliveryAddress : ""
                  }
                >
                  {deliveryAddresses?.map((deliveryAddress: any) => (
                    <MenuItem
                      key={deliveryAddress.id}
                      value={deliveryAddress.id}
                    >
                      {deliveryAddress.street}, {deliveryAddress.zip}{" "}
                      {deliveryAddress.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>

          <Divider />

          <Grid item xs={12} className={classes.actionButtons}>
            <Button type="submit" variant="contained" component={Link} to={"/"}>
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.proceed}
              component={Link}
              to={checkoutPath}
              disabled={!checkout.deliveryAddress}
            >
              {t("proceed")}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Checkout;
