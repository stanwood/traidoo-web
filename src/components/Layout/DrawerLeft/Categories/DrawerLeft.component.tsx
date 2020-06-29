import { Hidden } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import CategoriesProvider from "../../../../contexts/CategoryContext";
import Categories from "../../../Categories";
import useStyles from "./DrawerLeft.styles";

const DrawerLeft = ({ open, toolbarClassName }: any) => {
  const classes = useStyles();

  return (
    <CategoriesProvider>
      <nav className={classes.drawer} aria-label="categories">
        <Hidden xlUp implementation="css">
          <Drawer
            className={classes.drawer}
            variant="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={open}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={toolbarClassName} />
            <Categories />
          </Drawer>
        </Hidden>
        <Hidden lgDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={open}
          >
            <div className={toolbarClassName} />
            <Categories />
          </Drawer>
        </Hidden>
      </nav>
    </CategoriesProvider>
  );
};

export default DrawerLeft;
