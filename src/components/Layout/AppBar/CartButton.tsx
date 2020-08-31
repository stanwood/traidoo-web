import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import React, { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext/context";
import { DrawerContext } from "../../../contexts/DrawerContext/context";

interface CartButtonProps {
  styleName?: string;
}

const CartButton: React.FC<CartButtonProps> = (props: CartButtonProps) => {
  const { styleName } = props;
  const { toggleRightDrawer } = useContext(DrawerContext);
  const { cart } = useContext(CartContext);

  return (
    <IconButton
      edge="start"
      className={styleName}
      color="inherit"
      aria-label="cart"
      onClick={toggleRightDrawer}
    >
      <Badge badgeContent={cart.products.length} color="secondary">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default CartButton;
