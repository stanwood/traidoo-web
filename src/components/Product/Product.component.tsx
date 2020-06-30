import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import LazyLoad from "react-lazyload";
import { CartContext } from "../../contexts/CartContext/context";
import { default as DeliveryOptionType } from "../../core/types/deliveryOption";
import Product from "../../core/types/product";
import { ProductIcon } from "../ProductIcon/ProductIcon.component";
import DeliveryOption from "./DeliveryOption";
import EditButton from "./editButton";
import useStyles from "./Product.styles";

const ProductDetail = ({
  product,
  error,
  showEditButton = false,
}: {
  product: Product;
  error: any;
  addToCart?: Function;
  removeFromCart?: Function;
  showEditButton?: boolean;
}) => {
  const classes = useStyles();
  const { isProductInCart, addProduct, removeProduct } = useContext(
    CartContext
  );
  const { t } = useTranslation();

  const grossPrice = (price: number, vat: number): number => {
    return (
      Math.round((price + price * (vat / 100) + Number.EPSILON) * 100) / 100
    );
  };

  const getDeliveryPrice = (deliveryId: number) => {
    const deliveries: { [key: number]: string } = {
      0: "logistics",
      1: "seller",
      2: "pickup",
    };

    return product.delivery ? product.delivery[deliveries[deliveryId]] : null;
  };

  const cartButton = (
    productId: number,
    price: number,
    unit: string,
    name: string,
    amount: number
  ) => {
    if (isProductInCart(productId)) {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.addToCart}
          onClick={() => removeProduct(productId)}
        >
          {t("removeFromCart")}
        </Button>
      );
    }

    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.addToCart}
        onClick={() =>
          addProduct({ id: productId, amount, name, price, unit, quantity: 1 })
        }
      >
        {t("addToCart")}
      </Button>
    );
  };

  if (error) {
    return <Alert severity="error">{t("error")}</Alert>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Box
            component={Paper}
            className={classes.paper}
            display="flex"
            flex="1"
            flexDirection="column"
          >
            <Hidden mdUp>
              <LazyLoad>
                <Img
                  src={product.image}
                  loader={
                    <Skeleton variant="rect" className={classes.imageLoader} />
                  }
                  className={classes.image}
                />
              </LazyLoad>
            </Hidden>

            <Box
              className={classes.content}
              display="flex"
              flex="1"
              flexDirection="column"
            >
              <Typography variant="h4" className={classes.marginBottom}>
                {product.name}
              </Typography>

              <Typography>{product.seller.companyName}</Typography>
              <Typography className={classes.marginBottom}>
                {t("from")} {product.seller.city}, {product.region.name}
              </Typography>

              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.category}
              >
                {product.category.name}
              </Typography>

              <Typography>{product.description}</Typography>

              <Box className={classes.bottom}>
                {showEditButton && (
                  <EditButton
                    productId={product.id}
                    className={classes.editButton}
                  />
                )}

                <Typography variant="subtitle2" color="textSecondary">
                  {t("centralLogisticsPrices")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Hidden smDown>
              <LazyLoad>
                <Img
                  src={product.image}
                  loader={
                    <Skeleton variant="rect" className={classes.imageLoader} />
                  }
                  className={classes.image}
                />
              </LazyLoad>
            </Hidden>

            <Box className={classes.content}>
              {product.price && (
                <Typography variant="h4">
                  {product.price}€ / {product.unit}
                </Typography>
              )}
              {product.price && (
                <Typography variant="subtitle2" color="textSecondary">
                  {product.vat}% {t("vat")},{" "}
                  {grossPrice(product.price, product.vat).toFixed(2)}€{" "}
                  {t("gross")}
                </Typography>
              )}

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                {t("lotSize")}
              </Typography>
              <Typography>
                {product.amount} {product.unit}
              </Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                {t("containerDeposit")}
              </Typography>
              <Typography>
                {product.containerType.deposit
                  ? product.containerType.deposit.toFixed(2)
                  : 0}
                €
              </Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                {t("availableItems")}
              </Typography>
              <Typography>{product.itemsAvailable}</Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                {t("deliveryOptions")}
              </Typography>
              {product.deliveryOptions.map((delivery: DeliveryOptionType) => (
                <DeliveryOption
                  key={delivery.id}
                  id={delivery.id}
                  name={delivery.name}
                  price={getDeliveryPrice(delivery.id)}
                />
              ))}

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                {t("containerType")}
              </Typography>
              <Typography>{product.containerType.sizeClass}</Typography>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className={classes.subtitle}
              >
                {t("properties")}
              </Typography>

              <Typography>
                <ProductIcon
                  iconName="organic"
                  className={classes.propertyIcon}
                  active={product.isOrganic}
                />
                {t("organic")}
              </Typography>

              <Typography>
                <ProductIcon
                  iconName="range"
                  className={classes.propertyIcon}
                  active={product.isGrazingAnimal}
                />
                {t("freeRange")}
              </Typography>

              <Typography>
                <ProductIcon
                  iconName="gmo"
                  className={classes.propertyIcon}
                  active={product.isGmoFree}
                />
                {t("gvoFree")}
              </Typography>

              <Typography>
                <ProductIcon
                  iconName="vegan"
                  className={classes.propertyIcon}
                  active={product.isVegan}
                />
                {t("vegan")}
              </Typography>

              <Typography>
                <ProductIcon
                  iconName="gluten"
                  active={product.isGlutenFree}
                  className={classes.propertyIcon}
                />
                {t("glutenFree")}
              </Typography>
            </Box>
            {product?.price && (
              <Box className={classes.actions}>
                {cartButton(
                  product.id,
                  product.price,
                  product.unit,
                  product.name,
                  product.amount
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;
