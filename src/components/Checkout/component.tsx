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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CheckoutList from "./List";
import useStyles from "./styles";

const Checkout: React.FC<{
  checkout: any;
  deliveryDays: string[];
  deliveryAddresses: any;
  onDeliveryOptionUpdate: Function;
  onDeliveryDateUpdate: Function;
  onDeliveryAddressUpdate: Function;
  checkoutPath: string;
  buttonDisabled: boolean;
}> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const deliveryDateInputLabel = React.useRef<HTMLLabelElement>(null);
  const deliveryAddressInputLabel = React.useRef<HTMLLabelElement>(null);
  const [deliveryDateLabelWidth, setDeliveryDateLabelWidth] = useState(0);
  const [deliveryAddressLabelWidth, setDeliveryAddressLabelWidth] = useState(0);
  const [isDeliveryAddressSelected, setIsDeliveryAddressSelected] = useState<
    boolean
  >(false);
  const [isSelfDelivery, setIsSelfDelivery] = useState<boolean>(false);
  const [hasDeliveryAddress, setHasDeliveryAddress] = useState<boolean>(false);

  const buttonDisabled = () =>
    props.checkout?.items.length === 0 ||
    props.buttonDisabled === true ||
    (!hasDeliveryAddress && !isSelfDelivery) ||
    (!isSelfDelivery && !isDeliveryAddressSelected);

  React.useEffect(() => {
    setDeliveryDateLabelWidth(
      deliveryDateInputLabel.current
        ? deliveryDateInputLabel.current!.offsetWidth
        : 0
    );
    setDeliveryAddressLabelWidth(
      deliveryAddressInputLabel.current
        ? deliveryAddressInputLabel.current!.offsetWidth
        : 0
    );
    setHasDeliveryAddress(props.deliveryAddresses.length > 0);
    setIsDeliveryAddressSelected(!!props.checkout?.deliveryAddress);
    setIsSelfDelivery(
      !props.checkout?.items.some((item: any) => item.deliveryOption.id !== 2)
    );
  }, [props.checkout, props.deliveryAddresses.length]);

  const handleDateChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    props.onDeliveryDateUpdate(event.target.value);
  };

  const handleAddressChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    props.onDeliveryAddressUpdate(event.target.value);
    setIsDeliveryAddressSelected(true);
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h1" className={classes.header}>
          {t("chooseDeliveryOptions")}
        </Typography>

        <CheckoutList
          items={props.checkout?.items}
          onDeliveryOptionUpdate={props.onDeliveryOptionUpdate}
        />

        <Grid item xs={12} className={classes.totalDelivery}>
          <Typography>
            {t("totalDeliveryCost")} {props.checkout?.deliveryFeeNet.toFixed(2)}
            €
          </Typography>
        </Grid>
        <Grid container item className={classes.selects}>
          <Grid item xs={12} md={6}>
            {props.checkout && (
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
                  defaultValue={
                    props.checkout?.earliestDeliveryDate ||
                    props.deliveryDays[0]
                  }
                  onChange={(event) => handleDateChange(event)}
                  fullWidth
                >
                  {props.deliveryDays.map((day) => (
                    <MenuItem value={day} key={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={12} md={6} className={classes.address}>
            {!isSelfDelivery && !hasDeliveryAddress && (
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
            {!isSelfDelivery && hasDeliveryAddress && (
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
                  defaultValue={props.checkout?.deliveryAddress || ""}
                >
                  {props.deliveryAddresses?.map((deliveryAddress: any) => (
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
              to={props.checkoutPath}
              disabled={buttonDisabled()}
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
