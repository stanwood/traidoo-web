import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import React, { useContext } from "react";
import { DrawerContext } from "../../../contexts/DrawerContext/context";
import RenderCart from "./Cart";
import { useDrawerRightStyles } from "./styles";

const DrawerRight: React.FC<{ toolbarClassName: string }> = ({
  toolbarClassName,
}: {
  toolbarClassName: string;
}) => {
  const classes = useDrawerRightStyles();
  const { rightDrawer, toggleRightDrawer } = useContext(DrawerContext);

  return (
    <nav className={classes.drawer} aria-label="cart">
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
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawer,
          }}
          open={rightDrawer}
          anchor="right"
        >
          <div className={toolbarClassName} />
          <RenderCart />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default DrawerRight;
