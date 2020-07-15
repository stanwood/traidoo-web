import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import React, { useContext } from "react";
import CategoriesProvider from "../../../../contexts/CategoryContext";
import { DrawerContext } from "../../../../contexts/DrawerContext/context";
import Categories from "../../../Categories";
import { useDrawerLeftStyles } from "./styles";

const CategoriesDrawer: React.FC<{ toolbarClassName: string }> = ({
  toolbarClassName,
}: {
  toolbarClassName: string;
}) => {
  const classes = useDrawerLeftStyles();
  const { leftDrawer, toggleLeftDrawer } = useContext(DrawerContext);

  return (
    <CategoriesProvider>
      <nav className={classes.drawer} aria-label="categories">
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
            <Categories />
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
            <Categories />
          </Drawer>
        </Hidden>
      </nav>
    </CategoriesProvider>
  );
};

export default CategoriesDrawer;
