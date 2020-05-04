import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  ListItem,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Remove";
import Dinero from "dinero.js";
import React from "react";
import useStyles from "./styles";

const CartItem: React.FC<{
  id: string;
  title: string;
  onRemove: Function;
  onIncrease: Function;
  onDecrease: Function;
  totalPrice: number;
  quantity: number;
  price: number;
  unit: string;
}> = props => {
  const classes = useStyles();
  const totalPrice = Dinero({
    amount: Math.round(props.price * 100),
    currency: "EUR"
  })
    .multiply(props.quantity)
    .toUnit();

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
                {props.title}
              </Typography>
            </Grid>
            <Grid key={2} item xs={2} className={classes.removeButton}>
              <IconButton onClick={() => props.onRemove(props.id)}>
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
              {props.quantity} {props.unit} a {props.price.toFixed(2)}€ /{" "}
              {props.unit}
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
                <Button onClick={() => props.onDecrease(props.id)}>
                  <RemoveIcon />
                </Button>
                <Button disabled>{props.quantity}</Button>
                <Button onClick={() => props.onIncrease(props.id)}>
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
