import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { DrawerContext } from "../../../contexts/DrawerContext/context";
import RenderCart from "./Cart";
import { useDrawerRightStyles } from "./styles";

const DrawerRight: React.FC<{ toolbarClassName: string }> = ({
  toolbarClassName,
}: {
  toolbarClassName: string;
}) => {
  const classes = useDrawerRightStyles();
  const location = useLocation();
  const { rightDrawer, toggleRightDrawer } = useContext(DrawerContext);

  const drawerVariant = useMemo(() => {
    return location.pathname.startsWith("/products/") ||
      location.pathname.startsWith("/sellers/")
      ? "temporary"
      : "permanent";
  }, [location.pathname]);

  return (
    <nav className={classes.drawerTemporary} aria-label="cart">
      <Hidden xlUp implementation="js">
        <Drawer
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawer,
          }}
          anchor="right"
          open={rightDrawer}
          ModalProps={{
            keepMounted: true,
            onBackdropClick: toggleRightDrawer,
          }}
        >
          <div className={toolbarClassName} />
          <RenderCart />
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation="js">
        <Drawer
          className={
            drawerVariant === "temporary"
              ? classes.drawerTemporary
              : classes.drawerPermanent
          }
          variant={drawerVariant}
          classes={{
            paper: classes.drawerPaper,
            root:
              drawerVariant === "temporary"
                ? classes.drawerTemporary
                : classes.drawerPermanent,
          }}
          open={rightDrawer}
          anchor="right"
          ModalProps={{
            keepMounted: true,
            onBackdropClick: toggleRightDrawer,
          }}
        >
          <div className={toolbarClassName} />
          <RenderCart />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default DrawerRight;
