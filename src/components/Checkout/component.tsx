import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import i18n from "../../i18n";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import localeMap from "../../core/localeMap";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { getCurrencySymbol } from "../../core/constants/currencies";
import EmptyCartMessage from "../EmptyCartMessage";
import CheckoutList from "./List";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import useStyles from "./styles";
import { CheckoutContext } from "../../pages/Checkout/context";
import addDays from "date-fns/addDays";
import { format } from "date-fns";

const now = Date.now();

const Checkout = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const notistackRef = React.createRef<any>();
  const {
    checkoutDelivery,
    deliveryAddresses,
    updateDeliveryDate,
    isCheckoutEnabled,
    updateDeliveryAddress,
    updateDeliveryOptionBulk,
    deliveryOption,
  } = React.useContext(CheckoutContext);

  const [deliveryDate, setDeliveryDate] = React.useState<
    string | null | undefined
  >(checkoutDelivery?.earliestDeliveryDate);

  if (checkoutDelivery && checkoutDelivery.items.length < 1) {
    return <EmptyCartMessage />;
  }

  return (
    <Container maxWidth="md">
      <SnackbarProvider
        maxSnack={1}
        ref={notistackRef}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={6000}
        action={(key) => (
          <>
            <Button
              onClick={() => {
                updateDeliveryOptionBulk({ deliveryOption });
                notistackRef.current.closeSnackbar(key);
              }}
            >
              {t("Yes")}
            </Button>
            <Button onClick={() => notistackRef.current.closeSnackbar(key)}>
              {t("No")}
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
              {t("totalDeliveryCost")}{" "}
              {checkoutDelivery?.deliveryFeeNet.toFixed(2)}
              {getCurrencySymbol()}
            </Typography>
          </Grid>
          <Grid container item className={classes.selects}>
            <Grid item xs={12} md={6}>
              {checkoutDelivery && (
                <FormControl variant="outlined" className={classes.formControl}>
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    locale={localeMap[i18n.language]}
                  >
                    <DatePicker
                      disablePast={true}
                      minDate={addDays(now, 1)}
                      maxDate={addDays(now, 8)}
                      autoOk={true}
                      variant="inline"
                      margin="normal"
                      format="dd.MM.yyyy"
                      id="deliveryDate"
                      name="deliveryDate"
                      label={t("deliveryDate")}
                      value={deliveryDate}
                      onChange={(date) =>
                        date &&
                        updateDeliveryDate({
                          date: format(date, "yyyy-MM-dd"),
                        }) &&
                        setDeliveryDate(format(date, "yyyy-MM-dd"))
                      }
                      fullWidth
                      required
                      inputVariant="outlined"
                      data-testid="input-product-item-latest-delivery-date"
                      className={classes.noTopMargin}
                    />
                  </MuiPickersUtilsProvider>
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
                    value={checkoutDelivery?.deliveryAddress || ""}
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
