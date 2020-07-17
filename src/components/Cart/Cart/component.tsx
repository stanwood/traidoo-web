import { Box, Divider, List, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

const Cart: React.FC = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {t("shoppingCart")}
      </Typography>
      <Divider />
      <List dense={true}>{props.children}</List>
    </Box>
  );
};

export default Cart;
