import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { DrawerContext } from "../../../contexts/DrawerContext/context";

interface DrawerButtonProps {
  styleName?: string;
  responsive: boolean;
}

const DrawerButton: React.FC<DrawerButtonProps> = (
  props: DrawerButtonProps
) => {
  const { styleName, responsive } = props;
  const { toggleLeftDrawer } = useContext(DrawerContext);

  const iconButton = (
    <IconButton
      edge="start"
      className={styleName}
      color="inherit"
      aria-label="menu"
      onClick={toggleLeftDrawer}
    >
      <MenuIcon />
    </IconButton>
  );

  if (responsive) {
    return (
      <Hidden xlUp implementation="css">
        {iconButton}
      </Hidden>
    );
  }

  return iconButton;
};

export default DrawerButton;
