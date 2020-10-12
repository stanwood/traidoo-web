import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext/context";
import Cart from "../Cart/component";
import CartItem from "../CartItem/component";
import { useCartStyles } from "./styles";

const RenderCart: React.FC = () => {
  const classes = useCartStyles();
  const { cart, clear, cartTotal } = useContext(CartContext);
  const { t } = useTranslation();

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
        <Button
          component={RouterLink}
          to="/checkout"
          variant="contained"
          color="primary"
          disabled={cart.products.length === 0}
        >
          {t("checkout")} {cartTotal.toFixed(2)}€
        </Button>
      </Grid>
    </Grid>
  );
};

export default RenderCart;
