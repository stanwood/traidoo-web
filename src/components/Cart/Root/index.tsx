import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getSettingsRequest } from "../../../api/queries/settings/settings";
import { CartContext } from "../../../contexts/CartContext/context";
import Cart from "../Cart/component";
import CartItem from "../CartItem/component";
import { useCartStyles } from "./styles";

const RenderCart = () => {
  const classes = useCartStyles();
  const { cart, clear, cartTotal } = useContext(CartContext);
  const { t } = useTranslation();
  const { data: settings, isLoading } = useQuery(
    "/settings",
    getSettingsRequest
  );

  const isPriceTooLow = React.useMemo(() => {
    if (cartTotal === 0) {
      return false;
    }

    if (!settings?.minPurchaseValue) {
      return false;
    }

    if (settings.minPurchaseValue > cartTotal) {
      return true;
    }

    return false;
  }, [settings, cartTotal]);

  const disableButton = React.useMemo(() => {
    if (isLoading) {
      return true;
    }

    if (!settings?.minPurchaseValue) {
      return true;
    }

    if (settings.minPurchaseValue > cartTotal) {
      return true;
    }

    return false;
  }, [isLoading, cartTotal, settings]);

  const renderItems = () => {
    return cart.products.map((product) => {
      return (
        <div key={product.id}>
          <CartItem product={product} />
        </div>
      );
    });
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      className={classes.grid}
      aria-label="cart"
    >
      <Grid item>
        <Cart>{renderItems()}</Cart>
      </Grid>
      <Grid item className={classes.actionButtons}>
        <Divider className={classes.actionDivider} />
        <Button
          className={classes.actionLeftButton}
          onClick={() => clear()}
          disabled={cart.products.length === 0}
        >
          {t("deleteAll")}
        </Button>
        {isPriceTooLow ? (
          <Tooltip
            title={`${t("checkoutPriceTooLow")} ${settings?.minPurchaseValue}€`}
            arrow
          >
            <span>
              <Button variant="contained" color="primary" disabled>
                {t("checkout")} {cartTotal.toFixed(2)}€
              </Button>
            </span>
          </Tooltip>
        ) : (
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            color="primary"
            disabled={disableButton}
          >
            {t("checkout")} {cartTotal.toFixed(2)}€
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default RenderCart;
