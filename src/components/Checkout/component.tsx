import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import { getCurrencySymbol } from "../../core/constants/currencies";
import EmptyCartMessage from "../EmptyCartMessage";
import CheckoutList from "./List";
import useStyles from "./styles";
import { CheckoutContext } from "../../pages/Checkout/context";
import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import formatISO from "date-fns/formatISO";

const now = Date.now();

const deliveryDays = eachDayOfInterval({
  start: addDays(now, 1),
  end: addDays(now, 8),
}).map((day) => formatISO(day, { representation: "date" }));

const Checkout = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { closeSnackbar } = useSnackbar();
  const {
    checkout,
    deliveryAddresses,
    updateDeliveryDate,
    isCheckoutEnabled,
    updateDeliveryAddress,
    updateDeliveryOptionBulk,
    deliveryOption,
  } = React.useContext(CheckoutContext);

  if (checkout && checkout.items.length < 1) {
    return <EmptyCartMessage />;
  }

  return (
    <Container maxWidth="md">
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        action={(key) => (
          <>
            <Button
              onClick={() => {
                updateDeliveryOptionBulk({ deliveryOption });
                closeSnackbar(key);
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                closeSnackbar(key);
              }}
            >
              No
            </Button>
          </>
        )}
      >
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h1" className={classes.header}>
            {t("chooseDeliveryOptions")}
          </Typography>

          <CheckoutList />

          <Grid item xs={12} className={classes.totalDelivery}>
            <Typography>
              {t("totalDeliveryCost")} {checkout?.deliveryFeeNet.toFixed(2)}
              {getCurrencySymbol()}
            </Typography>
          </Grid>
          <Grid container item className={classes.selects}>
            <Grid item xs={12} md={6}>
              {checkout && (
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="deliveryDateLabel">
                    {t("deliveryDate")}
                  </InputLabel>

                  <Select
                    id="deliveryDate"
                    labelId="deliveryDateLabel"
                    label={t("deliveryDate")}
                    defaultValue={checkout.earliestDeliveryDate}
                    onChange={(event) =>
                      updateDeliveryDate({ date: event.target.value as string })
                    }
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
              {deliveryAddresses && deliveryAddresses.length < 1 && (
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
              {deliveryAddresses && deliveryAddresses.length > 0 && (
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="deliveryAddressLabel">
                    {t("deliveryAddress")}
                  </InputLabel>

                  <Select
                    labelId="deliveryAddressLabel"
                    id="deliveryAddress"
                    onChange={(event) =>
                      updateDeliveryAddress(Number(event.target.value))
                    }
                    value={checkout?.deliveryAddress || ""}
                    label={t("deliveryAddress")}
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
              <Button type="submit" component={Link} to={"/"}>
                {t("cancel")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.proceed}
                component={Link}
                to="/checkout/summary"
                disabled={!isCheckoutEnabled}
              >
                {!isCheckoutEnabled ? (
                  <CircularProgress size={24} />
                ) : (
                  t("proceed")
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </SnackbarProvider>
    </Container>
  );
};

export default Checkout;
