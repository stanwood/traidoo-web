import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React, { useContext } from "react";
import { DrawerContext } from "../../../contexts/DrawerContext/context";
import {
  appBarTabsHeight,
  leftDrawerWidth,
  rightDrawerWidth,
} from "../constants";

const useResponsiveDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftDrawer: {
      [theme.breakpoints.up("xl")]: {
        width: leftDrawerWidth,
        flexShrink: 0,
      },
    },
    rightDrawer: {
      [theme.breakpoints.up("xl")]: {
        width: rightDrawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    tabs: {
      minHeight: appBarTabsHeight,
    },
    leftDrawerPaper: {
      width: leftDrawerWidth,
      paddingTop: theme.spacing(3),
    },
    rightDrawerPaper: {
      width: rightDrawerWidth,
      paddingTop: theme.spacing(3),
    },
  })
);

export interface ResponsiveDrawerProps {
  anchor: "left" | "right";
  withTabs: boolean;
  children: React.ReactNode;
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = (
  props: ResponsiveDrawerProps
) => {
  const classes = useResponsiveDrawerStyles();
  const {
    leftDrawer,
    toggleLeftDrawer,
    rightDrawer,
    toggleRightDrawer,
  } = useContext(DrawerContext);
  const { anchor, children, withTabs } = props;

  return (
    <nav
      className={anchor === "left" ? classes.leftDrawer : classes.rightDrawer}
      aria-label="mailbox folders"
    >
      <Hidden xlUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={anchor}
          open={anchor === "left" ? leftDrawer : rightDrawer}
          onClose={anchor === "left" ? toggleLeftDrawer : toggleRightDrawer}
          classes={{
            paper: clsx(
              anchor === "left" && classes.leftDrawerPaper,
              anchor === "right" && classes.rightDrawerPaper
            ),
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.toolbar} />
          {withTabs && <div className={classes.toolbar} />}
          {children}
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation="js">
        <Drawer
          classes={{
            paper: clsx(
              anchor === "left" && classes.leftDrawerPaper,
              anchor === "right" && classes.rightDrawerPaper
            ),
          }}
          variant="permanent"
          anchor={anchor}
          open
        >
          <div className={classes.toolbar} />
          {withTabs && <div className={classes.tabs} />}
          {children}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default ResponsiveDrawer;
