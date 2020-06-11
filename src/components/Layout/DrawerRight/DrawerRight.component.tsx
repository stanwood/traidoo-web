import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import Cart from "../../Cart/Cart/component";
import CartItem from "../../Cart/CartItem/component";
import useStyles from "./DrawerRight.styles";

const DrawerRight = ({ open, toolbarClassName }: any) => {
  const classes = useStyles();
  const { cart, clear } = useContext(CartContext);
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
    <nav className={classes.drawer}>
      <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        open={open}
      >
        <div className={toolbarClassName} />
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
              variant="contained"
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
              {t("checkout")}
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </nav>
  );
};

export default DrawerRight;
