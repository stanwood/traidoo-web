import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import {
  deleteCartRequest,
  getCartRequest,
  modifyCartRequest,
  removeFromCartRequest,
} from "../../../api/queries/cart";
import { Context } from "../../../core/context";
import CartStateType from "../../../core/types/cart";
import Cart from "../../Cart/Cart/component";
import CartItem from "../../Cart/CartItem/component";
import useStyles from "./DrawerRight.styles";

const DrawerRight = ({ open, toolbarClassName }: any) => {
  const classes = useStyles();
  const context = useContext(Context);
  const { t } = useTranslation();
  const [cart, setCart] = useState<CartStateType>({
    earliestDeliveryDate: null,
    items: {},
  });

  const [cartAdd] = useMutation(modifyCartRequest);
  const [deleteCartMutation] = useMutation(deleteCartRequest);
  const [removeFromCartMutation] = useMutation(removeFromCartRequest);

  const { refetch: refetchCart } = useQuery("/cart", getCartRequest, {
    onSuccess: (data: any) => {
      context.dispatch({ type: "cart", payload: data });
    },
  });

  useEffect(() => {
    setCart(context.state.cart);
  }, [context.state.cart]);

  const buttonDisabled = () => Object.entries(cart.items).length === 0;

  const removeFromCart = async (productId: number) => {
    await removeFromCartMutation({ productId });
    refetchCart();
  };

  const deleteCart = async () => {
    await deleteCartMutation();
    refetchCart();
  };

  const increaseQuantity = async (productId: string) => {
    await cartAdd({
      productId: Number(productId),
      quantity: cart.items[productId].quantity + 1,
    });
    refetchCart();
  };

  const decreaseQuantity = async (productId: string) => {
    await cartAdd({
      productId: Number(productId),
      quantity: cart.items[productId].quantity - 1,
    });
    refetchCart();
  };

  const renderItems = () => {
    return Object.keys(cart.items).map(
      (productId: string, index: number, data: string[]) => {
        return (
          <div key={productId}>
            <CartItem
              id={productId}
              title={cart.items[productId].product.name}
              onRemove={() => {
                removeFromCart(Number(productId));
              }}
              onIncrease={() => increaseQuantity(productId)}
              onDecrease={() => decreaseQuantity(productId)}
              totalPrice={0}
              quantity={cart.items[productId].quantity}
              price={
                cart.items[productId].product.price *
                cart.items[productId].product.amount
              }
              unit={cart.items[productId].product.unit}
            />
            {data[index + 1] && <Divider />}
          </div>
        );
      }
    );
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
              onClick={() => deleteCart()}
              disabled={buttonDisabled()}
            >
              {t("deleteAll")}
            </Button>
            <Button
              component={RouterLink}
              to="/checkout"
              variant="contained"
              color="primary"
              disabled={buttonDisabled()}
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
