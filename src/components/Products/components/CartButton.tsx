import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React, { useContext, useMemo } from "react";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { CartContext } from "../../../contexts/CartContext/context";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useTranslation } from "react-i18next";

const useProductCartButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      backgroundColor: "transparent",
      width: 130,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    removeIcon: {
      color: theme.palette.error.main,
    },
    error: {
      flexBasis: "100%",
      display: "block",
      textAlign: "left",
      width: 130,
    },
  })
);

interface ProductCartButtonProps {
  productId: number;
  price: number;
  unit: string;
  name: string;
  amount: number;
  itemsAvailable: number;
}

const ProductCartButton = (props: ProductCartButtonProps): JSX.Element => {
  const { productId, price, unit, name, amount, itemsAvailable } = props;
  const classes = useProductCartButtonStyles();
  const { t } = useTranslation();
  const [quantity, setQuantity] = React.useState<number | string>(1);
  const {
    isProductInCart,
    addProduct,
    removeProduct,
    productsLimitReached,
  } = useContext(CartContext);

  const productInCart = isProductInCart(productId);
  const tooltipText = React.useMemo(
    () => (!productInCart && productsLimitReached ? t("cartLimitMessage") : ""),
    [productInCart, productsLimitReached, t]
  );

  let isValid = useMemo((): string | null => {
    if (quantity === "") {
      return t("incorrectValue");
    }

    if (Number(quantity) < 1) {
      return t("incorrectValue");
    }

    if (itemsAvailable && Number(quantity) > itemsAvailable) {
      return t("onlyNItemsAvailable", { itemsAvailable });
    }

    if (!Number.isInteger(Number(quantity))) {
      return t("incorrectValue");
    }

    return null;
  }, [quantity, itemsAvailable, t]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    addProduct({
      id: productId,
      amount,
      name,
      price,
      unit,
      quantity: Number(quantity),
      maxQuantity: itemsAvailable - Number(quantity),
    });
  };

  return (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        component="form"
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <InputBase
          type="number"
          className={classes.input}
          inputProps={{
            min: 1,
            max: itemsAvailable || 1,
            step: 1,
            type: "number",
            pattern: "[0-9]",
          }}
          defaultValue={1}
          onChange={handleChange}
          disabled={productInCart}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <Tooltip title={tooltipText} arrow>
          <span>
            <IconButton
              aria-label="add to cart"
              className={clsx(productInCart && classes.removeIcon)}
              disabled={
                (!productInCart && productsLimitReached) || Boolean(isValid)
              }
              onClick={() =>
                productInCart
                  ? removeProduct(productId)
                  : addProduct({
                      id: productId,
                      amount,
                      name,
                      price,
                      unit,
                      quantity: Number(quantity),
                      maxQuantity: itemsAvailable - Number(quantity),
                    })
              }
            >
              {productInCart ? (
                <RemoveShoppingCartIcon />
              ) : (
                <AddShoppingCartIcon />
              )}
            </IconButton>
          </span>
        </Tooltip>
      </Paper>
      {isValid && <div className={classes.error}>{isValid}</div>}
    </>
  );
};

export default ProductCartButton;
