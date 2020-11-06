import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Img } from "react-image";
import LazyLoad from "react-lazyload";
import { CartContext } from "../../contexts/CartContext/context";
import { UserContext } from "../../contexts/UserContext/context";
import { getCurrencySymbol } from "../../core/constants/currencies";
import { default as DeliveryOptionType } from "../../core/types/deliveryOption";
import { ProductIcon } from "../ProductIcon/ProductIcon.component";
import DeliveryOption from "./DeliveryOption";
import EditButton from "./editButton";
import { ProductDetailsProps } from "./interfaces";
import useProductDetailsStyles from "./styles";

const ProductDetails: React.FC<ProductDetailsProps> = (
  props: ProductDetailsProps
) => {
  const classes = useProductDetailsStyles();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const { product, error, showEditButton = false } = props;

  const ownProduct = useMemo(() => user.id === product.seller.id, [
    user.id,
    product.seller.id,
  ]);

  const { isProductInCart, addProduct, removeProduct } = useContext(
    CartContext
  );

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
    if (ownProduct) {
      return null;
    }

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
    <Box display="flex" className={classes.root} bgcolor="background.paper">
      <Box className={classes.description}>
        <Box
          className={classes.paper}
          display="flex"
          flex="1"
          flexDirection="column"
          flexGrow={1}
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
              color="primary"
              className={classes.category}
            >
              {product.category.name}
            </Typography>

            <Typography className={classes.productDescription}>
              {product.description}
            </Typography>

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
      </Box>
      <Box className={classes.details}>
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

        <Box className={classes.sideBar}>
          {product.price && (
            <Typography variant="h4">
              {product.price.toFixed(2)}
              {getCurrencySymbol()} / {t(product.unit)}
            </Typography>
          )}
          {product.price && (
            <Typography variant="subtitle2" color="primary">
              {product.vat}% {t("vat")},{" "}
              {grossPrice(product.price, product.vat).toFixed(2)}
              {getCurrencySymbol()} {t("gross")}
            </Typography>
          )}

          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.subtitle}
          >
            {t("lotSize")}
          </Typography>
          <Typography>
            {product.amount} {t(product.unit)}
          </Typography>

          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.subtitle}
          >
            {t("containerDeposit")}
          </Typography>
          <Typography>
            {product.containerType.deposit
              ? product.containerType.deposit.toFixed(2)
              : 0}
            {getCurrencySymbol()}
          </Typography>

          <Typography
            variant="subtitle2"
            color="primary"
            className={classes.subtitle}
          >
            {t("availableItems")}
          </Typography>
          <Typography>{product.itemsAvailable || 0}</Typography>

          <Typography
            variant="subtitle2"
            color="primary"
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
            color="primary"
            className={classes.subtitle}
          >
            {t("containerType")}
          </Typography>
          <Typography>{product.containerType.sizeClass}</Typography>

          <Typography
            variant="subtitle2"
            color="primary"
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
      </Box>
    </Box>
  );
};

export default ProductDetails;
