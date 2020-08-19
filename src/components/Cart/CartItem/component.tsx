import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  ListItem,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Remove";
import Dinero from "dinero.js";
import React, { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext/context";
import { CartProduct } from "../../../contexts/CartContext/interfaces";
import useStyles from "./styles";

const CartItem: React.FC<{
  product: CartProduct;
}> = (props: { product: CartProduct }) => {
  const { product } = props;
  const { removeProduct, setProductQuantity } = useContext(CartContext);
  const classes = useStyles();

  const totalPrice = Dinero({
    amount: Math.round(product.price * 100),
    currency: "EUR",
  })
    .multiply(product.quantity)
    .toUnit();

  const decreaseQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      setProductQuantity(id, quantity);
    } else {
      removeProduct(id);
    }
  };

  return (
    <ListItem className={classes.cartItem}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            spacing={0}
            justify="space-between"
            alignItems="center"
          >
            <Grid key={1} item xs={10}>
              <Typography variant="h6" className={classes.title}>
                {product.name}
              </Typography>
            </Grid>
            <Grid key={2} item xs={2} className={classes.removeButton}>
              <IconButton onClick={() => removeProduct(product.id)}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            justify="space-between"
            alignItems="center"
          >
            <Grid key={1} item>
              {product.quantity} {product.unit} a {product.price.toFixed(2)}€ /{" "}
              {product.unit}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            justify="space-between"
            alignItems="center"
          >
            <Grid key={1} item>
              <Typography variant="h6">{totalPrice.toFixed(2)}€</Typography>
            </Grid>
            <Grid key={2} item>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() =>
                    decreaseQuantity(product.id, product.quantity - 1)
                  }
                >
                  <RemoveIcon />
                </Button>
                <Button disabled>{product.quantity}</Button>
                <Button
                  onClick={() =>
                    setProductQuantity(product.id, product.quantity + 1)
                  }
                >
                  <AddIcon />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default CartItem;
