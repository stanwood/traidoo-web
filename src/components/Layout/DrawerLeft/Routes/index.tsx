import { Hidden } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import React, { useContext } from "react";
import { DrawerContext } from "../../../../contexts/DrawerContext/context";
import RoutesMenu from "./RoutesMenu";
import useRouteMenuStyles from "./styles";

interface RoutesDrawerProps {
  toolbarClassName: string;
}

const RoutesDrawer: React.FC<RoutesDrawerProps> = (
  props: RoutesDrawerProps
) => {
  const classes = useRouteMenuStyles();
  const { toolbarClassName } = props;
  const { leftDrawer, toggleLeftDrawer } = useContext(DrawerContext);

  return (
    <nav className={classes.drawer} aria-label="routes menu">
      <Hidden xlUp implementation="js">
        <Drawer
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawer,
          }}
          open={leftDrawer}
          ModalProps={{
            keepMounted: true,
            onBackdropClick: toggleLeftDrawer,
          }}
        >
          <div className={toolbarClassName} />
          <RoutesMenu />
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation="js">
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawer,
          }}
          open={leftDrawer}
        >
          <div className={toolbarClassName} />
          <RoutesMenu />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default RoutesDrawer;
